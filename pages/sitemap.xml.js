import React from "react";
import { pagesQuery, menuQuery } from "../lib/queries";
import { fetchQuery } from "../lib/sanity";

const Sitemap = () => {};

export async function getServerSideProps({ req, res }) {
	const protocol = process.env.NODE_ENV === "development" ? "http://" : "https://";
	let host;
	if (req) {
		// Server side rendering
		host = req.headers.host;
	} else {
		// Client side rendering
		host = window.location.hostname + (window.location.port ? ":" + window.location.port : "");
	}
	const data = await fetchQuery(
		`{
        "pages": ${pagesQuery},
        "menuData": ${menuQuery},
        "hostname": "${host}"
      }`
	);

	const { pages, menuData, hostname } = data;

	const updatedWeekly = new Set(["talks", "all-talks"]);

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${pages
			.map((page) => {
				return `
          <url>
            <loc>${protocol}${hostname}/${page.slug.current}</loc>
            <lastmod>${new Date(page._updatedAt).toISOString()}</lastmod>
            <changefreq>${updatedWeekly.has(page.slug.current) ? "weekly" : "monthly"}</changefreq>
            <priority>1.0</priority>
          </url>
        `;
			})
			.join("")}
    </urlset>
  `;

	res.setHeader("Content-Type", "text/xml");
	res.write(sitemap);
	res.end();

	return {
		props: {}
	};
}

export default Sitemap;
