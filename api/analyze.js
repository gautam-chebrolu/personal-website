/**
 * api/analyze.js — Vercel Serverless Function
 *
 * POST /api/analyze
 * Body (JSON): { image: "<base64 data URL>", mimeType: "image/jpeg" }
 * Returns:     { success: true, designSystem: { colors, typography, mood, … } }
 *
 * Requires GEMINI_API_KEY in Vercel Environment Variables.
 */

// Vercel's default body parser handles JSON up to 4.5 MB on Hobby plan.
export const config = {
    api: { bodyParser: { sizeLimit: '4.5mb' } }
};

// ── Gemini prompt (same as DesignOfPablo/server.js) ─────────────────────────
const ANALYSIS_PROMPT = `You are an expert UI/UX designer and color theorist. Analyze this image and extract a comprehensive design system inspired by its visual elements.

Return a valid JSON object (no markdown formatting, no code fences) with this exact structure:

{
  "colors": {
    "primary": "<hex color - the most dominant/impactful color>",
    "secondary": "<hex color - the second most prominent color>",
    "accent": "<hex color - a vibrant highlight or feature color>",
    "background": "<hex color - suitable for a page/card background inspired by the image>",
    "surface": "<hex color - a slightly contrasting surface color>",
    "text": "<hex color - appropriate text color for readability on the background>",
    "textSecondary": "<hex color - lighter text for captions/subtitles>"
  },
  "colorNames": {
    "primary": "<evocative name, e.g. 'Forest Emerald'>",
    "secondary": "<evocative name>",
    "accent": "<evocative name>",
    "background": "<evocative name>",
    "surface": "<evocative name>"
  },
  "mood": "<3-5 descriptive words, comma separated, e.g. 'warm, organic, serene, grounded'>",
  "style": "<2-3 word style descriptor, e.g. 'rustic elegance', 'modern minimal', 'bohemian warmth'>",
  "atmosphere": "<one sentence describing the emotional feel>",
  "typography": {
    "headingStyle": "<description of ideal heading typography>",
    "bodyStyle": "<description of ideal body text>",
    "suggestedFonts": {
      "heading": "<Google Font name, e.g. 'Playfair Display'>",
      "body": "<Google Font name, e.g. 'Source Sans 3'>"
    }
  },
  "designNotes": "<2-3 sentences about what makes this image's aesthetic distinctive>",
  "sourceDescription": "<brief description of what the image appears to show>"
}

Important rules:
- All hex colors must be valid 6-digit hex codes starting with #
- Choose colors that work well together as a cohesive palette
- The background should be soft/muted enough to serve as a page background
- Text colors must be readable against the background
- Font suggestions must be real Google Fonts
- Return ONLY the JSON object, no other text`;

// ── Handler ──────────────────────────────────────────────────────────────────

export default async function handler(req, res) {
    if (req.method === 'OPTIONS') {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        return res.status(204).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { image, mimeType } = req.body || {};

    if (!image) {
        return res.status(400).json({ error: 'No image provided' });
    }

    if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({
            error: 'GEMINI_API_KEY is not set. Add it in Vercel → Settings → Environment Variables.'
        });
    }

    // Strip the data:image/...;base64, prefix if present
    const base64Data = image.replace(/^data:image\/\w+;base64,/, '');
    const resolvedMime = mimeType || 'image/jpeg';

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

    let geminiRes, geminiData;
    try {
        geminiRes = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [
                        { text: ANALYSIS_PROMPT },
                        { inlineData: { mimeType: resolvedMime, data: base64Data } }
                    ]
                }]
            })
        });
        geminiData = await geminiRes.json();
    } catch (err) {
        return res.status(502).json({ error: 'Failed to reach Gemini API', details: err.message });
    }

    if (!geminiRes.ok) {
        return res.status(502).json({
            error: 'Gemini API error',
            details: geminiData.error?.message || `HTTP ${geminiRes.status}`
        });
    }

    const rawText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!rawText) {
        return res.status(502).json({ error: 'No text in Gemini response' });
    }

    // Parse JSON — handle occasional markdown wrapping
    let designSystem;
    try {
        designSystem = JSON.parse(rawText);
    } catch {
        const fenceMatch = rawText.match(/```(?:json)?\s*([\s\S]*?)```/);
        if (fenceMatch) {
            designSystem = JSON.parse(fenceMatch[1].trim());
        } else {
            const objMatch = rawText.match(/\{[\s\S]*\}/);
            if (objMatch) {
                designSystem = JSON.parse(objMatch[0]);
            } else {
                return res.status(502).json({ error: 'Could not parse design system JSON from Gemini response' });
            }
        }
    }

    return res.status(200).json({
        success: true,
        designSystem,
        timestamp: new Date().toISOString()
    });
}
