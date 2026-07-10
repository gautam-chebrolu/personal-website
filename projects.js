// projects.js — Project data with detail page content
// Each project has a slug (for URL routing) and a detail object (for the detail page).
// detail.sections supports types: "text", "image", "image-pair", "video"

const projectsData = [
    {
        type: "select",
        title: "Pilleve Dispenser",
        slug: "pilleve-dispenser",
        role: "CTO",
        year: "2017–2023",
        category: "hardware design software visuals",
        image: "https://lh3.googleusercontent.com/pw/AP1GczPw7vrBzYlmDepEo0Y7Xj5FqApNYTKBS_UzElFGwYL3YmRISCqdmKm1CtqrQ0Rnc0sIuQILB9hXcfFgY-FfwvRfcmlOEi85dhFxYAuLF80tbZ2OK-WKqOVxq5g_E48LnHTV-u11uFmCH8nMxN4vYOxb=w2450-h1634-s-no-gm",
        link: "www.pilleve.com",
        detail: {
            heroImage: "https://lh3.googleusercontent.com/pw/AP1GczP7sm87uNlGUrSIu34LuyAAbLs9vMDv7-uPy7KagAmR31N-AbgOpd-PCEALK4vdZWnheXy9wWhFFEd8ea_grqEMoTJxg0_oNZrS69pWfgYVhpf2Fn0aqs2gQPCes73VK-sC4WvaMqmXFtkqeto5gDVv=w2542-h1680-s-no-gm",
            summary: "A smart pill dispenser designed to improve monitor usage of controlled substances, such as opioids.",
            sections: [
                {
                    type: "text",
                    content: "I joined Yossuf Albanawi as a cofounder and CTO of Pilleve, where it was our mission to prevent substance abuse and addiction. Our pill dispenser was our flagship device and our first product. It was a tool born out of multiple conversations with doctors, patients, pharmacists, and any other stakeholder we could talk to. This device received a Medical Device Excellence Award and was used by the Department of Veterans Affairs, Johns Hopkins, and other institutions."
                },
                {
                    type: "text",
                    content: "I was responsible for making the device a reality. We went through 70+ iterations of the device using a host of sensors and decided that dispensing was the best balance of accuracy and accessibility. Our goal was never to lock patients out, but rather track. We even made it relatively easy to break into the device if necessary because no technology is 100% foolproof, and instead had tamper sensors."
                },
                {
                    type: "text",
                    content: "First editions of the device were built using the BBC micro:bit and hand-assembled and 3D-printed with a Form 2 SLA printer. We moved production to China in 2019."
                }
            ],
            metadata: {
                tools: "Bluetooth / nRF52, Robotics, Custom PCB + Firmware, Flutter, Firebase, SolidWorks"
            }
        }
    },
    {
        type: "select",
        title: "Amethyst",
        slug: "amethyst",
        role: "CEO",
        year: "2022",
        category: "design hardware software visuals",
        image: "assets/amethyst_system.png",
        link: "www.pilleve.com",
        detail: {
            heroImage: "",
            summary: "A connected product system bridging monitoring tools and clinical care support.",
            sections: [
                {
                    type: "text",
                    content: "As CEO of Pilleve, I led the product vision, design, and go-to-market strategy for the Amethyst System. We shifted our focus from just a physical device to providing care services as well and the Amethyst System was how we branded it."
                },
                {
                    type: "text",
                    content: "In Greek mythology, Amethyst is associated with sobriety and clarity of mind. A user that holds the Amethyst stone is believed to be protected from intoxication and to have a clear mind. Similiarly, we hope to protect users of the Amethyst System from misusing their medications."
                }
            ],
            metadata: {
                tools: "Clinical Care Model + Billing, Behaviorial Health Integration"
            }
        }
    },
    {
        type: "select",
        title: "SPARQ AI",
        slug: "sparq-ai",
        role: "Hardware Engineer",
        year: "2024",
        category: "design software hardware",
        image: "assets/sparq_photo.png",
        link: "joinsparq.com",
        detail: {
            heroImage: "",
            summary: "Hardware engineering for an AI-powered OBDII car sensor.",
            sections: [
                {
                    type: "text",
                    content: "At SPARQ AI, I worked as the first hardware engineer contributing to building out their flagship product. I sourced components and manufacturers in China, hacked Bluetooth devices to reverse engineer their protocols, and built the JS bridge to connect the sensor to the app."
                },
                {
                    type: "text",
                    content: "I also contributed some product photography and market research"
                }
            ],
            metadata: {
                tools: "Bluetooth, OBDII, React Native"
            }
        }
    },
    {
        type: "side",
        title: "Kellogg Mini Games",
        slug: "kellogg-mini-games",
        role: "Puzzle Master",
        year: "2026",
        category: "design software visuals games",
        image: "assets/kellogg_bidpoints.png",
        link: "",
        detail: {
            heroImage: "",
            summary: "I designed and developed mini games for the Kellogg School of Management.",
            sections: [
                {
                    type: "text",
                    content: "In my last two weeks of my MBA, I built and designed a mini-game tournament based on some popular web games."
                },
                {
                    type: "text",
                    content: "<a href='thekelloggian.com/games'>Kellogg Mini Crossword</a>: a mini crossword puzzle with clues based on Kellogg terms."
                },
                {
                    type: "text",
                    content: "<a href='kelloggbidpoints.com'>Kellogg Bid Trivia</a>: place classes based on the correct bid points on a growing timeline."
                },
                {
                    type: "embed",
                    src: "https://kelloggbidpoints.com"
                },
                {
                    type: "text",
                    content: "<a href='kelloggle.com'>Kelloggle</a>: Wordle for Kellogg professors."
                },
                {
                    type: "embed",
                    src: "https://kelloggle.com"
                },
                {
                    type: "text",
                    content: "<a href=''>KelloggGeoGuessr</a>: I provide a picture from around the Global Hub and the team has to guess the location."
                },
                {
                    type: "text",
                    content: "I also built a special tournament version that allowed me to provide virtual links to each team track their scores in Firebase."
                },
                {
                    type: "text",
                    content: "Side note that's interesting is the notion of meta-knowledge and how necessary it is for every environment that you're in, but how useless it is outside of those contexts. There's a lot of things, such as where locations are around the Global Hub or how the bidding system works for classes that might be important to current students but are immediately not needed after graduating."
                }
            ],
            metadata: {
                tools: "Google Antigravity, Firebase, JavaScript"
            }
        }
    },
    {
        type: "select",
        title: "TDoP",
        slug: "design-of-pablo",
        role: "Developer, Designer",
        year: "2026",
        category: "visuals",
        image: "assets/design_of_pablo.png",
        link: "",
        detail: {
            heroImage: "",
            summary: "Figma plugin that allows you to automatically update your file's design system based on a photo you take.",
            sections: [
                {
                    type: "embed",
                    src: "tdop-embed.html",
                    height: "860px"
                },
                {
                    type: "text",
                    content: "I created a Figma plugin that is sets up a websocket and then connects to a web app that allows users to take a photo of a design system and then automatically update their Figma file with the colors, fonts, and other design elements from the photo. The plugin uses the Google Vision API to analyze the image and extract the design elements."
                },
                {
                    type: "text",
                    content: "This project won 2nd place at the Kellogg AI Showcase"
                },
                {
                    type: "video",
                    src: "https://www.youtube.com/embed/Q_SZmAQtw4o"
                }
            ],
            metadata: {
                tools: "Gemini Vision AI, Vercel Serverless, Figma Plugin, Websockets, JavaScript"
            }
        }
    },
    {
        type: "side",
        title: "Wedding Website",
        slug: "wedding-website",
        role: "Developer, Designer",
        year: "2026",
        category: "visuals design software",
        image: "assets/wedding_website.png",
        link: "https://www.priyagautam.com",
        detail: {
            heroImage: "",
            summary: "Wedding website with custom RSVP + guest functionality.",
            sections: [
                {
                    type: "text",
                    content: "I built a fully custom wedding website for my wedding in Nov 2026. I designed it then used mostly Claude Opus + Sonnet to build it out."
                },
                {
                    type: "text",
                    content: "Functionality: animated invitation, RSVP form that live updates a Google Sheet, automated e-mails and calendar invitations, tracking dashboard for responses"
                },
            ],
            metadata: {
                tools: "JavaScript, Google Sheets Database"
            }
        }
    },
    {
        type: "side",
        title: "Headshots",
        slug: "headshots",
        role: "Photographer",
        year: "2026",
        category: "design software",
        image: "assets/headshot_photo.png",
        link: "",
        detail: {
            heroImage: "",
            summary: "Professional headshot photography for individuals and teams.",
            sections: [
                {
                    type: "text",
                    content: "I've completed 400+ headshots, including 300+ for first-years at Northwestern University's Kellogg School of Management."
                },
                {
                    type: "video",
                    src: "https://www.youtube.com/embed/wFGYLfPMXbw"
                }
            ],
            metadata: {
                tools: "Nikon, Lightroom Classic"
            }
        }
    },
    // {
    //     title: "The Kelloggian",
    //     slug: "the-kelloggian",
    //     role: "Puzzle Master",
    //     year: "2026",
    //     category: "design software games",
    //     image: "assets/kelloggian_crossword.png",
    //     link: "https://www.thekelloggian.com/games/",
    //     detail: {
    //         summary: "Crossword puzzles and games for The Kelloggian student publication.",
    //         sections: [
    //             {
    //                 type: "text",
    //                 content: "As Puzzle Master for The Kelloggian, I design and develop interactive crossword puzzles and word games for the student community. Each puzzle is crafted around campus culture, current events, and Kellogg inside jokes."
    //             },
    //             {
    //                 type: "text",
    //                 content: "I also implemented a design refresh and of the publication's website and was the VP of Photography."
    //             }
    //         ],
    //         metadata: {
    //             tools: "JavaScript, Puzzles"
    //         }
    //     }
    // },
    // {
    //     title: "Concert Photography",
    //     slug: "concert-photography",
    //     role: "Photographer",
    //     year: "2025–",
    //     category: "visuals",
    //     image: "assets/concert_photo.png",
    //     link: "",
    //     detail: {
    //         summary: "Live music photography capturing energy and emotion from the pit.",
    //         sections: [
    //             {
    //                 type: "text",
    //                 content: "I shot bands in various venues around Chicago."
    //             }
    //         ],
    //         metadata: {
    //             tools: "Nikon, Lightroom Classic"
    //         }
    //     }
    // },
    // {
    //     title: "Event Photography",
    //     slug: "event-photography",
    //     role: "Photographer",
    //     year: "2015–",
    //     category: "visuals",
    //     image: "assets/event_photo.png",
    //     link: "",
    //     detail: {
    //         summary: "Event photography spanning conferences, galas, and community gatherings.",
    //         sections: [
    //             {
    //                 type: "text",
    //                 content: "Over a decade of event photography work covering a wide range of events — from intimate community gatherings to large-scale conferences and galas. I was the only student contracted with the Kellogg School of Management for event photography."
    //             }
    //         ],
    //         metadata: {
    //             tools: "Nikon, Lightroom Classic"
    //         }
    //     }
    // },
    {
        type: "side",
        title: "The Catan Clash",
        slug: "the-catan-clash",
        role: "Developer",
        year: "2024",
        category: "visuals games software",
        image: "assets/catan_clash.png",
        link: "https://catan-website-git-main-gautamchebrolus-projects.vercel.app/",
        detail: {
            heroImage: "",
            summary: "A fun side project for the 500th game of Settlers of Catan with my friends.",
            sections: [
                {
                    type: "text",
                    content: "Robert Hines, Varad Dabke, and I started playing Settlers of Catan together virtually during the pandemic and I randomly started keeping track of our stats. On May 31st, 2024, we played our 500th game and I built a website to commemorate the occasion."
                },
                {
                    type: "text",
                    content: "I built a live poll using a Google Sheet as a live database and shared the live stats that we are still updating to this day."
                }
            ],
            metadata: {
                tools: "JavaScript, p5.js, Google Sheets database, Vercel"
            }
        }
    },
    {
        type: "side",
        title: "Bluetooth Hacking",
        slug: "bluetooth-hacking",
        role: "Developer",
        year: "2019–",
        category: "hardware software",
        image: "assets/bluetooth_button.png",
        link: "",
        detail: {
            heroImage: "",
            summary: "Exploring BLE for creative hardware interfaces and IoT prototyping.",
            sections: [
                {
                    type: "text",
                    content: "I've hacked a number of Bluetooth devices to build my own custom functions such as custom buttons and data trackers."
                },
            ],
            metadata: {
                tools: "Zephyr, nRF, Arduino,Python, BLE"
            }
        }
    },
    // {
    //     title: "Creative Code",
    //     slug: "creative-code",
    //     role: "Instructor, GWU",
    //     year: "2022–2023",
    //     category: "design software teaching visuals",
    //     image: "assets/rps_creative_code.png",
    //     link: "https://just-hotel-402.notion.site/CIXD-2111-6014-Creative-Code-24b0fbc0f8b148d590c8c73c7df80245?source=copy_link",
    //     detail: {
    //         summary: "Teaching creative coding and computational design at George Washington University.",
    //         sections: [
    //             {
    //                 type: "text",
    //                 content: "As an instructor at GWU's Corcoran School of the Arts & Design, I taught Creative Code — a course bridging programming fundamentals with visual arts and interaction design. Students learned to use code as a creative medium through projects in generative art, data visualization, and interactive art."
    //             },
    //             {
    //                 type: "text",
    //                 content: "This course is a requirement for undergraduate and graduate Interaction Design majors. I taught both sections in the Fall of 2023 and would have continued teaching if I did not move for business school."
    //             }
    //         ],
    //         metadata: {
    //             tools: "p5.js, Art x Tech, JavaScript"
    //         }
    //     }
    // },
    // {
    //     title: "Who Knows",
    //     slug: "who-knows",
    //     role: "Director, Cinematographer",
    //     year: "2017",
    //     category: "visuals",
    //     image: "assets/who_knows.png",
    //     link: "https://www.youtube.com/watch?v=6CfHv17Ycek",
    //     detail: {
    //         summary: "A short film exploring identity, uncertainty, and the spaces between.",
    //         sections: [
    //             {
    //                 type: "text",
    //                 content: "\"Who Knows\" is a short film I directed and shot with Film Team 6 (Ashwin Prakash, Jack McDermott, Mary Zhang, Sabriyya Pate, Vivek Sriram), exploring themes of identity and uncertainty. The project involved end-to-end production — from concept and scripting through cinematography and post-production."
    //             },
    //             {
    //                 type: "video",
    //                 src: "https://www.youtube.com/embed/6CfHv17Ycek"
    //             }
    //         ],
    //         metadata: {
    //             tools: "Nikon, Canon, Premiere Pro"
    //         }
    //     }
    // },
    {
        type: "side",
        title: "Lighting Design",
        slug: "lighting-design",
        role: "Designer",
        year: "2024 - 2026",
        category: "design visuals",
        image: "assets/lighting_design.png",
        link: "",
        detail: {
            heroImage: "",
            summary: "I was the lighting designer for various productions.",
            sections: [
                {
                    type: "text",
                    content: "I worked with students part of Special K! and Groupwerk to design and man the lighting for their respective shows. I also <a href='https://just-hotel-402.notion.site/Norris-Lighting-Notes-1d270c7eaa43801fbcf5d03f78c4e683' target='_blank'>created tutorials</a> for the next set of students"
                },
                {
                    type: "text",
                    content: "Here is an example from the Groupwerk Showcase"
                },
                {
                    type: "video",
                    src: "https://www.youtube.com/embed/jz2-SGgSr7w?si=ns8R79Cvr_Hy5WOn"
                }
            ],
            metadata: {
                tools: "Lighting Design, EOS Console"
            }
        }
    },
    {
        type: "side",
        title: "Kanye 101",
        slug: "kanye-101",
        role: "Creator, Duke",
        year: "2017",
        category: "teaching",
        image: "assets/kanye_101.png",
        link: "https://docs.google.com/document/d/1rx50q7oKfnLhmz2bUFMA9IPnIueRHebEnlrZT6iCYRY/edit?usp=sharing",
        detail: {
            heroImage: "",
            summary: "A student-led course at Duke University examining ourselves through teh lens of Kanye West.",
            sections: [
                {
                    type: "text",
                    content: "Kanye 101 was a student-led course I created with Sabriyya Pate at Duke University that examined our own identities and experiences through the lens of Kanye West's work. The course filled up within 1 second of registration. "
                },
                {
                    type: "text",
                    content: "For example, one class was about impression management because our words and thoughts go through multiple filters before being understood by others. This is complicated more media and other people editing and telling our stories."
                }
            ],
            metadata: {
                tools: "Curriculum Design, Lecture, Kanye West"
            }
        }
    },
];