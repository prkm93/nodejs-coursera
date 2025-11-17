const express = require('express')
const session = require('express-session')

const app = express()

//**************** SESSION BASED AUTHENTICATION ************** */
// app.use(session({
//     secret: '89121210sojnwsw3o3j43432',
//     resave: false,
//     saveUninitialized: false,
//     cookie: { secure: false }
// }))

// app.use(express.json())

// app.post('/login', (req, res) => {
//     const { username, password } = req.body

//     if (username === 'pradeep' && password === 'abc@123') {
//         req.session.user = {username}
//         res.send('Logged In Successfully')
//     } else {
//         res.send('Invalid credentials')
//     }
// })

// app.get('/dashboard', (req, res) => {
//     console.log("req.session", req.session)
//     if (req.session.user) {
//         res.send(`Welcome ${req.session.user.username}`);  // Display welcome message with user's name
//     } else {
//         res.send('Please log in first');
//     }
// })


//**************** TOKEN BASED AUTHENTICATION ************** */

const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const secretKey = 'n23j2b3i2kh4b2i4234'

app.post('/login', (req, res) => {
    const { username, password } = req.body

    // Simulated user authentication
    if (username == 'pradeep' && password === 'abc@123') {
        const token = jwt.sign({
            username,
            password
        }, secretKey, {
            expiresIn: '1m'
        })
        res.status(200).send({message: 'token created successfully', token })
    } else {
        res.send('Invalid credentials');
    }
})

// GET endpoint to access protected resource (dashboard)

app.get('/dashboard', (req, res) => {
    // Get token from Authorization header
    const token = req.headers['authorization'];

    if (token) {
        // Verify JWT token
        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                res.send('Invalid token')
            } else {
                // Token is valid, send welcome message with username
                res.send(`Welcome ${decoded.username}`)   
            }
        })
    } else {
        res.send('Token missing')
    }
})

app.listen(3000, () => console.log('server started on 3000'))

