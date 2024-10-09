// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion
require('dotenv').config()

const { themes } = require('prism-react-renderer')
const { github: lightCodeTheme, dracula: darkCodeTheme } = themes

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: `${process.env.PROJECT_TITLE}`,
  tagline: `${process.env.PROJECT_TITLE} Docs`,
  url: `https://${process.env.ORGANIZATION_NAME}.github.io`,
  baseUrl: `/${process.env.PROJECT_NAME}`,
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.png',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: `${process.env.ORGANIZATION_NAME}`, // Usually your GitHub org/user name.
  projectName: `${process.env.PROJECT_NAME}`, // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/', // Serve the docs at the site's root
          sidebarPath: require.resolve('./sidebars.js'),
          // Remove this to remove the "edit this page" links.
          editUrl: `https://github.com/${process.env.ORGANIZATION_NAME}/${process.env.PROJECT_NAME}/tree/${process.env.BRANCH_NAME}`,
        },
        blog: false, // Disable the blog plugin
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  plugins: [
    require.resolve("docusaurus-lunr-search"),
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: 'light',
        disableSwitch: true,
        respectPrefersColorScheme: false,
      },
      navbar: {
        title: 'OrgBook API',
        logo: {
          alt: 'OrgBook API',
          src: 'img/logo.svg',
        },
        items: [
          {
            label: 'GitHub',
            href: `https://github.com/${process.env.ORGANIZATION_NAME}/${process.env.PROJECT_NAME}`,
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'OrgBook API',
                to: '/',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: `https://github.com/${process.env.ORGANIZATION_NAME}/${process.env.PROJECT_NAME}`,
              },
            ],
          },
        ],
        // copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
