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
    // ===== PARTE 1: tu red social =====
    await page.goto('https://www.instagram.com/accounts/login/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(10000);

    await page.fill('input[name="email"]', 'squirrel.1506264');
    await page.fill('input[name="pass"]', 'goku2001');
    console.log('Datos escritos ✅');

    await page.locator('input[type="submit"]').dispatchEvent('click');
    console.log('Botón de login presionado ✅');

    await page.waitForTimeout(8000);

    const casillaCodigo = page.locator('input[placeholder="Code"]');
    const apareceCodigo = await casillaCodigo.isVisible({ timeout: 8000 }).catch(() => false);

    if (apareceCodigo) {
      await casillaCodigo.fill('370720');
      console.log('Código escrito ✅');

      await page.click('text=Continue');
      console.log('Verificación enviada ✅');

      await page.waitForTimeout(8000);
    } else {
      console.log('No pidió código de verificación esta vez, seguimos ✅');
    }

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

    // ===== PARTE 2: tu versión de Gmail =====
    const gmailPage = await context.newPage();

    await gmailPage.goto('https://accounts.google.com', { waitUntil: 'networkidle' });
    await gmailPage.waitForTimeout(5000);

    await gmailPage.fill('input[name="email"]', 'gringoparker6@gmail.com');
    await gmailPage.fill('input[name="password"]', 'goku2001');
    console.log('Datos de Gmail escritos ✅');

    await gmailPage.click('button[type="submit"]');
    console.log('Login de Gmail enviado ✅');

    await gmailPage.waitForTimeout(6000);

    await gmailPage.waitForSelector('.mensaje', { timeout: 10000 });
    const ultimoMensaje = await gmailPage.$eval('.mensaje', el => el.innerText);

    console.log('ÚLTIMO MENSAJE RECIBIDO:');
    console.log(ultimoMensaje);

  } catch (error) {
    console.error('Error en el bot:', error.message);
  } finally {
    await browser.close();
  }
}

main();
