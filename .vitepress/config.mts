import { defineConfig } from "vitepress";

export default defineConfig({
  lang: "en-US",
  title: "Oneverse for Developers",
  description: "Oneverse API Documentations",
  themeConfig: {
    logo: "https://oneone.com/assets/logo-2-77da0a12.png",

    nav: [
      { text: "Get Started", link: "/get-started" },
      {
        text: "Guide",
        items: [
          { text: "Signing Request", link: "/guide/signature-algorithm.md" },
          { text: "Authentication", link: "/guide/authentication.md" },
          { text: "Rate Limiting", link: "/guide/rate-limiting.md" },
          { text: "Error Codes", link: "/guide/errors.md" },
        ],
      },
      {
        text: "Reference",
        items: [{ text: "Payment API", link: "/reference/payment-api.md" }],
      },
    ],

    sidebar: [
      { text: "Get Started", link: "/get-started" },
      {
        text: "Guide",
        items: [
          { text: "Signing Request", link: "/guide/signature-algorithm.md" },
          { text: "Authentication", link: "/guide/authentication.md" },
          { text: "Rate Limiting", link: "/guide/rate-limiting.md" },
          { text: "Error Codes", link: "/guide/errors.md" },
        ],
      },
      {
        text: "Reference",
        items: [
          {
            text: "Payment API",
            link: "/reference/payment-api.md",
            items: [
              {
                text: "Login",
                link: "/reference/payment-api.md#login",
              },
              {
                text: "List Orders",
                link: "/reference/payment-api.md#list-orders",
              },
              {
                text: "Create Order",
                link: "/reference/payment-api.md#create-order",
              },
              {
                text: "Get Order",
                link: "/reference/payment-api.md#get-order",
              },
            ],
          },
        ],
      },
    ],

    footer: {
      message: "Oneverse for Developers",
      copyright:
        'Copyright © 2023-present <a href="https://oneone.com?ref=oneone66.github.io" target="_blank" rel="noreferrer">Oneverse Technology</a>',
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});
