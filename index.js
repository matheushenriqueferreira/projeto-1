import express from "express";
import { User } from './model/User.js';
import { Psychonauts } from "./model/Psychonauts.js";
import { expressjwt } from "express-jwt";

const app = express();

app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//
// Cadastro de usuário
app.post('/registration', async (req, res) => {
  const { userEmail, userPassword } = req.body;
  
  if(!userEmail) {
    return res.status(422).json({message: "Insira um e-mail"});
  }
  
  if(!userPassword) {
    return res.status(422).json({message: "Insira uma senha"});
  }
  
  // Verifica se já existe e-mail cadastrado
  const userExists = await User.findOne(userEmail);
  
  if(userExists) {
    return res.status(422).json({message: 'Já existe um usuário cadastrado com este e-mail!'});
  }
  else {
    const resInsert = await User.insert({
      userEmail,
      userPassword
    });
    return res.status(resInsert.status).json({message: resInsert.message});
  }
})

//
// Login de usuário
app.post('/login',  async (req, res) => {
  const { userEmail, userPassword } = req.body;

  if(!userEmail) {
    return res.status(422).json({message: "Insira um e-mail"});
  }
  
  if(!userPassword) {
    return res.status(422).json({message: "Insira uma senha"});
  }

  // Verifica se já existe e-mail cadastrado
  const user = await User.findOne(userEmail);
  
  if(!user) {
    return res.status(404).json({message: 'Não foi encontrado cadastro vinculado a este e-mail'});
  }
  
  //Verificar senha
  if(userPassword !== user.password) {
    return res.status(422).json({message: 'Senha inválida'});
  }
  else {
    res.status(200).json({message: 'Usuário autenticado'});
  }
})

//
// Inserção de personagens
app.post('/auth/insert/characters', async (req, res) => {
  const {psychoName , psychoImage} = req.body;

  if(!psychoName) {
    return res.status(422).json({message: "Insira o nome do personagem"});
  }
  
  if(!psychoImage) {
    return res.status(422).json({message: "Insira a imagem do personagem"});
  }

   // Verifica se já existe e-mail cadastrado
   const characterExists = await Psychonauts.findOne(psychoName);
  
   if(characterExists) {
     return res.status(422).json({message: 'Já existe um personagem cadastrado com este nome!'});
   }
   else {
     const resInsert = await Psychonauts.insert({
       psychoName,
       psychoImage
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