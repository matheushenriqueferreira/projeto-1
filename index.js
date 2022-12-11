import express from "express";

const app = express();

app.use(express.static('./public'));
app.use(express.urlencoded({extended: false}));

app.use((req, res) => {
  res.status(404).json({ 
    message: 'Conteúdo não encontrado',
    path: req.path
  });
})

app.listen(3000);