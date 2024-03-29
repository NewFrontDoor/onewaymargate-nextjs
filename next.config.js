// Next.config.js
const withPlugins = require("next-compose-plugins");
const withImages = require("next-images");
const withCSS = require("@zeit/next-css");
const withFonts = require("next-fonts");

const nextConfig = {
	env: {
		ONEWAY_GMAP_API: process.env.ONEWAY_GMAP_API
	},
	webpack: (config, options) => {
		// Modify the `config` here

		return config;
	}
};

module.exports = withPlugins([withFonts, [withImages, { ignoreTypes: ["svg"] }], withCSS], nextConfig);
