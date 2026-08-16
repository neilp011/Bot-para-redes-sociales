const { chromium } = require('playwright');

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    // 👉 PON AQUÍ LA URL DE TU PÁGINA DE LOGIN
    await page.goto('https://www.instagram.com/');
    console.log('Página de login cargada ✅');

    // Espera a que aparezca el campo de usuario
    await page.waitForSelector('input[type="text"], input[type="email"]');

    // Llena el campo de usuario/correo
    // 👉 PON AQUÍ EL USUARIO O CORREO DE TU CUENTA DE PRUEBA
    await page.fill('input[type="text"], input[type="email"]', 'squirrel.1506264');

    // Llena el campo de contraseña
    // 👉 PON AQUÍ LA CONTRASEÑA DE TU CUENTA DE PRUEBA
    await page.fill('input[type="password"]', 'goku2001');

    console.log('Datos escritos ✅');

    // Click en el botón de "Iniciar sesión"
    await page.click('text=Iniciar sesión');
    console.log('Botón de login presionado ✅');

    // Espera un poco para ver si cargó bien
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
