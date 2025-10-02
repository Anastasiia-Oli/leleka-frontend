/** @type {import('next-i18next').UserConfig} */
module.exports = {
  i18n: {
    defaultLocale: "eng",
    locales: ["eng", "deu"],
  },
  reloadOnPrerender: process.env.NODE_ENV === "development",
};
