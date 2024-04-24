import { defaultTheme } from "@vuepress/theme-default";
import { defineUserConfig } from "vuepress/cli";
import { viteBundler } from "@vuepress/bundler-vite";

export default defineUserConfig({
  lang: "en-US",

  title: "Oneverse for Developers",
  description:
    "Developer documentation for the most preferred digital payment solution partner.",

  theme: defaultTheme({
    logo: "https://oneone.com/assets/logo-2-77da0a12.png",
    navbar: [
      { text: "Get Started", link: "/get-started" },
      {
        text: "Guide",
        children: [
          "/guide/signature-algorithm.md",
          "/guide/authentication.md",
          "/guide/errors.md",
        ],
      },
      { text: "Reference", children: ["/reference/payment-api.md"] },
    ],
    repo: "oneverse/oneverse.github.io",
  }),

  bundler: viteBundler(),
});
