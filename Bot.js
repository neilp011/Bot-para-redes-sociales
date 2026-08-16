
const { chromium } = require('playwright');

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto('https://tu-red-social.com');
  console.log('Página cargada correctamente');

  await browser.close();
}

main();
