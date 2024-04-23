import { defaultTheme } from "@vuepress/theme-default";
import { defineUserConfig } from "vuepress/cli";
import { viteBundler } from "@vuepress/bundler-vite";

export default defineUserConfig({
  lang: "en-US",

  title: "Oneverse",
  description: "Your preferred digital payment solution partner.",

  theme: defaultTheme({
    logo: "https://oneone.com/assets/logo-2-77da0a12.png",

    navbar: ["/", "/get-started"],
  }),

  bundler: viteBundler(),
});
