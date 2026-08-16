const { chromium } = require('playwright');

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    await page.goto('https://www.instagram.com/accounts/login/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(5000);

    await page.fill('input[name="email"]', 'squirrel.1506264');
    await page.fill('input[name="pass"]', 'goku2001');

    console.log('Datos escritos ✅');

    await page.locator('input[type="submit"]').dispatchEvent('click');
    console.log('Botón de login presionado ✅');

    await page.waitForTimeout(3000);

    console.log('Login probado con éxito ✅');

  } catch (error) {
    console.error('Error en el bot:', error.message);
  } finally {
    await browser.close();
  }
}

main();
