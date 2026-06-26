// visuals.js — Gallery data for the Visuals page
//
// 💡 CLOUDINARY PERFORMANCE TIP:
// Use a compressed thumbnail for the grid and a high-res version for the expanded view.
// Thumbnail: add c_scale,w_600,q_auto to the upload URL
// High-res:  add q_auto only
//
// 💡 METADATA: Fill in camera, aperture, focalLength, location, date for each image.
// Leave any field as "" if unknown — it simply won't render in the panel.
//
// 💡 CATEGORIES: event | people | travel | concert | video
//
// 💡 VIDEO: Set videoUrl to a YouTube embed link (https://www.youtube.com/embed/...).

const visualsData = [

    // ── Concert / Battle of the Bands ───────────────────────

    {
        title: "BOTB 2025 — Promo",
        category: "concert",
        image: "https://res.cloudinary.com/dvifvmokx/image/upload/c_scale,w_600,q_auto/v1782505924/botb25_promo_cvdjs6.jpg",
        highRes: "https://res.cloudinary.com/dvifvmokx/image/upload/q_auto/v1782505924/botb25_promo_cvdjs6.jpg",
        size: "wide",
        meta: { camera: "", aperture: "", focalLength: "", location: "", date: "" }
    },
    {
        title: "BOTB 2025 — Thomas",
        category: "concert",
        image: "https://res.cloudinary.com/dvifvmokx/image/upload/c_scale,w_600,q_auto/v1782505924/botb25_thomas_ag7q3h.jpg",
        highRes: "https://res.cloudinary.com/dvifvmokx/image/upload/q_auto/v1782505924/botb25_thomas_ag7q3h.jpg",
        size: "standard",
        meta: { camera: "", aperture: "", focalLength: "", location: "", date: "" }
    },
    {
        title: "BOTB 2025 — Rockets",
        category: "concert",
        image: "https://res.cloudinary.com/dvifvmokx/image/upload/c_scale,w_600,q_auto/v1782505924/botb25_rockets_rsuurc.jpg",
        highRes: "https://res.cloudinary.com/dvifvmokx/image/upload/q_auto/v1782505924/botb25_rockets_rsuurc.jpg",
        size: "wide",
        meta: { camera: "", aperture: "", focalLength: "", location: "", date: "" }
    },
    {
        title: "BOTB 2025",
        category: "concert",
        image: "https://res.cloudinary.com/dvifvmokx/image/upload/c_scale,w_600,q_auto/v1782505924/botb25__zkpyqd.jpg",
        highRes: "https://res.cloudinary.com/dvifvmokx/image/upload/q_auto/v1782505924/botb25__zkpyqd.jpg",
        size: "standard",
        meta: { camera: "", aperture: "", focalLength: "", location: "", date: "" }
    },
    {
        title: "BOTB 2025 — Zain",
        category: "concert",
        image: "https://res.cloudinary.com/dvifvmokx/image/upload/c_scale,w_600,q_auto/v1782505924/botb25_zain_xgpo9r.jpg",
        highRes: "https://res.cloudinary.com/dvifvmokx/image/upload/q_auto/v1782505924/botb25_zain_xgpo9r.jpg",
        size: "standard",
        meta: { camera: "", aperture: "", focalLength: "", location: "", date: "" }
    },
    {
        title: "BOTB 2026 — Kim",
        category: "concert",
        image: "https://res.cloudinary.com/dvifvmokx/image/upload/c_scale,w_600,q_auto/v1782505924/botb26_kim_snfiob.jpg",
        highRes: "https://res.cloudinary.com/dvifvmokx/image/upload/q_auto/v1782505924/botb26_kim_snfiob.jpg",
        size: "standard",
        meta: { camera: "", aperture: "", focalLength: "", location: "", date: "" }
    },
    {
        title: "BOTB — Captains",
        category: "concert",
        image: "https://res.cloudinary.com/dvifvmokx/image/upload/c_scale,w_600,q_auto/v1782505924/botb_captains_redics.jpg",
        highRes: "https://res.cloudinary.com/dvifvmokx/image/upload/q_auto/v1782505924/botb_captains_redics.jpg",
        size: "wide",
        meta: { camera: "", aperture: "", focalLength: "", location: "", date: "" }
    },
    {
        title: "BOTB — Booth",
        category: "concert",
        image: "https://res.cloudinary.com/dvifvmokx/image/upload/c_scale,w_600,q_auto/v1782505925/botb_booth_w8ownh.jpg",
        highRes: "https://res.cloudinary.com/dvifvmokx/image/upload/q_auto/v1782505925/botb_booth_w8ownh.jpg",
        size: "wide",
        meta: { camera: "", aperture: "", focalLength: "", location: "", date: "" }
    },
    {
        title: "BOTB 2026 — James",
        category: "concert",
        image: "https://res.cloudinary.com/dvifvmokx/image/upload/c_scale,w_600,q_auto/v1782505923/botb26_james_ilc1jo.jpg",
        highRes: "https://res.cloudinary.com/dvifvmokx/image/upload/q_auto/v1782505923/botb26_james_ilc1jo.jpg",
        size: "standard",
        meta: { camera: "", aperture: "", focalLength: "", location: "", date: "" }
    },

    // ── People ───────────────────────────────────────────────

    {
        title: "AMA 2026",
        category: "people",
        image: "https://res.cloudinary.com/dvifvmokx/image/upload/c_scale,w_600,q_auto/v1782506235/ama_2026_ip6lre.jpg",
        highRes: "https://res.cloudinary.com/dvifvmokx/image/upload/q_auto/v1782506235/ama_2026_ip6lre.jpg",
        size: "wide",
        meta: { camera: "", aperture: "", focalLength: "", location: "", date: "" }
    },
    {
        title: "Dev — Headshot",
        category: "people",
        image: "https://res.cloudinary.com/dvifvmokx/image/upload/c_scale,w_600,q_auto/v1782506235/dev_headshot_hdiyoq.jpg",
        highRes: "https://res.cloudinary.com/dvifvmokx/image/upload/q_auto/v1782506235/dev_headshot_hdiyoq.jpg",
        size: "tall",
        meta: { camera: "", aperture: "", focalLength: "", location: "", date: "" }
    },
    {
        title: "Nawed — Headshot",
        category: "people",
        image: "https://res.cloudinary.com/dvifvmokx/image/upload/c_scale,w_600,q_auto/v1782506165/nawed_headshot_cbrqq0.jpg",
        highRes: "https://res.cloudinary.com/dvifvmokx/image/upload/q_auto/v1782506165/nawed_headshot_cbrqq0.jpg",
        size: "tall",
        meta: { camera: "", aperture: "", focalLength: "", location: "", date: "" }
    },
    // {
    //     title: "Dev & Rhea — Stairs",
    //     category: "people",
    //     image: "https://res.cloudinary.com/dvifvmokx/image/upload/c_scale,w_600,q_auto/v1782505923/dev_rhea_stairs_gnyriy.jpg",
    //     highRes: "https://res.cloudinary.com/dvifvmokx/image/upload/q_auto/v1782505923/dev_rhea_stairs_gnyriy.jpg",
    //     size: "standard",
    //     meta: { camera: "", aperture: "", focalLength: "", location: "", date: "" }
    // },
    {
        title: "Dev & Rhea — Couch",
        category: "people",
        image: "https://res.cloudinary.com/dvifvmokx/image/upload/c_scale,w_600,q_auto/v1782505923/dev_rhea_couch_qvgxnf.jpg",
        highRes: "https://res.cloudinary.com/dvifvmokx/image/upload/q_auto/v1782505923/dev_rhea_couch_qvgxnf.jpg",
        size: "wide",
        meta: { camera: "", aperture: "", focalLength: "", location: "", date: "" }
    },
    {
        title: "2000s Party",
        category: "concert",
        image: "https://res.cloudinary.com/dvifvmokx/image/upload/c_scale,w_600,q_auto/v1782505925/2000s_party_allie_lbnunm.jpg",
        highRes: "https://res.cloudinary.com/dvifvmokx/image/upload/q_auto/v1782505925/2000s_party_allie_lbnunm.jpg",
        size: "standard",
        meta: { camera: "", aperture: "", focalLength: "", location: "", date: "" }
    },

    // ── Events ───────────────────────────────────────────────

    {
        title: "SPARQ",
        category: "product",
        image: "https://res.cloudinary.com/dvifvmokx/image/upload/c_scale,w_600,q_auto/v1782505928/sparq_xb9jvk.jpg",
        highRes: "https://res.cloudinary.com/dvifvmokx/image/upload/q_auto/v1782505928/sparq_xb9jvk.jpg",
        size: "wide",
        meta: { camera: "", aperture: "", focalLength: "", location: "", date: "" }
    },
    {
        title: "Kellogg Climate Conference",
        category: "event",
        image: "https://res.cloudinary.com/dvifvmokx/image/upload/c_scale,w_600,q_auto/v1782505925/Kellogg_Climate_Conference_Highlights_u11lvw.jpg",
        highRes: "https://res.cloudinary.com/dvifvmokx/image/upload/q_auto/v1782505925/Kellogg_Climate_Conference_Highlights_u11lvw.jpg",
        size: "wide",
        meta: { camera: "", aperture: "", focalLength: "", location: "Kellogg School of Management", date: "" }
    },
    {
        title: "Kellogg x Booth Hockey",
        category: "event",
        image: "https://res.cloudinary.com/dvifvmokx/image/upload/c_scale,w_600,q_auto/v1782505925/kellogg_booth_hockey_cebrrd.jpg",
        highRes: "https://res.cloudinary.com/dvifvmokx/image/upload/q_auto/v1782505925/kellogg_booth_hockey_cebrrd.jpg",
        size: "wide",
        meta: { camera: "", aperture: "", focalLength: "", location: "", date: "" }
    },
    {
        title: "Basketball",
        category: "event",
        image: "https://res.cloudinary.com/dvifvmokx/image/upload/c_scale,w_600,q_auto/v1782505927/basketball_nud1zx.jpg",
        highRes: "https://res.cloudinary.com/dvifvmokx/image/upload/q_auto/v1782505927/basketball_nud1zx.jpg",
        size: "standard",
        meta: { camera: "", aperture: "", focalLength: "", location: "", date: "" }
    },

    // ── Travel ───────────────────────────────────────────────

    {
        title: "Harper's Ferry",
        category: "travel",
        image: "https://res.cloudinary.com/dvifvmokx/image/upload/c_scale,w_600,q_auto/v1782505929/harpers_ferry_mur50j.jpg",
        highRes: "https://res.cloudinary.com/dvifvmokx/image/upload/q_auto/v1782505929/harpers_ferry_mur50j.jpg",
        size: "wide",
        meta: { camera: "", aperture: "", focalLength: "", location: "Harper's Ferry, WV", date: "" }
    },
    {
        title: "HK — Monster House",
        category: "travel",
        image: "https://res.cloudinary.com/dvifvmokx/image/upload/c_scale,w_600,q_auto/v1782505928/hk_monsterhouse_r7octr.jpg",
        highRes: "https://res.cloudinary.com/dvifvmokx/image/upload/q_auto/v1782505928/hk_monsterhouse_r7octr.jpg",
        size: "standard",
        meta: { camera: "", aperture: "", focalLength: "", location: "Hong Kong", date: "" }
    },
    {
        title: "Sun Moon Lake",
        category: "travel",
        image: "https://res.cloudinary.com/dvifvmokx/image/upload/c_scale,w_600,q_auto/v1782505928/sun_moon_lake_l3ux0k.jpg",
        highRes: "https://res.cloudinary.com/dvifvmokx/image/upload/q_auto/v1782505928/sun_moon_lake_l3ux0k.jpg",
        size: "wide",
        meta: { camera: "", aperture: "", focalLength: "", location: "Sun Moon Lake, Taiwan", date: "" }
    },
    {
        title: "MGM Grand from Sky",
        category: "travel",
        image: "https://res.cloudinary.com/dvifvmokx/image/upload/c_scale,w_600,q_auto/v1782505928/mgm_fromsky_v34wdz.jpg",
        highRes: "https://res.cloudinary.com/dvifvmokx/image/upload/q_auto/v1782505928/mgm_fromsky_v34wdz.jpg",
        size: "wide",
        meta: { camera: "", aperture: "", focalLength: "", location: "Las Vegas, NV", date: "" }
    },
    {
        title: "HK Skyline",
        category: "travel",
        image: "https://res.cloudinary.com/dvifvmokx/image/upload/c_scale,w_600,q_auto/v1782505928/hk_skyline_nhxycf.jpg",
        highRes: "https://res.cloudinary.com/dvifvmokx/image/upload/q_auto/v1782505928/hk_skyline_nhxycf.jpg",
        size: "wide",
        meta: { camera: "", aperture: "", focalLength: "", location: "Hong Kong", date: "" }
    },
    {
        title: "NYC Snow",
        category: "travel",
        image: "https://res.cloudinary.com/dvifvmokx/image/upload/c_scale,w_600,q_auto/v1782505927/nyc_snow_pqzean.jpg",
        highRes: "https://res.cloudinary.com/dvifvmokx/image/upload/q_auto/v1782505927/nyc_snow_pqzean.jpg",
        size: "wide",
        meta: { camera: "", aperture: "", focalLength: "", location: "New York, NY", date: "" }
    },
    {
        title: "Akka Wedding",
        category: "people",
        image: "https://res.cloudinary.com/dvifvmokx/image/upload/c_scale,w_600,q_auto/v1782505927/akka_water_dknrku.jpg",
        highRes: "https://res.cloudinary.com/dvifvmokx/image/upload/q_auto/v1782505927/akka_water_dknrku.jpg",
        size: "tall",
        meta: { camera: "", aperture: "", focalLength: "", location: "", date: "" }
    },
    // {
    //     title: "Cuba — Toy",
    //     category: "travel",
    //     image: "https://res.cloudinary.com/dvifvmokx/image/upload/c_scale,w_600,q_auto/v1782505927/cuba_toy_etlk2p.jpg",
    //     highRes: "https://res.cloudinary.com/dvifvmokx/image/upload/q_auto/v1782505927/cuba_toy_etlk2p.jpg",
    //     size: "standard",
    //     meta: { camera: "", aperture: "", focalLength: "", location: "Cuba", date: "" }
    // },
    {
        title: "Cuba — Classic Car",
        category: "travel",
        image: "https://res.cloudinary.com/dvifvmokx/image/upload/c_scale,w_600,q_auto/v1782505927/cuba_car_mbgn3a.jpg",
        highRes: "https://res.cloudinary.com/dvifvmokx/image/upload/q_auto/v1782505927/cuba_car_mbgn3a.jpg",
        size: "wide",
        meta: { camera: "", aperture: "", focalLength: "", location: "Havana, Cuba", date: "" }
    },
    {
        title: "Cuba — Buildings",
        category: "travel",
        image: "https://res.cloudinary.com/dvifvmokx/image/upload/c_scale,w_600,q_auto/v1782505927/cuba_buildings_udyvqa.jpg",
        highRes: "https://res.cloudinary.com/dvifvmokx/image/upload/q_auto/v1782505927/cuba_buildings_udyvqa.jpg",
        size: "wide",
        meta: { camera: "", aperture: "", focalLength: "", location: "Havana, Cuba", date: "" }
    },
    {
        title: "Cuba — Church",
        category: "travel",
        image: "https://res.cloudinary.com/dvifvmokx/image/upload/c_scale,w_600,q_auto/v1782505926/cuba_church_lkrog4.jpg",
        highRes: "https://res.cloudinary.com/dvifvmokx/image/upload/q_auto/v1782505926/cuba_church_lkrog4.jpg",
        size: "tall",
        meta: { camera: "", aperture: "", focalLength: "", location: "Havana, Cuba", date: "" }
    },
    {
        title: "Safari — Elephant",
        category: "travel",
        image: "https://res.cloudinary.com/dvifvmokx/image/upload/c_scale,w_600,q_auto/v1782505926/safari_elephant_tbar91.jpg",
        highRes: "https://res.cloudinary.com/dvifvmokx/image/upload/q_auto/v1782505926/safari_elephant_tbar91.jpg",
        size: "wide",
        meta: { camera: "", aperture: "", focalLength: "", location: "Africa", date: "" }
    },
    {
        title: "Safari — Lion",
        category: "travel",
        image: "https://res.cloudinary.com/dvifvmokx/image/upload/c_scale,w_600,q_auto/v1782505926/safari_lion_ulu2tn.jpg",
        highRes: "https://res.cloudinary.com/dvifvmokx/image/upload/q_auto/v1782505926/safari_lion_ulu2tn.jpg",
        size: "wide",
        meta: { camera: "", aperture: "", focalLength: "", location: "Africa", date: "" }
    },
    {
        title: "Safari — Cheetah",
        category: "travel",
        image: "https://res.cloudinary.com/dvifvmokx/image/upload/c_scale,w_600,q_auto/v1782505926/safari_cheetah_xy2qmr.jpg",
        highRes: "https://res.cloudinary.com/dvifvmokx/image/upload/q_auto/v1782505926/safari_cheetah_xy2qmr.jpg",
        size: "wide",
        meta: { camera: "", aperture: "", focalLength: "", location: "Africa", date: "" }
    },
    {
        title: "Safari — Bus",
        category: "travel",
        image: "https://res.cloudinary.com/dvifvmokx/image/upload/c_scale,w_600,q_auto/v1782505925/safari_bus_zqdexd.jpg",
        highRes: "https://res.cloudinary.com/dvifvmokx/image/upload/q_auto/v1782505925/safari_bus_zqdexd.jpg",
        size: "wide",
        meta: { camera: "", aperture: "", focalLength: "", location: "Africa", date: "" }
    },

    // ── Video ─────────────────────────────────────────────────

    {
        title: "Dunkmaster Basketball",
        category: "video",
        image: "https://img.youtube.com/vi/qQBMzM0jdPA/hqdefault.jpg",
        videoUrl: "https://www.youtube.com/embed/qQBMzM0jdPA",
        size: "wide",
        meta: { camera: "", aperture: "", focalLength: "", location: "", date: "" }
    },

];