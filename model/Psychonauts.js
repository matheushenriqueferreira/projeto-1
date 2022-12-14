import { MongoClient } from "mongodb";

const url = 'mongodb://127.0.0.1/projeto';

export class Psychonauts {

  static async insert(content) {
    const conn = await MongoClient.connect(url);
    const db = conn.db(); 

    const result = {
      status: 201,
      message: 'Personagem adicionado com  sucesso'
    }

    const register = await db.collection('psychonauts').insertOne({ 
      name: content.psychoName,
      image: content.base64File
    });

    conn.close();
    return result;
    
  }

  static async findOne(psychoName) {
    const conn = await MongoClient.connect(url);
    const db = conn.db();
    const psychonautsExists = await db.collection('psychonauts').findOne({ name: psychoName })

    if(psychonautsExists) {
      conn.close();
      return psychonautsExists;
    }
    else {
      conn.close();
      return null;
    }
  }

  static async find() {
    const conn = await MongoClient.connect(url);
    const db = conn.db();
    const psychonautsExists = await db.collection('psychonauts').find().toArray();

    if(psychonautsExists) {
      conn.close();
      return psychonautsExists;
    }
    else {
      conn.close();
      return null;
    }
  }
}