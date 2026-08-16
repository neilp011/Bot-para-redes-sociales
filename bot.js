const { chromium } = require('playwright');

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    await page.goto('https://www.instagram.com/accounts/login/');
    console.log('Página cargada ✅');

    await page.waitForTimeout(3000);
    await page.screenshot({ path: 'vista.png', fullPage: true });
    console.log('Captura tomada ✅');

  } catch (error) {
    console.error('Error en el bot:', error.message);
  } finally {
    await browser.close();
  }
}

main();
