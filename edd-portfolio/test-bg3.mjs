import { chromium } from 'playwright';

async function run() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  const contentHtml = `
    <!DOCTYPE html>
    <html style="background: #0A0A0A !important; -webkit-print-color-adjust: exact;">
    <body style="background: transparent; color: white;">
      <h1 style="margin:0; padding-top: 10px;">Test Page 1</h1>
      <div style="height: 110vh;">Content</div>
      <h1>Test Page 2</h1>
    </body>
    </html>
  `;
  
  await page.setContent(contentHtml);
  
  // Test PDF generation relying on Playwright's margins
  await page.pdf({
    path: 'test-bg-3.pdf',
    format: 'A4',
    printBackground: true,
    margin: { top: '15mm', right: '15mm', bottom: '15mm', left: '15mm' }
  });

  await browser.close();
}
run();
