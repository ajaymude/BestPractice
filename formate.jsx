const express = require('express');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');

const app = express();
app.use(cookieParser());

// Set up CSRF protection
const csrfProtection = csrf({ cookie: true });
app.use(csrfProtection);

app.get('/form', (req, res) => {
    res.send(`<form action="/process" method="POST">
                <input type="hidden" name="_csrf" value="${req.csrfToken()}">
                <button type="submit">Submit</button>
              </form>`);
});

app.post('/process', (req, res) => {
    res.send('Form submitted successfully');
    
});

app.listen(3000, () => console.log('Server is running on port 3000'));



new for the fetch 
