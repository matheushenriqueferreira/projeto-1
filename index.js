import express from "express";
import { userInsert } from "./model/User.js";

const app = express();

app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.post('/registration', async (req, res) => {
  const { userEmail, userPassword } = req.body;

  userInsert({
    userEmail,
    userPassword
  });

  res.end();
})

app.use((req, res) => {
  res.status(404).json({ 
    message: 'Conteúdo não encontrado',
    path: req.path
  });
})

app.listen(3000);