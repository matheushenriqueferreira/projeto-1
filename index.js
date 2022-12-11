import express from "express";
import { User } from './model/User.js';
const app = express();

app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.post('/registration', async (req, res) => {
  const { userEmail, userPassword } = req.body;

  if(!userEmail) {
    return res.status(422).json({message: "Insira um e-mail"});
  }

  if(!userPassword) {
    return res.status(422).json({message: "Insira uma senha"});
  }

  const userExists = await User.findOne(userEmail);
  
  // Verifica se já existe e-mail cadastrado
  if(userExists) {
    return res.status(userExists.status).json({message: userExists.message});
  }
  else {
    const resInsert = await User.insert({
      userEmail,
      userPassword
    });
    return res.status(resInsert.status).json({message: resInsert.message});
  }
})

app.use((req, res) => {
  res.status(404).json({ 
    message: 'Conteúdo não encontrado',
    path: req.path
  });
})

app.listen(3000);