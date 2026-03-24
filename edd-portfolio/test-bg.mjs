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
          background-color: #0A0A0A !important; 
          -webkit-print-color-adjust: exact;
          color: white;
        }
        body { 
          background-color: #0A0A0A !important; 
          -webkit-print-color-adjust: exact;
        }
      </style>
    </head>
    <body>
      <h1>Test Page 1</h1>
      <div style="height: 100vh;"></div>
      <h1>Test Page 2</h1>
    </body>
    </html>
  `;
  
  await page.setContent(contentHtml);
  
  await page.pdf({
    path: 'test-bg-1.pdf',
    format: 'A4',
    printBackground: true,
    margin: { top: '0', right: '0', bottom: '0', left: '0' },
  });

  await browser.close();
}
run();
