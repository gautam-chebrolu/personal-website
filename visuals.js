// visuals.js — Gallery data for the Visuals page
// Replace images with your actual photos/designs/videos.
// size: "standard" (1×1), "tall" (1×2 rows), "wide" (2×1 columns)
//
// 💡 CLOUDINARY USAGE:
// For performance, use a compressed version for the masonry grid and a high-res version for the lightbox.
// image: "https://res.cloudinary.com/.../image/upload/c_scale,w_600,q_auto/v1234/my_photo.jpg" 
// highRes: "https://res.cloudinary.com/.../image/upload/q_auto/v1234/my_photo.jpg"
//
// 💡 YOUTUBE VIDEO USAGE:
// Add a 'videoUrl' property to play a YouTube video in the lightbox. Make sure to use the 'embed' link.
// videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"

const visualsData = [
{
    title: "Live at Metro",
    category: "concert",
    image: "assets/concert_photo.png",
    highRes: "",
    size: "wide",
    meta: {
        camera: "Sony A7 IV",
        aperture: "f/1.8",
        focalLength: "50mm",
        location: "Metro, Chicago",
        date: "Oct 2024"
    }
},
    {
        title: "Headshot Series I",
        category: "headshots",
        image: "assets/headshot_photo.png",
        size: "tall"
    },
    {
        title: "TEDx Event",
        category: "event",
        image: "assets/event_photo.png",
        size: "standard"
    },
    {
        title: "Amethyst System Render",
        category: "graphic-design",
        image: "assets/amethyst_system.png",
        size: "standard"
    },
    {
        title: "Who Knows — Film Still",
        category: "video",
        image: "assets/who_knows.png",
        videoUrl: "https://www.youtube.com/embed/6CfHv17Ycek",
        size: "wide"
    },
    {
        title: "Creative Code — RPS",
        category: "graphic-design",
        image: "assets/rps_creative_code.png",
        size: "standard"
    },
    {
        title: "SPARQ Launch Event",
        category: "event",
        image: "assets/sparq_photo.png",
        size: "tall"
    },
    {
        title: "Catan Clash Branding",
        category: "graphic-design",
        image: "assets/catan_clash.png",
        size: "standard"
    },
    {
        title: "Graduation Day",
        category: "grad",
        image: "assets/event_photo.png",
        size: "standard"
    },
    {
        title: "Kanye 101 Promo",
        category: "graphic-design",
        image: "assets/kanye_101.png",
        size: "wide"
    },
    {
        title: "Bluetooth Module Close-up",
        category: "event",
        image: "assets/bluetooth_button.png",
        size: "standard"
    },
    {
        title: "Kelloggian Puzzle Layout",
        category: "graphic-design",
        image: "assets/kelloggian_crossword.png",
        size: "standard"
    },
];
