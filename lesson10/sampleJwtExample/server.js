const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv')
dotenv.config({path: '.env'})

const app = express();
const PORT = 3000;

app.use(bodyParser.json())

const users = []

const JWT_SECRET = process.env.JWT_SECRET_KEY;

app.post('/register', async (req, res) => {
    const {username, password} = req.body;
    if (!username || !password) {
        return res.status(400).send({
            success: false,
            message: 'Username and password are required'
        });
    }

    const hashedPassword = await bcrypt.hash(password, 8) 

    // $2a$08$S9gdbp9PZtfe8WumJZTaNurjuL6Q.kxWvoDjpb69pyqp0CWohRvbu
    users.push({
        username, password: hashedPassword
    })

    res.status(201).send({
        success: true,
        message: "New user has been registered"
    });
})

app.post('/login', async (req, res) => {
    const {username, password} = req.body;

    if (!username || !password) {
        return res.status(400).send({
            success: false,
            message: "Username and Password are required"
        })
    }

    const user = users.find(user => user.username === username)

    if (!user) {
        return res.status(404).send({
            success: false,
            message: "Error: user not found"
        });
    };

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(401).send('Invalid password');
    };

    const token = jwt.sign({username: user.username}, JWT_SECRET, {expiresIn: '1h'});

    res.json({ token })

})

app.get('/protected', (req, res) => {
    let token  = req.headers['authorization'];
    token = token.slice(7)

    if (!token) {
        return res.status(401).send(
            {
                success: false,
                message: "Access denied. No token provided"
            }
        )
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        res.json({
            message: 'Decoded protected data', user: decoded
        });
    } catch (err) {
        res.status(401).send({
            success: false,
            message: "Error: Invalid token has been provided"
        })
    }
})



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})



