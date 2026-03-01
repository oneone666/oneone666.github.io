import {defineConfig} from "vitepress";

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
            {text: "Get Started", link: "/get-started"},
            {
                text: "Guide",
                items: [
                    {text: "Signing Request", link: "/guide/signing-requests"},
                    {text: "Authentication", link: "/guide/authentication"},
                    {text: "Rate Limiting", link: "/guide/rate-limiting"},
                    {text: "Error Codes", link: "/guide/errors"},
                ],
            },
            {
                text: "Reference",
                items: [
                    {text: "Northbound API V1", link: "/reference/northbound-api"},
                    {text: "Northbound API V2", link: "/reference/northbound-api-v2"},
                    {text: "Southbound API", link: "/reference/southbound-api"},
                ],
            },
        ],

        sidebar: [
            {text: "Get Started", link: "/get-started"},
            {
                text: "Guide",
                items: [
                    {text: "Signing Request", link: "/guide/signing-requests"},
                    {text: "Authentication", link: "/guide/authentication"},
                    {text: "Rate Limiting", link: "/guide/rate-limiting"},
                    {text: "Error Codes", link: "/guide/errors"},
                ],
            },
            {
                text: "Reference",
                items: [
                    {
                        text: "Northbound V1",
                        link: "/reference/northbound-api",
                        items: [
                            {
                                text: "Merchant Login",
                                link: "/reference/northbound-api#login",
                            },
                            {
                                text: "List Orders",
                                link: "/reference/northbound-api#list-orders",
                            },
                            {
                                text: "Create Order",
                                link: "/reference/northbound-api#create-order",
                            },
                            {
                                text: "Get Order",
                                link: "/reference/northbound-api#get-order",
                            },
                            {
                                text: "Get Webshop Order",
                                link: "/reference/northbound-api#get-webshop-order",
                            },
                        ],
                    },
                    {
                        text: "Northbound V2",
                        link: "/reference/northbound-api-v2",
                        items: [
                            {
                                text: "Authentication",
                                link: "/reference/northbound-api-v2#authentication",
                            },
                            {
                                text: "Signature",
                                link: "/reference/northbound-api-v2#signature",
                            },
                            {
                                text: "List Orders",
                                link: "/reference/northbound-api-v2#list-orders",
                            },
                            {
                                text: "Create Order",
                                link: "/reference/northbound-api-v2#create-order",
                            },
                            {
                                text: "Get Order",
                                link: "/reference/northbound-api-v2#get-order",
                            },
                            {
                                text: "Callback",
                                link: "/reference/northbound-api-v2#payment-success",
                            },
                        ],
                    },
                    {
                        text: "Southbound API",
                        link: "/reference/southbound-api",
                        items: [
                            {
                                text: "Login",
                                link: "/reference/southbound-api#login",
                            },
                            {
                                text: "List Games",
                                link: "/reference/southbound-api#list-games",
                            },
                            {
                                text: "Show Game Info",
                                link: "/reference/southbound-api#show-game-info",
                            },
                            {
                                text: "List Game Servers",
                                link: "/reference/southbound-api#list-game-servers",
                            },
                            {
                                text: "List Game Items",
                                link: "/reference/southbound-api#list-game-items",
                            },
                            {
                                text: "List Game Characters",
                                link: "/reference/southbound-api#list-game-characters",
                            },
                            {
                                text: "Create Order",
                                link: "/reference/southbound-api#create-order",
                            },
                            {
                                text: "Get Order",
                                link: "/reference/southbound-api#get-order",
                            },
                            {
                                text: "Confirm Order",
                                link: "/reference/southbound-api#confirm-order",
                            },
                            {
                                text: "Get Wallet Balance",
                                link: "/reference/southbound-api#get-wallet-balance",
                            },
                            {
                                text: "Get Payment",
                                link: "/reference/southbound-api#get-payment",
                            },
                            {
                                text: "Confirm Payment",
                                link: "/reference/southbound-api#confirm-payment",
                            },
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
