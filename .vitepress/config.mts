import { defineConfig } from "vitepress";

export default defineConfig({
  lang: "en-US",
  title: "Oneverse for Developers",
  description: "Oneverse API Documentations",
  lastUpdated: true,
  head: [
    [
      "link",
      {
        rel: "apple-touch-icon",
        type: "image/png",
        sizes: "180x180",
        href: "/apple-touch-icon.png",
      },
    ],
    [
      "link",
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon-32x32.png",
      },
    ],
    [
      "link",
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon-16x16.png",
      },
    ],
    [
      "link",
      {
        rel: "manifest",
        href: "/site.webmanifest",
      },
    ],
  ],
  themeConfig: {
    logo: "https://oneone.com/assets/logo-2-77da0a12.png",

    nav: [
      { text: "Get Started", link: "/get-started" },
      {
        text: "Guide",
        items: [
          { text: "Signing Request", link: "/guide/signature-algorithm" },
          { text: "Authentication", link: "/guide/authentication" },
          { text: "Rate Limiting", link: "/guide/rate-limiting" },
          { text: "Error Codes", link: "/guide/errors" },
        ],
      },
      {
        text: "Reference",
        items: [
          { text: "Payment API", link: "/reference/payment-api" },
          { text: "Reseller API", link: "/reference/reseller-api" },
        ],
      },
    ],

    sidebar: [
      { text: "Get Started", link: "/get-started" },
      {
        text: "Guide",
        items: [
          { text: "Signing Request", link: "/guide/signature-algorithm" },
          { text: "Authentication", link: "/guide/authentication" },
          { text: "Rate Limiting", link: "/guide/rate-limiting" },
          { text: "Error Codes", link: "/guide/errors" },
        ],
      },
      {
        text: "Reference",
        items: [
          {
            text: "Payment API",
            link: "/reference/payment-api",
            items: [
              {
                text: "Login",
                link: "/reference/payment-api#login",
              },
              {
                text: "List Orders",
                link: "/reference/payment-api#list-orders",
              },
              {
                text: "Create Order",
                link: "/reference/payment-api#create-order",
              },
              {
                text: "Get Order",
                link: "/reference/payment-api#get-order",
              },
            ],
          },
          {
            text: "Reseller API",
            link: "/reference/reseller-api",
            items: [
              {
                text: "Login",
                link: "/reference/reseller-api#login",
              },
              {
                text: "List Games",
                link: "/reference/reseller-api#list-games",
              },
              {
                text: "Show Game Info",
                link: "/reference/reseller-api#show-game-info",
              },
              {
                text: "List Game Servers",
                link: "/reference/reseller-api#list-game-servers",
              },
              {
                text: "List Game Items",
                link: "/reference/reseller-api#list-game-items",
              },
              {
                text: "List Game Characters",
                link: "/reference/reseller-api#list-game-characters",
              },
              {
                text: "Create Order",
                link: "/reference/reseller-api#create-order",
              },
              {
                text: "Get Order",
                link: "/reference/reseller-api#get-order",
              },
              {
                text: "Confirm Order",
                link: "/reference/reseller-api#confirm-order",
              },
              {
                text: "Get Wallet Balance",
                link: "/reference/reseller-api#get-wallet-balance",
              }
            ],
          },
        ],
      },
    ],

    footer: {
      message: "Oneverse for Developers",
      copyright:
        'Copyright © 2023-present <a href="https://oneone.com?ref=docs" target="_blank" rel="noreferrer">Oneverse Technology</a>',
    },

    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/oneone666/oneone666.github.io",
      },
    ],

    search: {
      provider: "local",
    },
  },
});
