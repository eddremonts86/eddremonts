const fs = require('fs');
const pngs = new Set([
  'counties-cover.png', 'hbo-notify-cover.png', 'hbo-signup-cover.png',
  'live-fodbold-cover.png', 'radio-guama-cover.png', 'sefodbold-cover.png',
  'sesport-cover.png', 'sportal-cover.png', 'windows-terminal-cover.png'
]);

const cvPath = 'src/data/cvData.ts';
let code = fs.readFileSync(cvPath, 'utf8');

code = code.replace(/\/projects\/([a-zA-Z0-9-]+-cover)\.svg/g, (match, base) => {
  const pngName = base + '.png';
  if (pngs.has(pngName)) {
    return '/projects/' + pngName;
  }
  return match;
});

fs.writeFileSync(cvPath, code);
console.log('Updated extensions.');
