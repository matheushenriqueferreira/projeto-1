import { Psychonauts } from '../model/Psychonauts.js'

export class PsychonautsController {
  static async insert(req, res) {
    const {psychoName , psychoImage} = req.body;

    if(!psychoName) {
      return res.status(422).json({message: "Insira o nome do personagem"});
    }
    
    if(!psychoImage) {
      return res.status(422).json({message: "Insira a imagem do personagem"});
    }

    try { 
      // Verifica se já existe um nome cadastrado
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
    }
    catch(error) {
      return res.status(500).json({message: 'Aconteceu uma erro no servidor'});
    }
  }

  static async getAllPsychonauts(req, res) {
    try {
      const charactersExists = await Psychonauts.find();
      
      if(charactersExists) {
        return res.status(201).json({charactersExists});
      }
      else {
        return res.status(404).json({message: 'Banco de dados vazio ou inexistente'});
      }
    }
    catch(error) {
      return res.status(500).json({message: 'Aconteceu um erro no servidor'});
    }
  }

  static async getPsychonautsByName(req, res) {
    const name = req.params.name;
    try {
      const character = await Psychonauts.findOne(name);
    
      if(character) {
        return res.status(201).json({character});
      }
      else {
        return res.status(404).json({message: 'Personagem não encontrado'});
      }
    }
    catch(error) {
      return res.status(500).json({message: 'Aconteceu um erro no servidor'});
    }
  }
}