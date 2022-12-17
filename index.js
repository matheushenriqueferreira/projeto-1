import express from "express";
import { UserController } from "./controller/UserController.js";
import { PsychonautsController } from "./controller/PsychonautsController.js";
import multer from "multer";
import fs from 'fs'
const app = express();

app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/uploads', express.static('uploads'));

const dir = "./uploads";

//
// Usado para criar o diretório /uploads no projeto, caso não exista
if (!fs.existsSync(dir)){
  fs.mkdirSync(dir);
}

//
// Cadastro de usuário
app.post('/registration', (req, res) => UserController.registration(req, res));

//
// Login de usuário e criação de Token no UserController.login
app.post('/login', (req, res) =>  UserController.login(req, res));

//
// Configuração do multer, referência https://expressjs.com/en/resources/middleware/multer.html
const storageConfig = multer.diskStorage( { 
    destination: (req, file, cb) => {
    cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
});

//
// Inserção de personagens com Middleware de verificação de autenticação
app.post('/auth/insert/characters', 
  multer({ storage: storageConfig }).single('file'), 
  UserController.ensureAuthentication(),  
  (req, res) => PsychonautsController.insert(req, res)
);

//(req, res, next) => UserController.ensureAuthentication(req, res, next)
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