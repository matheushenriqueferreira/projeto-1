import { User } from "../model/User.js";

export class UserController {
  static async registration(req, res) {
    const { userEmail, userPassword } = req.body;
  
    if(!userEmail) {
      return res.status(422).json({message: "Insira um e-mail"});
    }
    
    if(!userPassword) {
      return res.status(422).json({message: "Insira uma senha"});
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
        res.status(200).json({message: 'Usuário autenticado'});
      }
    }
    catch(error) {
      return res.status(500).json({message: 'Aconteceu um erro no servidor'});
    }
  }
}