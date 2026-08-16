const { chromium } = require('playwright');

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    await page.goto('https://www.instagram.com/accounts/login/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(5000);

    const inputs = await page.$$eval('input', els =>
      els.map(el => ({
        type: el.type,
        placeholder: el.placeholder,
        name: el.name,
        id: el.id
      }))
    );

    console.log('CAMPOS ENCONTRADOS:');
    console.log(JSON.stringify(inputs, null, 2));

  } catch (error) {
    console.error('Error en el bot:', error.message);
  } finally {
    await browser.close();
  }
}

main();
