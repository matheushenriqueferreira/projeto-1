import { MongoClient } from "mongodb";

export class Psychonauts {

  static async insert(content) {
    const conn = await MongoClient.connect('mongodb://127.0.0.1/projeto');
    const db = conn.db();

    const result = {
      status: 201,
      message: 'Personagem adicionado com  sucesso'
    }

    const register = await db.collection('psychonauts').insertOne({ 
      name: content.psychoName,
      image: content.psychoImage
    });

    conn.close();
    return result;
    
  }

  static async findOne(psychoName) {
    const conn = await MongoClient.connect('mongodb://127.0.0.1/projeto');
    const db = conn.db();
    const userExists = await db.collection('psychonauts').findOne({ name: psychoName })

    if(userExists) {
      conn.close();
      return userExists;
    }
    else {
      conn.close();
      return null;
    }
  }
}