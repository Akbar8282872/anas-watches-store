// backend/server.js
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// In-memory Database for fast iteration (to be replaced with MongoDB)
let orders = [
    { id: 'ORD-001', customer: 'Ali Khan', method: 'Easypaisa', amount: 8500, status: 'Pending Verification' },
    { id: 'ORD-002', customer: 'Ahmed Raza', method: 'COD', amount: 11000, status: 'Processing' }
];

// --- Routes ---

// Health Check
app.get('/api/health', (req, res) => {
    res.json({ status: 'API is running successfully', timestamp: new Date() });
});

// Admin Login
app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    if (email === 'akbarali1582005@gmail.com' && password === 'ali00ali') {
        // Dummy token for demonstration
        return res.json({ token: 'mock-jwt-token-12345', message: 'Login successful' });
    }
    return res.status(401).json({ error: 'Invalid credentials' });
});

// Fetch Orders (Admin)
app.get('/api/admin/orders', (req, res) => {
    // In a real app, you'd verify the JWT token here
    res.json(orders);
});

// Update Order Status (Admin)
app.put('/api/admin/orders/:id', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const orderIndex = orders.findIndex(o => o.id === id);
    
    if(orderIndex > -1) {
        orders[orderIndex].status = status;
        return res.json({ message: 'Order updated', order: orders[orderIndex] });
    }
    return res.status(404).json({ error: 'Order not found' });
});

// Place new order
app.post('/api/orders', (req, res) => {
    const newOrder = {
        id: `ORD-${String(orders.length + 1).padStart(3, '0')}`,
        ...req.body,
        status: req.body.method === 'COD' ? 'Processing' : 'Pending Verification'
    };
    orders.push(newOrder);
    res.status(201).json({ message: 'Order placed successfully', orderId: newOrder.id });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
