import { MongoClient } from "mongodb";

export class User {

  static async insert(content) {
    const conn = await MongoClient.connect('mongodb://127.0.0.1/projeto');
    const db = conn.db();

    const result = {
      status: 201,
      message: 'Conta criada com sucesso'
    }

    const register = await db.collection('user').insertOne({ 
      email: content.userEmail,
      password: content.userPassword
    });

    conn.close();
    return result;
    
  }

  static async findOne(userEmail) {
    const conn = await MongoClient.connect('mongodb://127.0.0.1/projeto');
    const db = conn.db();
    const userExists = await db.collection('user').findOne({ email: userEmail })

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