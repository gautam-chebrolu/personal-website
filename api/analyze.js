export const config = {
  api: {
    bodyParser: {
      sizeLimit: '4.5mb',
    },
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { image, mimeType } = req.body;

    if (!image) {
      return res.status(400).json({ error: 'No image provided' });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: 'GEMINI_API_KEY is not configured.' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    
    // Remove the data:image/...;base64, prefix if present
    const base64Data = image.replace(/^data:image\/\w+;base64,/, '');
    
    const requestBody = JSON.stringify({
      contents: [{
        parts: [
          {
            text: `You are an expert UI/UX designer and color theorist. Analyze this image and extract a comprehensive design system inspired by its visual elements.

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
    "headingStyle": "<description of ideal heading typography, e.g. 'bold serif with classic proportions'>",
    "bodyStyle": "<description of ideal body text, e.g. 'clean sans-serif with generous spacing'>",
    "suggestedFonts": {
      "heading": "<Google Font name, e.g. 'Playfair Display'>",
      "body": "<Google Font name, e.g. 'Source Sans 3'>"
    }
  },
  "designNotes": "<2-3 sentences about what makes this image's aesthetic distinctive and how it translates to graphic design>",
  "sourceDescription": "<brief description of what the image appears to show>"
}

Important rules:
- All hex colors must be valid 6-digit hex codes starting with #
- Choose colors that work well together as a cohesive palette, not just sampled directly
- The background should be soft/muted enough to serve as a page background
- Text colors must be readable against the background
- Font suggestions must be real Google Fonts
- Return ONLY the JSON object, no other text`
          },
          {
            inlineData: {
              mimeType: mimeType || 'image/jpeg',
              data: base64Data
            }
          }
        ]
      }]
    });

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: requestBody
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || `Gemini API error: ${response.status}`);
    }

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) {
      throw new Error('No response text from Gemini');
    }

    // Parse the JSON from the response (handle potential markdown wrapping)
    let designSystem;
    try {
      designSystem = JSON.parse(text);
    } catch (e) {
      // Try to extract JSON from markdown code fences
      const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
      if (jsonMatch) {
        designSystem = JSON.parse(jsonMatch[1].trim());
      } else {
        // Try to find JSON object in the text
        const objectMatch = text.match(/\{[\s\S]*\}/);
        if (objectMatch) {
          designSystem = JSON.parse(objectMatch[0]);
        } else {
          throw new Error('Could not parse design system from AI response');
        }
      }
    }

    return res.status(200).json({
      success: true,
      designSystem,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Analysis error:', error);
    return res.status(500).json({
      error: 'Failed to analyze image',
      details: error.message
    });
  }
}
