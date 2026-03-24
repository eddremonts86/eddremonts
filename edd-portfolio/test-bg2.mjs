import { chromium } from 'playwright';

async function run() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  const contentHtml = `
    <!DOCTYPE html>
    <html style="background-color: #0A0A0A !important; -webkit-print-color-adjust: exact;">
    <head>
      <style>
        @page { size: A4; margin: 15mm; }
        body { 
          background-color: transparent !important; 
          color: white;
          font-family: sans-serif;
        }
        .item { height: 300px; background: red; margin-bottom: 20px; break-inside: avoid; }
      </style>
    </head>
    <body style="color: white; font-family: sans-serif;">
      <h1>Test Page 1</h1>
      <div class="item">Item 1</div>
      <div class="item">Item 2</div>
      <div class="item">Item 3</div>
      <div class="item">Item 4</div>
    </body>
    </html>
  `;
  
  await page.setContent(contentHtml);
  
  await page.pdf({
    path: 'test-bg-2.pdf',
    format: 'A4',
    printBackground: true,
  });

  await browser.close();
}
run();