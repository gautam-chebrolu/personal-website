// projects.js — Project data with detail page content
// Each project has a slug (for URL routing) and a detail object (for the detail page).
// detail.sections supports types: "text", "image", "image-pair", "video"

const projectsData = [
    {
        title: "Pilleve Dispenser",
        slug: "pilleve-dispenser",
        role: "CTO",
        year: "2017–2023",
        category: "hardware design software visuals",
        image: "https://lh3.googleusercontent.com/pw/AP1GczP7sm87uNlGUrSIu34LuyAAbLs9vMDv7-uPy7KagAmR31N-AbgOpd-PCEALK4vdZWnheXy9wWhFFEd8ea_grqEMoTJxg0_oNZrS69pWfgYVhpf2Fn0aqs2gQPCes73VK-sC4WvaMqmXFtkqeto5gDVv=w2542-h1680-s-no-gm?authuser=1",
        link: "",
        detail: {
            summary: "A smart pill dispensing device designed to improve medication adherence for elderly patients and caregivers.",
            sections: [
                {
                    type: "text",
                    content: "Pilleve began as a student project at Duke University and evolved into a patented medical device. As CTO, I led the full hardware and software development cycle — from initial prototyping through FDA-class considerations to manufacturing-ready designs."
                },
                {
                    type: "text",
                    content: "The system combines a custom-designed electromechanical dispenser with a companion mobile app, enabling caregivers to remotely monitor medication adherence in real time."
                }
            ],
            metadata: {
                tools: "SolidWorks, Arduino, React Native"
            }
        }
    },
    {
        title: "Amethyst",
        slug: "amethyst",
        role: "CEO",
        year: "2022",
        category: "design hardware software visuals",
        image: "assets/amethyst_system.png",
        link: "",
        detail: {
            summary: "A connected product system bridging hardware design and digital experiences.",
            sections: [
                {
                    type: "text",
                    content: "As CEO, I led the product vision, industrial design, and go-to-market strategy for the Amethyst system. The project spanned hardware engineering, embedded software, and companion app development."
                },
                {
                    type: "text",
                    content: "Add more details about the Amethyst project here — the challenge, your approach, and the outcome."
                }
            ],
            metadata: {
                tools: "Figma, SolidWorks, PCB Design"
            }
        }
    },
    {
        title: "SPARQ AI",
        slug: "sparq-ai",
        role: "Hardware Engineer",
        year: "2024",
        category: "design software hardware",
        image: "assets/sparq_photo.png",
        link: "",
        detail: {
            summary: "Hardware engineering for an AI-powered product platform.",
            sections: [
                {
                    type: "text",
                    content: "At SPARQ AI, I worked as a hardware engineer contributing to the physical design and prototyping of AI-integrated products. The role spanned PCB layout, mechanical design, and firmware development."
                },
                {
                    type: "text",
                    content: "Add specific details about your contributions, technical challenges, and results."
                }
            ],
            metadata: {
                tools: "Altium, KiCad, Firmware"
            }
        }
    },
    {
        title: "Headshots",
        slug: "headshots",
        role: "Photographer",
        year: "2019–",
        category: "visuals",
        image: "assets/headshot_photo.png",
        link: "",
        detail: {
            summary: "Professional headshot photography for individuals and teams.",
            sections: [
                {
                    type: "text",
                    content: "An ongoing headshot photography practice focused on capturing authentic, professional portraits. Each session is tailored to the subject's personality and intended use — from LinkedIn profiles to editorial features."
                }
            ],
            metadata: {
                tools: "Canon, Adobe Lightroom"
            }
        }
    },
    {
        title: "The Kelloggian",
        slug: "the-kelloggian",
        role: "Puzzle Master",
        year: "2026",
        category: "design software games",
        image: "assets/kelloggian_crossword.png",
        link: "https://www.thekelloggian.com/games/",
        detail: {
            summary: "Crossword puzzles and games for The Kelloggian student publication.",
            sections: [
                {
                    type: "text",
                    content: "As Puzzle Master for The Kelloggian, I design and develop interactive crossword puzzles and word games for the student community. Each puzzle is crafted around campus culture, current events, and Kellogg inside jokes."
                }
            ],
            metadata: {
                tools: "JavaScript, Custom Puzzle Engine"
            }
        }
    },
    {
        title: "Concert Photography",
        slug: "concert-photography",
        role: "Photographer",
        year: "2024–",
        category: "visuals",
        image: "assets/concert_photo.png",
        link: "",
        detail: {
            summary: "Live music photography capturing energy and emotion from the pit.",
            sections: [
                {
                    type: "text",
                    content: "Concert photography focused on capturing the raw energy of live performances. Working in challenging lighting conditions, each shot aims to freeze a moment of connection between artist and audience."
                }
            ],
            metadata: {
                tools: "Sony, Adobe Lightroom"
            }
        }
    },
    {
        title: "Event Photography",
        slug: "event-photography",
        role: "Photographer",
        year: "2015–",
        category: "visuals",
        image: "assets/event_photo.png",
        link: "",
        detail: {
            summary: "Documentary-style event photography spanning conferences, galas, and community gatherings.",
            sections: [
                {
                    type: "text",
                    content: "Over a decade of event photography work covering a wide range of events — from intimate community gatherings to large-scale conferences and galas. The work emphasizes candid moments and the atmosphere of each event."
                }
            ],
            metadata: {
                tools: "Canon, Adobe Lightroom"
            }
        }
    },
    {
        title: "The Catan Clash",
        slug: "the-catan-clash",
        role: "Developer",
        year: "2021–",
        category: "visuals games software",
        image: "assets/catan_clash.png",
        link: "https://catan-website-git-main-gautamchebrolus-projects.vercel.app/",
        detail: {
            summary: "A web platform for organizing and tracking competitive Settlers of Catan tournaments.",
            sections: [
                {
                    type: "text",
                    content: "The Catan Clash is a web application for managing competitive Settlers of Catan tournaments. Built with a focus on clean design and intuitive user experience, the platform handles player registration, matchmaking, score tracking, and leaderboards."
                },
                {
                    type: "text",
                    content: "The project combines web development with visual branding — creating a cohesive identity for the tournament series."
                }
            ],
            metadata: {
                tools: "JavaScript, Vercel"
            }
        }
    },
    {
        title: "Bluetooth Hacking",
        slug: "bluetooth-hacking",
        role: "Developer",
        year: "2019–",
        category: "hardware software",
        image: "assets/bluetooth_button.png",
        link: "",
        detail: {
            summary: "Exploring Bluetooth Low Energy for creative hardware interfaces and IoT prototyping.",
            sections: [
                {
                    type: "text",
                    content: "A series of experiments and projects exploring Bluetooth Low Energy (BLE) as a medium for creative hardware interactions. Projects range from custom wireless buttons to sensor networks and IoT prototypes."
                },
                {
                    type: "text",
                    content: "The work demonstrates how accessible wireless protocols can enable rapid prototyping of connected physical experiences."
                }
            ],
            metadata: {
                tools: "Arduino, Python, BLE"
            }
        }
    },
    {
        title: "Creative Code",
        slug: "creative-code",
        role: "Instructor, GWU",
        year: "2022–2023",
        category: "design software teaching visuals",
        image: "assets/rps_creative_code.png",
        link: "https://just-hotel-402.notion.site/CIXD-2111-6014-Creative-Code-24b0fbc0f8b148d590c8c73c7df80245?source=copy_link",
        detail: {
            summary: "Teaching creative coding and computational design at George Washington University.",
            sections: [
                {
                    type: "text",
                    content: "As an instructor at GWU's Corcoran School of the Arts & Design, I taught Creative Code — a course bridging programming fundamentals with visual arts and interaction design. Students learned to use code as a creative medium through projects in generative art, data visualization, and interactive installations."
                },
                {
                    type: "text",
                    content: "The curriculum emphasized hands-on experimentation, iterative design thinking, and the creative potential of computational tools."
                }
            ],
            metadata: {
                tools: "p5.js, Processing, Arduino"
            }
        }
    },
    {
        title: "Who Knows",
        slug: "who-knows",
        role: "Director, Cinematographer",
        year: "2017",
        category: "visuals",
        image: "assets/who_knows.png",
        link: "https://www.youtube.com/watch?v=6CfHv17Ycek",
        detail: {
            summary: "A short film exploring identity, uncertainty, and the spaces between.",
            sections: [
                {
                    type: "text",
                    content: "\"Who Knows\" is a short film I directed and shot, exploring themes of identity and uncertainty. The project involved end-to-end production — from concept and scripting through cinematography and post-production."
                },
                {
                    type: "video",
                    src: "https://www.youtube.com/embed/6CfHv17Ycek"
                }
            ],
            metadata: {
                tools: "Final Cut Pro, Canon"
            }
        }
    },
    {
        title: "Kanye 101",
        slug: "kanye-101",
        role: "Creator, Duke",
        year: "2017",
        category: "teaching",
        image: "assets/kanye_101.png",
        link: "https://docs.google.com/document/d/1rx50q7oKfnLhmz2bUFMA9IPnIueRHebEnlrZT6iCYRY/edit?usp=sharing",
        detail: {
            summary: "A student-led course at Duke University examining Kanye West's cultural impact through music, fashion, and design.",
            sections: [
                {
                    type: "text",
                    content: "Kanye 101 was a student-led course I created at Duke University that examined the cultural significance of Kanye West's work across music, fashion, architecture, and design. The course attracted over 100 applicants and became one of the most talked-about student initiatives on campus."
                },
                {
                    type: "text",
                    content: "The curriculum covered topics from production techniques and sampling to brand building and the intersection of art and commerce."
                }
            ],
            metadata: {
                tools: "Curriculum Design, Lecture"
            }
        }
    },
];