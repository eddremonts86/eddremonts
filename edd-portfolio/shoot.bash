#!/bin/bash
cd edd-portfolio

declare -A urls
urls=(
  ["zunzun-cover.png"]="https://www.zunzun.io/"
  ["hbo-notify-cover.png"]="https://demo-hbo-landing.netlify.app/versions/v1/getnotified/"
  ["hbo-signup-cover.png"]="https://demo-hbo-landing.netlify.app/versions/v1/voucher/"
  ["sportal-cover.png"]="https://www.sportal.se/"
  ["live-fodbold-cover.png"]="https://www.live-fodbold.dk/"
  ["radio-guama-cover.png"]="http://www.rguama.icrt.cu/"
  ["livefodboldstreams-cover.png"]="https://www.livefodboldstreams.dk/"
  ["counties-cover.png"]="https://monosolutiosapps.netlify.app/"
  ["watchonlinehorseracing-cover.png"]="https://www.watchonlinehorseracing.co.uk/"
  ["sefodbold-cover.png"]="https://www.sefodbold.dk/"
  ["windows-terminal-cover.png"]="https://windowsterminalsetting.netlify.app/"
  ["sesport-cover.png"]="https://www.sesport.dk/fodbold"
)

for file in "${!urls[@]}"; do
  url="${urls[$file]}"
  echo "Shooting $url -> $file..."
  npx -y playwright screenshot "$url" "public/projects/$file" --viewport-size="1200,800" || echo "Failed for $url"
done
