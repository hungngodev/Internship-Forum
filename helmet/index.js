const helmet = require('helmet');
const scriptSrcUrls = [
    "https://stackpath.bootstrapcdn.com/",
    "https://api.tiles.mapbox.com/",
    "https://api.mapbox.com/",
    "https://kit.fontawesome.com/",
    "https://cdnjs.cloudflare.com/",
    "https://cdn.jsdelivr.net",
];
const styleSrcUrls = [
    "https://kit-free.fontawesome.com/",
    "https://stackpath.bootstrapcdn.com/",
    "https://api.mapbox.com/",
    "https://api.tiles.mapbox.com/",
    "https://fonts.googleapis.com/",
    "https://use.fontawesome.com/",
];
const connectSrcUrls = [
    "https://api.mapbox.com/",
    "https://a.tiles.mapbox.com/",
    "https://b.tiles.mapbox.com/",
    "https://events.mapbox.com/",
];
const fontSrcUrls = [];
const config = helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: [],
        connectSrc: ["'self'", ...connectSrcUrls],
        scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
        styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
        workerSrc: ["'self'", "blob:"],
        objectSrc: [],
        imgSrc: [
            "'self'",
            "blob:",
            "data:",
            "https://res.cloudinary.com/dj6dtuqnr/", 
            "https://images.unsplash.com/",
            "https://plus.unsplash.com/premium_photo-1661877737564-3dfd7282efcb?q=80&w=2700&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://cdn3.vectorstock.com/",
            "https://t4.ftcdn.net/jpg/03/11/50/71/360_F_311507184_0mErEL2kUw7z4AbXhsxPjFE7hQnY7BLy.jpg",
            "https://www.shutterstock.com/",
            "https://wallpaper.dog/large/10812328.jpg",
            "https://img.freepik.com/premium-psd/abstract-colorful-gradient-background-psd-modern-windows-desktop-wallpaper-4k-panoramic-size-2022_691560-34.jpg",
            "https:",
        ],
        fontSrc: ["'self'", ...fontSrcUrls],
    },
})
module.exports=config;