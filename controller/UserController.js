import { User } from "../model/User.js";
import jsonwebtoken from 'jsonwebtoken';
import { expressjwt } from "express-jwt";

export class UserController {
  static async registration(req, res) {
    const { userEmail, userPassword, userConfirmPassword } = req.body;
  
    if(!userEmail) {
      return res.status(422).json({message: "Insira um e-mail"});
    }
    
    if(!userPassword) {
      return res.status(422).json({message: "Insira uma senha"});
    }
    
    if(!userConfirmPassword) {
      return res.status(422).json({message: "Confirme sua senha"});
    }

    if(userPassword !== userConfirmPassword) {
      return res.status(422).json({message: "As senhas não são iguais. Tente novamente."});
    }

    try {
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
    }
    catch(error) {
      return res.status(500).json({message: 'Aconteceu um erro no servidor'});
    }
  }

  static async login(req, res) {
    const { userEmail, userPassword } = req.body;
    if(!userEmail) {
      return res.status(422).json({message: "Insira um e-mail"});
    }
    
    if(!userPassword) {
      return res.status(422).json({message: "Insira uma senha"});
    }
    
    try {
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
        // Criar Token 
        const token = jsonwebtoken.sign({}, "6c69fa35-5fac-42dd-a707-e5bed6642077", {
          subject: `${user._id}`,
          expiresIn: "60s" // Token expira em 60 segundos para testes
        });
        return res.status(200).json({message: 'Usuário autenticado', token});
      }
    }
    catch(error) {
      return res.status(500).json({message: 'Aconteceu um erro no servidor'});
    }
  }

  //
  // Faz a verifição do Token e trata possiveis erros na resposta da requisição
  static ensureAuthentication() {
    return [
      expressjwt( {secret: '6c69fa35-5fac-42dd-a707-e5bed6642077', algorithms: ["HS256"]}),
      (err, req, res, next) => { res.status(err.status).json({ message: err.message }); }
    ]
  }
}