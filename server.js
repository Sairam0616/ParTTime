const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const User = require('./models/User');

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb://localhost:27017/my-business-app')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('Database connection error:', err);
    });

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

app.get('/reset-password', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'reset-password.html'));
});

app.post('/register', async (req, res) => {
    const { name, age, phone, email, locality, citizenship, aadhar, password } = req.body;
    const user = new User({
        name,
        age,
        phone,
        email,
        locality,
        citizenship,
        aadhar,
        password: await bcrypt.hash(password, 10)
    });
    try {
        await user.save();
        res.status(201).send({ message: 'User registered successfully' });
    } catch (err) {
        console.error('Error registering user:', err);
        res.status(400).send({ error: 'Error registering user' });
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !await bcrypt.compare(password, user.password)) {
        return res.status(401).send({ error: 'Invalid email or password' });
    }
    const token = jwt.sign({ userId: user._id }, 'your_jwt_secret');
    res.send({ token });
});

app.post('/reset-password', async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).send({ error: 'User not found' });
    }
    res.send({ message: `Reset link sent to ${email}` });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
