export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { customerName, phonenumber, product, quantity, address } = req.body;

        // Here you can add logic to process the order (e.g., save to database)
        module.exports = placeOrder;

        console.log('Order received:', { customerName, phonenumber, product, quantity, address });

        // Respond back with a success message
        return res.status(200).json({ message: 'Order placed successfully! Thank you.' });
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end('Method ${req.method} Not Allowed');
    }
}
