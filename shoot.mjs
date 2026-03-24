import { execSync } from 'child_process';
const sites = [
  { url: 'https://www.zunzun.io/', out: 'zunzun-cover.png' },
  { url: 'https://demo-hbo-landing.netlify.app/versions/v1/getnotified/', out: 'hbo-notify-cover.png' },
  { url: 'https://www.voirlematch.fr/', out: 'voirlematch-cover.png' },
  { url: 'https://demo-hbo-landing.netlify.app/versions/v1/voucher/', out: 'hbo-signup-cover.png' },
  { url: 'https://www.sportal.se/', out: 'sportal-cover.png' },
  { url: 'https://www.live-fodbold.dk/', out: 'live-fodbold-cover.png' },
  { url: 'http://www.rguama.icrt.cu/', out: 'radio-guama-cover.png' },
  { url: 'https://www.livefodboldstreams.dk/', out: 'livefodboldstreams-cover.png' },
  { url: 'https://monosolutiosapps.netlify.app/', out: 'counties-cover.png' },
  { url: 'https://www.watchonlinehorseracing.co.uk/', out: 'watchonlinehorseracing-cover.png' },
  { url: 'https://www.sefodbold.dk/', out: 'sefodbold-cover.png' },
  { url: 'https://windowsterminalsetting.netlify.app/', out: 'windows-terminal-cover.png' },
  { url: 'https://www.sesport.dk/fodbold', out: 'sesport-cover.png' }
];

for (const site of sites) {
  try {
    console.log(`Shooting ${site.url}...`);
    execSync(`npx -y playwright screenshot "${site.url}" "edd-portfolio/public/projects/${site.out}" --viewport-size="1200,800"`);
  } catch (err) {
    console.error(`Failed for ${site.url}:`, err.message);
  }
}
console.log('All done.');