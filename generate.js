const puppeteer = require('puppeteer');
const path = require('path');
const { pathToFileURL } = require('url');
const fs = require('fs');

(async () => {
    const filePath = path.join(__dirname, 'src', 'index.html');


    if (!fs.existsSync(filePath)) {
        fs.readdirSync(__dirname).forEach(file => {
            console.log(` - ${file}`);
        });
        process.exit(1); 
    }

    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();

    // Converte para URL file:// segura
    const fileUrl = pathToFileURL(filePath).href;

    await page.goto(fileUrl, {
        waitUntil: 'networkidle0'
    });

    await page.pdf({
        path: 'resume.pdf',
        format: 'A4',
        scale: 0.9,
        printBackground: true,
        margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' }
    });

    await browser.close();
    console.log('🎉 Sucesso! PDF gerado como resume.pdf');
})();