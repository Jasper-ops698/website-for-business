import { MongoClient } from 'mongodb';
import bcrypt from 'bcrypt';

const uri = process.env.MONGODB_URI; // Your MongoDB connection string
const client = new MongoClient(uri);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    try {
      await client.connect();
      const database = client.db('Emmanuel Nyale'); // DB name
      const users = database.collection('users');
      
      const user = await users.findOne({ username });
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // create a session or return a JWT
      return res.status(200).json({ message: 'Login successful' });
    } catch (error) {
      return res.status(500).json({ message: 'Error logging in' });
    } finally {
      await client.close();
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end('Method ${req.method} Not Allowed');
  }
}