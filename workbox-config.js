
// workbox uses this file to generate service workers

module.exports = {
  "globDirectory": "build/",
  "globPatterns": [
    "**/*.{jpg,svg,html,js,css,json}"
  ],
  "swSrc": "src/sw.js",
  "swDest": "build\\sw.js",
  "globIgnores": [
    "../workbox-config.js"
  ]
};