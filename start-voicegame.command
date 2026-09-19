#!/bin/zsh
cd "$(dirname "$0")"

echo "▶ Avvio di VoiceGame..."

if [ ! -d "node_modules" ]; then
  echo "▶ Installazione dipendenze..."
  npm install
fi

open "http://localhost:5173"

echo "▶ Avvio del server Vite..."
npm run dev -- --host 0.0.0.0
