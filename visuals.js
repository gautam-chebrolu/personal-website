// visuals.js — Gallery data for the Visuals page
//
// ITEM TYPES:
//   "single"     — standalone photo (default). Shows one image; optional albumUrl.
//   "collection" — group of related photos. Shows cover image in grid; clicking opens
//                  a carousel of all images. Set albumUrl for a Google Photos link.
//   "deck"       — slide deck. Shows cover image in grid; clicking steps through slides.
//
// FEATURED:
//   Set featured: true on any item to pin it to the top of the grid.
//   Featured items appear in data-order first, followed by a randomized non-featured pool.
//
// CLOUDINARY TIPS:
//   Thumbnail: use c_scale,w_600,q_auto in the URL transform
//   High-res:  use q_auto only
//
// META (single / collection items):
//   Only filled values are rendered. Labels are hidden — only values are shown.
//   { camera, aperture, focalLength, location, date }

const visualsData = [

    // ── Concert / Battle of the Bands ───────────────────────

    {
        type: "single",
        title: "BOTB 2025 — Promo",
        category: "concert",
        image: "https://res.cloudinary.com/dvifvmokx/image/upload/c_scale,w_600,q_auto/v1782505924/botb25_promo_cvdjs6.jpg",
        highRes: "https://res.cloudinary.com/dvifvmokx/image/upload/q_auto/v1782505924/botb25_promo_cvdjs6.jpg",
        size: "wide",
        meta: { camera: "", aperture: "", focalLength: "", location: "", date: "" }
    },
    {
        type: "single",
        title: "BOTB 2025 — Thomas",
        category: "concert",
        image: "https://res.cloudinary.com/dvifvmokx/image/upload/c_scale,w_600,q_auto/v1782505924/botb25_thomas_ag7q3h.jpg",
        highRes: "https://res.cloudinary.com/dvifvmokx/image/upload/q_auto/v1782505924/botb25_thomas_ag7q3h.jpg",
        size: "standard",
        meta: { camera: "", aperture: "", focalLength: "", location: "", date: "" }
    },
    {
        type: "single",
        title: "BOTB 2025 — Rockets",
        category: "concert",
        image: "https://res.cloudinary.com/dvifvmokx/image/upload/c_scale,w_600,q_auto/v1782505924/botb25_rockets_rsuurc.jpg",
        highRes: "https://res.cloudinary.com/dvifvmokx/image/upload/q_auto/v1782505924/botb25_rockets_rsuurc.jpg",
        size: "wide",
        meta: { camera: "", aperture: "", focalLength: "", location: "", date: "" }
    },
    {
        type: "single",
        title: "BOTB 2025",
        category: "concert",
        image: "https://res.cloudinary.com/dvifvmokx/image/upload/c_scale,w_600,q_auto/v1782505924/botb25__zkpyqd.jpg",
        highRes: "https://res.cloudinary.com/dvifvmokx/image/upload/q_auto/v1782505924/botb25__zkpyqd.jpg",
        size: "standard",
        meta: { camera: "", aperture: "", focalLength: "", location: "", date: "" }
    },
    {
        type: "single",
        title: "BOTB 2025 — Zain",
        category: "concert",
        image: "https://res.cloudinary.com/dvifvmokx/image/upload/c_scale,w_600,q_auto/v1782505924/botb25_zain_xgpo9r.jpg",
        highRes: "https://res.cloudinary.com/dvifvmokx/image/upload/q_auto/v1782505924/botb25_zain_xgpo9r.jpg",
        size: "standard",
        meta: { camera: "", aperture: "", focalLength: "", location: "", date: "" }
    },
    {
        type: "single",
        title: "BOTB 2026 — Kim",
        category: "concert",
        image: "https://res.cloudinary.com/dvifvmokx/image/upload/c_scale,w_600,q_auto/v1782505924/botb26_kim_snfiob.jpg",
        highRes: "https://res.cloudinary.com/dvifvmokx/image/upload/q_auto/v1782505924/botb26_kim_snfiob.jpg",
        size: "standard",
        meta: { camera: "", aperture: "", focalLength: "", location: "", date: "" }
    },
    {
        type: "single",
        title: "BOTB — Captains",
        category: "concert",
        image: "https://res.cloudinary.com/dvifvmokx/image/upload/c_scale,w_600,q_auto/v1782505924/botb_captains_redics.jpg",
        highRes: "https://res.cloudinary.com/dvifvmokx/image/upload/q_auto/v1782505924/botb_captains_redics.jpg",
        size: "wide",
        meta: { camera: "", aperture: "", focalLength: "", location: "", date: "" }
    },
    {
        type: "single",
        title: "BOTB — Booth",
        category: "concert",
        image: "https://res.cloudinary.com/dvifvmokx/image/upload/c_scale,w_600,q_auto/v1782505925/botb_booth_w8ownh.jpg",
        highRes: "https://res.cloudinary.com/dvifvmokx/image/upload/q_auto/v1782505925/botb_booth_w8ownh.jpg",
        size: "wide",
        meta: { camera: "", aperture: "", focalLength: "", location: "", date: "" }
    },
    {
        type: "single",
        title: "BOTB 2026 — James",
        category: "concert",
        image: "https://res.cloudinary.com/dvifvmokx/image/upload/c_scale,w_600,q_auto/v1782505923/botb26_james_ilc1jo.jpg",
        highRes: "https://res.cloudinary.com/dvifvmokx/image/upload/q_auto/v1782505923/botb26_james_ilc1jo.jpg",
        size: "standard",
        meta: { camera: "", aperture: "", focalLength: "", location: "", date: "" }
    },

    // ── People ───────────────────────────────────────────────

    {
        type: "single",
        featured: true,
        title: "AMA 2026",
        category: "people",
        image: "https://res.cloudinary.com/dvifvmokx/image/upload/c_scale,w_600,q_auto/v1782506235/ama_2026_ip6lre.jpg",
        highRes: "https://res.cloudinary.com/dvifvmokx/image/upload/q_auto/v1782506235/ama_2026_ip6lre.jpg",
        size: "wide",
        meta: { camera: "", aperture: "", focalLength: "", location: "", date: "" }
    },
    {
        type: "single",
        title: "Dev — Headshot",
        category: "people",
        image: "https://res.cloudinary.com/dvifvmokx/image/upload/c_scale,w_600,q_auto/v1782506235/dev_headshot_hdiyoq.jpg",
        highRes: "https://res.cloudinary.com/dvifvmokx/image/upload/q_auto/v1782506235/dev_headshot_hdiyoq.jpg",
        size: "tall",
        meta: { camera: "", aperture: "", focalLength: "", location: "", date: "" }
    },
    {
        type: "single",
        title: "Nawed — Headshot",
        category: "people",
        image: "https://res.cloudinary.com/dvifvmokx/image/upload/c_scale,w_600,q_auto/v1782506165/nawed_headshot_cbrqq0.jpg",
        highRes: "https://res.cloudinary.com/dvifvmokx/image/upload/q_auto/v1782506165/nawed_headshot_cbrqq0.jpg",
        size: "tall",
        meta: { camera: "", aperture: "", focalLength: "", location: "", date: "" }
    },
    {
        type: "single",
        title: "Dev & Rhea — Couch",
        category: "people",
        image: "https://res.cloudinary.com/dvifvmokx/image/upload/c_scale,w_600,q_auto/v1782505923/dev_rhea_couch_qvgxnf.jpg",
        highRes: "https://res.cloudinary.com/dvifvmokx/image/upload/q_auto/v1782505923/dev_rhea_couch_qvgxnf.jpg",
        size: "wide",
        meta: { camera: "", aperture: "", focalLength: "", location: "", date: "" }
    },
    {
        type: "single",
        title: "2000s Party",
        category: "concert",
        image: "https://res.cloudinary.com/dvifvmokx/image/upload/c_scale,w_600,q_auto/v1782505925/2000s_party_allie_lbnunm.jpg",
        highRes: "https://res.cloudinary.com/dvifvmokx/image/upload/q_auto/v1782505925/2000s_party_allie_lbnunm.jpg",
        size: "standard",
        meta: { camera: "", aperture: "", focalLength: "", location: "", date: "" }
    },
    {
        type: "single",
        title: "Akka Wedding",
        category: "people",
        image: "https://res.cloudinary.com/dvifvmokx/image/upload/c_scale,w_600,q_auto/v1782505927/akka_water_dknrku.jpg",
        highRes: "https://res.cloudinary.com/dvifvmokx/image/upload/q_auto/v1782505927/akka_water_dknrku.jpg",
        size: "tall",
        meta: { camera: "", aperture: "", focalLength: "", location: "", date: "" }
    },

    // ── Events ───────────────────────────────────────────────

    {
        type: "single",
        title: "SPARQ",
        category: "product",
        image: "https://res.cloudinary.com/dvifvmokx/image/upload/c_scale,w_600,q_auto/v1782505928/sparq_xb9jvk.jpg",
        highRes: "https://res.cloudinary.com/dvifvmokx/image/upload/q_auto/v1782505928/sparq_xb9jvk.jpg",
        size: "wide",
        meta: { camera: "", aperture: "", focalLength: "", location: "", date: "" }
    },
    {
        type: "single",
        title: "Kellogg Climate Conference",
        category: "event",
        image: "https://res.cloudinary.com/dvifvmokx/image/upload/c_scale,w_600,q_auto/v1782505925/Kellogg_Climate_Conference_Highlights_u11lvw.jpg",
        highRes: "https://res.cloudinary.com/dvifvmokx/image/upload/q_auto/v1782505925/Kellogg_Climate_Conference_Highlights_u11lvw.jpg",
        size: "wide",
        meta: { camera: "", aperture: "", focalLength: "", location: "Kellogg School of Management", date: "" }
    },
    {
        type: "single",
        title: "Kellogg x Booth Hockey",
        category: "event",
        image: "https://res.cloudinary.com/dvifvmokx/image/upload/c_scale,w_600,q_auto/v1782505925/kellogg_booth_hockey_cebrrd.jpg",
        highRes: "https://res.cloudinary.com/dvifvmokx/image/upload/q_auto/v1782505925/kellogg_booth_hockey_cebrrd.jpg",
        size: "wide",
        meta: { camera: "", aperture: "", focalLength: "", location: "", date: "" }
    },
    {
        type: "single",
        title: "Basketball",
        category: "event",
        image: "https://res.cloudinary.com/dvifvmokx/image/upload/c_scale,w_600,q_auto/v1782505927/basketball_nud1zx.jpg",
        highRes: "https://res.cloudinary.com/dvifvmokx/image/upload/q_auto/v1782505927/basketball_nud1zx.jpg",
        size: "standard",
        meta: { camera: "", aperture: "", focalLength: "", location: "", date: "" }
    },

    // ── Travel ───────────────────────────────────────────────

    {
        type: "single",
        title: "Harper's Ferry",
        category: "travel",
        image: "https://res.cloudinary.com/dvifvmokx/image/upload/c_scale,w_600,q_auto/v1782505929/harpers_ferry_mur50j.jpg",
        highRes: "https://res.cloudinary.com/dvifvmokx/image/upload/q_auto/v1782505929/harpers_ferry_mur50j.jpg",
        size: "wide",
        meta: { camera: "", aperture: "", focalLength: "", location: "Harper's Ferry, WV", date: "" }
    },

    // ── Hong Kong & Taiwan Collection ────────────────────────
    // All three images appear individually in the grid but link
    // to each other. Clicking any opens the full collection carousel.

    {
        type: "collection",
        featured: true,
        collectionId: "hk-taiwan",
        collectionTitle: "Hong Kong & Taiwan",
        albumUrl: "https://photos.app.goo.gl/ngK6BsUpCMh2QYy89",
        title: "Sun Moon Lake",
        category: "travel",
        image: "https://res.cloudinary.com/dvifvmokx/image/upload/c_scale,w_600,q_auto/v1782505928/sun_moon_lake_l3ux0k.jpg",
        highRes: "https://res.cloudinary.com/dvifvmokx/image/upload/q_auto/v1782505928/sun_moon_lake_l3ux0k.jpg",
        size: "wide",
        meta: { camera: "", aperture: "", focalLength: "", location: "Sun Moon Lake, Taiwan", date: "" },
        images: [
            {
                title: "Sun Moon Lake",
                image: "https://res.cloudinary.com/dvifvmokx/image/upload/c_scale,w_600,q_auto/v1782505928/sun_moon_lake_l3ux0k.jpg",
                highRes: "https://res.cloudinary.com/dvifvmokx/image/upload/q_auto/v1782505928/sun_moon_lake_l3ux0k.jpg",
                meta: { location: "Sun Moon Lake, Taiwan" }
            },
            {
                title: "HK — Monster House",
                image: "https://res.cloudinary.com/dvifvmokx/image/upload/c_scale,w_600,q_auto/v1782505928/hk_monsterhouse_r7octr.jpg",
                highRes: "https://res.cloudinary.com/dvifvmokx/image/upload/q_auto/v1782505928/hk_monsterhouse_r7octr.jpg",
                meta: { location: "Hong Kong" }
            },
            {
                title: "HK Skyline",
                image: "https://res.cloudinary.com/dvifvmokx/image/upload/c_scale,w_600,q_auto/v1782505928/hk_skyline_nhxycf.jpg",
                highRes: "https://res.cloudinary.com/dvifvmokx/image/upload/q_auto/v1782505928/hk_skyline_nhxycf.jpg",
                meta: { location: "Hong Kong" }
            },
        ]
    },
    {
        type: "collection",
        collectionId: "hk-taiwan",
        collectionTitle: "Hong Kong & Taiwan",
        albumUrl: "https://photos.app.goo.gl/ngK6BsUpCMh2QYy89",
        title: "HK — Monster House",
        category: "travel",
        image: "https://res.cloudinary.com/dvifvmokx/image/upload/c_scale,w_600,q_auto/v1782505928/hk_monsterhouse_r7octr.jpg",
        highRes: "https://res.cloudinary.com/dvifvmokx/image/upload/q_auto/v1782505928/hk_monsterhouse_r7octr.jpg",
        size: "standard",
        meta: { camera: "", aperture: "", focalLength: "", location: "Hong Kong", date: "" },
        images: [
            {
                title: "Sun Moon Lake",
                image: "https://res.cloudinary.com/dvifvmokx/image/upload/c_scale,w_600,q_auto/v1782505928/sun_moon_lake_l3ux0k.jpg",
                highRes: "https://res.cloudinary.com/dvifvmokx/image/upload/q_auto/v1782505928/sun_moon_lake_l3ux0k.jpg",
                meta: { location: "Sun Moon Lake, Taiwan" }
            },
            {
                title: "HK — Monster House",
                image: "https://res.cloudinary.com/dvifvmokx/image/upload/c_scale,w_600,q_auto/v1782505928/hk_monsterhouse_r7octr.jpg",
                highRes: "https://res.cloudinary.com/dvifvmokx/image/upload/q_auto/v1782505928/hk_monsterhouse_r7octr.jpg",
                meta: { location: "Hong Kong" }
            },
            {
                title: "HK Skyline",
                image: "https://res.cloudinary.com/dvifvmokx/image/upload/c_scale,w_600,q_auto/v1782505928/hk_skyline_nhxycf.jpg",
                highRes: "https://res.cloudinary.com/dvifvmokx/image/upload/q_auto/v1782505928/hk_skyline_nhxycf.jpg",
                meta: { location: "Hong Kong" }
            },
        ]
    },
    {
        type: "collection",
        collectionId: "hk-taiwan",
        collectionTitle: "Hong Kong & Taiwan",
        albumUrl: "https://photos.app.goo.gl/ngK6BsUpCMh2QYy89",
        title: "HK Skyline",
        category: "travel",
        image: "https://res.cloudinary.com/dvifvmokx/image/upload/c_scale,w_600,q_auto/v1782505928/hk_skyline_nhxycf.jpg",
        highRes: "https://res.cloudinary.com/dvifvmokx/image/upload/q_auto/v1782505928/hk_skyline_nhxycf.jpg",
        size: "wide",
        meta: { camera: "", aperture: "", focalLength: "", location: "Hong Kong", date: "" },
        images: [
            {
                title: "Sun Moon Lake",
                image: "https://res.cloudinary.com/dvifvmokx/image/upload/c_scale,w_600,q_auto/v1782505928/sun_moon_lake_l3ux0k.jpg",
                highRes: "https://res.cloudinary.com/dvifvmokx/image/upload/q_auto/v1782505928/sun_moon_lake_l3ux0k.jpg",
                meta: { location: "Sun Moon Lake, Taiwan" }
            },
            {
                title: "HK — Monster House",
                image: "https://res.cloudinary.com/dvifvmokx/image/upload/c_scale,w_600,q_auto/v1782505928/hk_monsterhouse_r7octr.jpg",
                highRes: "https://res.cloudinary.com/dvifvmokx/image/upload/q_auto/v1782505928/hk_monsterhouse_r7octr.jpg",
                meta: { location: "Hong Kong" }
            },
            {
                title: "HK Skyline",
                image: "https://res.cloudinary.com/dvifvmokx/image/upload/c_scale,w_600,q_auto/v1782505928/hk_skyline_nhxycf.jpg",
                highRes: "https://res.cloudinary.com/dvifvmokx/image/upload/q_auto/v1782505928/hk_skyline_nhxycf.jpg",
                meta: { location: "Hong Kong" }
            },
        ]
    },

    // ── More Travel ──────────────────────────────────────────

    {
        type: "single",
        title: "MGM Grand from Sky",
        category: "travel",
        image: "https://res.cloudinary.com/dvifvmokx/image/upload/c_scale,w_600,q_auto/v1782505928/mgm_fromsky_v34wdz.jpg",
        highRes: "https://res.cloudinary.com/dvifvmokx/image/upload/q_auto/v1782505928/mgm_fromsky_v34wdz.jpg",
        size: "wide",
        meta: { camera: "", aperture: "", focalLength: "", location: "Las Vegas, NV", date: "" }
    },
    {
        type: "single",
        title: "NYC Snow",
        category: "travel",
        image: "https://res.cloudinary.com/dvifvmokx/image/upload/c_scale,w_600,q_auto/v1782505927/nyc_snow_pqzean.jpg",
        highRes: "https://res.cloudinary.com/dvifvmokx/image/upload/q_auto/v1782505927/nyc_snow_pqzean.jpg",
        size: "wide",
        meta: { camera: "", aperture: "", focalLength: "", location: "New York, NY", date: "" }
    },
    {
        type: "single",
        title: "Cuba — Classic Car",
        category: "travel",
        image: "https://res.cloudinary.com/dvifvmokx/image/upload/c_scale,w_600,q_auto/v1782505927/cuba_car_mbgn3a.jpg",
        highRes: "https://res.cloudinary.com/dvifvmokx/image/upload/q_auto/v1782505927/cuba_car_mbgn3a.jpg",
        size: "wide",
        meta: { camera: "", aperture: "", focalLength: "", location: "Havana, Cuba", date: "" }
    },
    {
        type: "single",
        title: "Cuba — Buildings",
        category: "travel",
        image: "https://res.cloudinary.com/dvifvmokx/image/upload/c_scale,w_600,q_auto/v1782505927/cuba_buildings_udyvqa.jpg",
        highRes: "https://res.cloudinary.com/dvifvmokx/image/upload/q_auto/v1782505927/cuba_buildings_udyvqa.jpg",
        size: "wide",
        meta: { camera: "", aperture: "", focalLength: "", location: "Havana, Cuba", date: "" }
    },
    {
        type: "single",
        featured: true,
        title: "Cuba — Church",
        category: "travel",
        image: "https://res.cloudinary.com/dvifvmokx/image/upload/c_scale,w_600,q_auto/v1782505926/cuba_church_lkrog4.jpg",
        highRes: "https://res.cloudinary.com/dvifvmokx/image/upload/q_auto/v1782505926/cuba_church_lkrog4.jpg",
        size: "tall",
        meta: { camera: "", aperture: "", focalLength: "", location: "Havana, Cuba", date: "" }
    },
    {
        type: "single",
        title: "Safari — Elephant",
        category: "travel",
        image: "https://res.cloudinary.com/dvifvmokx/image/upload/c_scale,w_600,q_auto/v1782505926/safari_elephant_tbar91.jpg",
        highRes: "https://res.cloudinary.com/dvifvmokx/image/upload/q_auto/v1782505926/safari_elephant_tbar91.jpg",
        size: "wide",
        meta: { camera: "", aperture: "", focalLength: "", location: "Africa", date: "" }
    },
    {
        type: "single",
        title: "Safari — Lion",
        category: "travel",
        image: "https://res.cloudinary.com/dvifvmokx/image/upload/c_scale,w_600,q_auto/v1782505926/safari_lion_ulu2tn.jpg",
        highRes: "https://res.cloudinary.com/dvifvmokx/image/upload/q_auto/v1782505926/safari_lion_ulu2tn.jpg",
        size: "wide",
        meta: { camera: "", aperture: "", focalLength: "", location: "Africa", date: "" }
    },
    {
        type: "single",
        title: "Safari — Cheetah",
        category: "travel",
        image: "https://res.cloudinary.com/dvifvmokx/image/upload/c_scale,w_600,q_auto/v1782505926/safari_cheetah_xy2qmr.jpg",
        highRes: "https://res.cloudinary.com/dvifvmokx/image/upload/q_auto/v1782505926/safari_cheetah_xy2qmr.jpg",
        size: "wide",
        meta: { camera: "", aperture: "", focalLength: "", location: "Africa", date: "" }
    },
    {
        type: "single",
        title: "Safari — Bus",
        category: "travel",
        image: "https://res.cloudinary.com/dvifvmokx/image/upload/c_scale,w_600,q_auto/v1782505925/safari_bus_zqdexd.jpg",
        highRes: "https://res.cloudinary.com/dvifvmokx/image/upload/q_auto/v1782505925/safari_bus_zqdexd.jpg",
        size: "wide",
        meta: { camera: "", aperture: "", focalLength: "", location: "Africa", date: "" }
    },

    // ── Video ─────────────────────────────────────────────────

    {
        type: "single",
        title: "Dunkmaster Basketball",
        category: "video",
        image: "https://img.youtube.com/vi/qQBMzM0jdPA/hqdefault.jpg",
        videoUrl: "https://www.youtube.com/embed/qQBMzM0jdPA",
        size: "wide",
        meta: { camera: "", aperture: "", focalLength: "", location: "", date: "" }
    },

    // ── Deck example (placeholder) ────────────────────────────
    // Uncomment and fill in slides[] with your Cloudinary image URLs
    // when you're ready to showcase a slide deck.
    //
    // {
    //     type: "deck",
    //     title: "My Slide Deck",
    //     category: "graphic-design",
    //     image: "https://res.cloudinary.com/dvifvmokx/image/upload/.../slide01.jpg",
    //     size: "wide",
    //     meta: { location: "", date: "" },
    //     slides: [
    //         "https://res.cloudinary.com/dvifvmokx/image/upload/.../slide01.jpg",
    //         "https://res.cloudinary.com/dvifvmokx/image/upload/.../slide02.jpg",
    //         // ...
    //     ]
    // },

];