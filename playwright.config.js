// playwright.config.js
export default {
  use: {
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
  reporter: [['html', { outputFolder: 'html-report' }]]
};
