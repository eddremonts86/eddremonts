import { chromium } from 'playwright';

async function run() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  const contentHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        @page { size: A4; margin: 15mm; }
        html { 
          background-color: red !important; 
          -webkit-print-color-adjust: exact;
        }
        body { 
          background: transparent; color: white;
          font-family: sans-serif;
        }
        .item { height: 300px; background: blue; margin-bottom: 20px; page-break-inside: avoid; }
      </style>
    </head>
    <body>
      <h1>Test Page 1</h1>
      <div class="item">Item 1</div>
      <div class="item">Item 2</div>
      <div class="item">Item 3</div>
    </body>
    </html>
  `;
  
  await page.setContent(contentHtml);
  
  await page.pdf({
    path: 'test-bg-4.pdf',
    format: 'A4',
    printBackground: true,
  });

  await browser.close();
}
run();
