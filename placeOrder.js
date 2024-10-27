const { MongoClient } = require('mongodb');
const nodemailer = require('nodemailer');

// MongoDB connection URI
const uri = 'your-mongodb-uri';
const client = new MongoClient(uri);

// Function to place an order
async function placeOrder(orderDetails) {
  try {
    // Connect to MongoDB
    await client.connect();
    const db = client.db('yourDatabaseName');
    const orders = db.collection('orders');

    // Insert the new order into MongoDB
    const result = await orders.insertOne(orderDetails);

    console.log('Order placed with ID:', result.insertedId);

    // After placing the order, send an email notification
    await sendEmailNotification(orderDetails);
  } catch (error) {
    console.error('Error placing order:', error);
  } finally {
    await client.close();
  }
}

// Function to send email notification
async function sendEmailNotification(order) {
  // Set up email transporter
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'bkitib@gmail.com', // Your email
      pass: '.env'    // Your email password (use environment variables for security)
    }
  });

}
