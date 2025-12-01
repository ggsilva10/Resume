const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();

  // Carrega o arquivo HTML local
  await page.goto(`file:${path.join(__dirname, 'index.html')}`, {
    waitUntil: 'networkidle0'
  });

  // Gera o PDF
  await page.pdf({
    path: 'resume.pdf',
    format: 'A4',
    printBackground: true, // Importante para cores de fundo
    margin: {
      top: '0px',
      right: '0px',
      bottom: '0px',
      left: '0px'
    }
  });

  await browser.close();
})();