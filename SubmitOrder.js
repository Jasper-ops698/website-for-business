// api/submitOrder.js
import clientPromise from '../lib/mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Connect to MongoDB
      const client = await clientPromise;
      const db = client.db('COKO');

      // Get order details from request body
      const { name, email, address, quantity } = req.body;

      // Insert the order into the "orders" collection
      const result = await db.collection('orders').insertOne({
        name,
        email,
        address,
        quantity,
        createdAt: new Date()
      });

      // Respond with success message
      res.status(201).json({ message: 'Order saved successfully!', orderId: result.insertedId });
    } catch (error) {
      console.error('Error saving order:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}