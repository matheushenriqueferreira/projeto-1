let http = require('http');
let path = require('path');
let express = require('express');
let app = express();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'view'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(3000);