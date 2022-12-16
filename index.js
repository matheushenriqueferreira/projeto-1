import express from "express";
import { UserController } from "./controller/UserController.js";
import { PsychonautsController } from "./controller/PsychonautsController.js";

const app = express();

app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//
// Cadastro de usuário
app.post('/registration', (req, res) => UserController.registration(req, res));

//
// Login de usuário com criação de Token
app.post('/login', (req, res) =>  UserController.login(req, res));

//
// Inserção de personagens
app.post('/auth/insert/characters', (req, res) => PsychonautsController.insert(req, res));

//
// Recuperar dados dos personagens
app.get('/characters', (req, res) => PsychonautsController.getAllPsychonauts(req, res));

//
// Recuperar dados dos personagens por nome
app.get('/characters/:name', (req, res) => PsychonautsController.getPsychonautsByName(req, res));

app.use((req, res) => {
  res.status(404).json({ 
    message: 'Conteúdo não encontrado',
    path: req.path
  });
});

app.listen(3000);