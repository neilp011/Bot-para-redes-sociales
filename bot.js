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
    await page.goto('url De mi Web', { waitUntil: 'networkidle' });
    await page.waitForTimeout(10000);

    await page.fill('input[name="email"]', 'squirrel.1506264');
    await page.fill('input[name="pass"]', 'goku2001');
    console.log('Datos escritos ✅');

    await page.locator('input[type="submit"]').dispatchEvent('click');
    console.log('Botón de login presionado ✅');

    await page.waitForTimeout(8000);

    await page.fill('input[placeholder="Code"]', '370720');
    console.log('Código escrito ✅');

    await page.click('text=Continue');
    console.log('Verificación enviada ✅');

    await page.waitForTimeout(8000);

    const campos = await page.$$eval('input, textarea', els =>
      els.map(el => ({
        tag: el.tagName,
        type: el.type,
        placeholder: el.placeholder,
        name: el.name
      }))
    );

    console.log('CAMPOS DESPUÉS DE VERIFICAR:');
    console.log(JSON.stringify(campos, null, 2));

  } catch (error) {
    console.error('Error en el bot:', error.message);
  } finally {
    await browser.close();
  }
}

main();
