import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

const BASE_URL = "https://savannahcloud.com";

export const Route = createFileRoute("/image-sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const images = [
          { loc: "/", img: "/favicon.png", title: "Savannah Cloud logo", caption: "Savannah Cloud — A Siohioma Group Company" },
        ];
        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${images.map(i => `  <url>
    <loc>${BASE_URL}${i.loc}</loc>
    <image:image>
      <image:loc>${BASE_URL}${i.img}</image:loc>
      <image:title>${i.title}</image:title>
      <image:caption>${i.caption}</image:caption>
    </image:image>
  </url>`).join("\n")}
</urlset>`;
        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
