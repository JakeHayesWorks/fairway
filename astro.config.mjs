import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import netlify from "@astrojs/netlify";

import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
  site: "https://fairway.jakehayes.net",
  integrations: [mdx(), sitemap(), react(), partytown()],
  vite: {
    plugins: [tailwindcss()],
  },
  adapter: netlify({
    redirects: [
      {
        from: "/stats.js",
        to: "https://cloud.umami.is/script.js",
        status: 200,
      },
    ],
  }),
});
