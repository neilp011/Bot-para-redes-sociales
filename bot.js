const { chromium } = require('playwright');
async function main() { const browser = await chromium.launch(); const page = await browser.newPage();
try { await page.goto('https://www.instagram.com/accounts/login/⁠�', { waitUntil: 'networkidle' }); await page.waitForTimeout(5000);
await page.fill('input[name="email"]', 'squirrel.1506264');
await page.fill('input[name="pass"]', 'Goku2001');
console.log('Datos escritos ✅');

await page.locator('input[type="submit"]').dispatchEvent('click');
console.log('Botón de login presionado ✅');

await page.waitForTimeout(5000);

const campos = await page.$$eval('input, textarea', els =>
  els.map(el => ({
    tag: el.tagName,
    type: el.type,
    placeholder: el.placeholder,
    name: el.name,
    id: el.id
  }))
);

console.log('CAMPOS DESPUÉS DEL LOGIN:');
console.log(JSON.stringify(campos, null, 2));
} catch (error) { console.error('Error en el bot:', error.message); } finally { await browser.close(); } }
main();
