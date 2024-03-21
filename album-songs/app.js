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

// Middleware per servire le immagini statiche
app.use('/images', express.static(path.join(__dirname, 'images')));

// Rotta per visualizzare i dettagli della canzone
app.get('/song/:songId', (req, res) => {
  const songId = req.params.songId;
  const songData = getSongById(songId);
  if (!songData) {
    res.status(404).send('Canzone non trovata');
    return;
  }

  // Renderizza il template Pug e invialo come risposta
  res.render('song', { songData });
});

// Rotta per visualizzare le informazioni delle canzoni
app.get('/', (req, res) => {
  const filePath = path.join(__dirname, 'songs.json');
  const rawData = fs.readFileSync(filePath);
  const songs = JSON.parse(rawData).songs;

  // Costruiamo una stringa HTML contenente le informazioni delle canzoni e le immagini
  let html = '<h1>Album Songs</h1>';
  songs.forEach(song => {
    html += `<div>`;
    html += `<h2>${song.title}</h2>`;
    html += `<p>${song.author}</p>`;
    html += `<img src="/images/${song.thumbnail}" alt="${song.title}">`;
    html += `<a href="/song/${song.song_id}">Dettagli</a>`;
    html += `</div>`;
  });

  res.send(html);
});

// Avvia il server sulla porta 3000
const PORT = process.env.PORT || 3000;
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.listen(PORT, () => {
  console.log(`Server in ascolto sulla porta ${PORT}`);
});
