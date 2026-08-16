const { chromium } = require('playwright');

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    await page.goto('https://www.instagram.com/accounts/login/');
    console.log('Página de login cargada ✅');

    await page.waitForSelector('input[placeholder*="username" i], input[placeholder*="email" i]');

    await page.fill('input[placeholder*="username" i], input[placeholder*="email" i]', 'squirrel.1506264');
    await page.fill('input[placeholder*="assword" i]', 'Goku2001');

    console.log('Datos escritos ✅');

    await page.click('text=Log in');
    console.log('Botón de login presionado ✅');

    await page.waitForTimeout(3000);

    console.log('Login probado con éxito ✅');

  } catch (error) {
    console.error('Error en el bot:', error.message);
    await page.screenshot({ path: 'error.png' });
  } finally {
    await browser.close();
  }
}

main();
