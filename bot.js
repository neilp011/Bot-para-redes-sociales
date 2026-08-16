const { chromium } = require('playwright');

async function main() {
  const browser = await chromium.launch({
    args: ['--disable-blink-features=AutomationControlled']
  });

  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    viewport: { width: 1280, height: 800 }
  });

  const page = await context.newPage();

  try {
    await page.goto('https://www.instagram.com/accounts/login/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(10000);

    await page.screenshot({ path: 'vista.png', fullPage: true });
    console.log('Captura tomada ✅');

  } catch (error) {
    console.error('Error en el bot:', error.message);
  } finally {
    await browser.close();
  }
}

main();
