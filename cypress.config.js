const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Configurações de plugins aqui (se necessário)
    },
    // Se estiver usando modo headless, passe o argumento pro navegador
    browser: 'chrome',
    reporter: 'mochawesome',

  },
  chromeWebSecurity: false,
  video: false,
  screenshotOnRunFailure: false,
  viewportWidth: 1280,
  viewportHeight: 720,
  // Adiciona flags ao Chrome / Electron
  userAgent: "CI",
  env: {},
});
