let http = require('http');
let path = require('path');
let express = require('express');
let app = express();

app.set('views', path.join(__dirname, 'view'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/view/index.html'));
});


app.listen(3000);