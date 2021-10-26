const withTM = require("next-transpile-modules")(["next-slicezone"]);

module.exports = withTM({
    // i18n: {
    //     locales: ['en-us', 'fr-fr', 'de-de','es-es'],
    //     defaultLocale: 'en-us',
    // }
  // env: {
  //   NEXT_PUBLIC_API_ENDPOINT: process.env.NEXT_PUBLIC_API_ENDPOINT,
  // },
});
