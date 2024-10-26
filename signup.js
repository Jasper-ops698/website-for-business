import { MongoClient } from 'mongodb';
import bcrypt from 'bcrypt';

const uri = process.env.MONGODB_URI; //MongoDB connection string
const client = new MongoClient(uri);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      await client.connect();
      const database = client.db('Jasper'); 
      const users = database.collection('users');
      
      const existingUser = await users.findOne({ username });
      if (existingUser) {
        return res.status(409).json({ message: 'User already exists' });
      }

      const newUser = { username, password: hashedPassword };
      await users.insertOne(newUser);
      
      return res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Error creating user' });
    } finally {
      await client.close();
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end('Method ${req.method} Not Allowed');
  }
}