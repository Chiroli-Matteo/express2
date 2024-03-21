const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

// Definisci la rotta per restituire il file JSON
app.get('/api/album-songs', (req, res) => {
  // Percorso del file JSON
  const filePath = path.join(__dirname, 'songs.json');

  // Leggi il file JSON e invialo come risposta
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Errore nella lettura del file JSON:', err);
      res.status(500).send('Errore interno del server');
      return;
    }

    // Invia il contenuto del file JSON come risposta
    res.json(JSON.parse(data));
  });
});

// Avvia il server sulla porta 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server in ascolto sulla porta ${PORT}`);
});
