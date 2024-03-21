const express = require('express');
const fs = require('fs');
const path = require('path');
const pug = require('pug');

const app = express();

// Funzione per ottenere i dati di una canzone in base all'ID
function getSongById(songId) {
  const filePath = path.join(__dirname, 'songs.json');
  const rawData = fs.readFileSync(filePath);
  const songs = JSON.parse(rawData).songs;
  return songs.find(song => song.song_id == songId);
}

// Rotta per visualizzare i dettagli della canzone
app.get('/song/:songId', (req, res) => {
  const songId = req.params.songId;
  const songData = getSongById(songId);
  if (!songData) {
    res.status(404).send('Canzone non trovata');
    return;
  }

  // Renderizza il template Pug e invialo come risposta
  const filePath = path.join(__dirname, 'views', 'song.pug');
  const compiledFunction = pug.compileFile(filePath);
  const html = compiledFunction({ songData });
  res.send(html);
});

// Avvia il server sulla porta 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server in ascolto sulla porta ${PORT}`);
});
