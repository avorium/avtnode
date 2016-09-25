var express = require('express');
var fs = require('fs');
var https = require('https');
var db = require('./middlewares/db');

// Datenbank initialisieren und ggf. Admin anlegen (admin/admin)
db.init();

// Anwendung initialisieren und Handler-Reihenfolge festlegen
var app = express();
app.use(require('compression')()); // Ausgabekompression
app.set('json spaces', '\t'); // Ausgabe im Response verschönern
app.use(db); // Datenbankverbindung -> req.db
app.use(require('./middlewares/extractauth')); // Authentifizierung und Authorisierung -> req.user{name,pass}
app.use(require('body-parser').json()); // JSON Request-Body-Parser -> req.body
app.use('/api/users', require('./api/users')); // API für Benutzerverwaltung
app.use(express.static(__dirname + '/public')); // Statische Ressourcen im public-Verzeichnis, lädt bei root-Aufruf automatisch index.html
app.use('/node_modules', express.static(__dirname + '/node_modules')); // Statische Ressourcen im public-Verzeichnis, lädt bei root-Aufruf automatisch index.html

// SSL für HTTPS-Server vorbereiten, siehe https://franciskim.co/2015/07/30/how-to-use-ssl-https-for-express-4-x-node-js/
var credentials = { 
    key: fs.readFileSync('./priv.key', 'utf8'), 
    cert: fs.readFileSync('./pub.cert', 'utf8')
};

// Anwendung starten
https.createServer(credentials, app).listen(443, function() {
    console.log('HTTPS laeuft.');
});
// Auch für normales HTTP
app.listen(80, function() {
    console.log('HTTP laeuft.');
});