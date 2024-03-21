var express = require('express');
var app = express(); 
const songs = require('./songs.json');
app.set('view engine', 'pug');
app.use(express.static(__dirname));

app.get('/', function (req, res) {
    res.render('index', {
        songs: songs.songs
    });

});

app.get('/api/album-songs', function (req, res){ 
  res.setHeader('Content-Type', 'application/json'); 
  res.end(JSON.stringify(songs)); 
}); 

app.get('/song', (req, res) => {
  const song = songs.songs.find((p) => p.song_id === req.query.id);
  res.render('song', {
    song
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});