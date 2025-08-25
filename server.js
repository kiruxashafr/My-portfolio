const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3010;

// Middleware for logging and decoding URLs
app.use((req, res, next) => {
    const decodedUrl = decodeURI(req.url);
    console.log(`Raw URL: ${req.url}`);
    console.log(`Decoded URL: ${decodedUrl}`);
    req.url = decodedUrl;
    next();
});

// Redirect requests like /css/../fonts/ to /fonts/
app.use((req, res, next) => {
    if (req.url.startsWith('/css/../fonts/')) {
        req.url = req.url.replace('/css/../fonts/', '/fonts/');
        console.log(`Redirected URL: ${req.url}`);
    }
    next();
});

// Static files from 'главная/css', 'главная/js', 'главная/photo', 'главная/fonts'
app.use('/css', express.static(path.join(__dirname, 'главная', 'css'), {
    setHeaders: (res, filePath) => {
        console.log(`Serving static file: ${filePath}`);
    }
}));
app.use('/js', express.static(path.join(__dirname, 'главная', 'js'), {
    setHeaders: (res, filePath) => {
        console.log(`Serving static file: ${filePath}`);
    }
}));
app.use('/photo', express.static(path.join(__dirname, 'главная', 'photo'), {
    setHeaders: (res, filePath) => {
        console.log(`Serving static file: ${filePath}`);
    }
}));
app.use('/fonts', express.static(path.join(__dirname, 'главная', 'fonts'), {
    setHeaders: (res, filePath) => {
        console.log(`Serving static file: ${filePath}`);
    }
}));

// Static files from 'доставка еды/css', 'доставка еды/js', 'доставка еды/photo', 'доставка еды/fonts'
app.use('/css', express.static(path.join(__dirname, 'доставка еды', 'css'), {
    setHeaders: (res, filePath) => {
        console.log(`Serving static file: ${filePath}`);
    }
}));
app.use('/js', express.static(path.join(__dirname, 'доставка еды', 'js'), {
    setHeaders: (res, filePath) => {
        console.log(`Serving static file: ${filePath}`);
    }
}));
app.use('/photo', express.static(path.join(__dirname, 'доставка еды', 'photo'), {
    setHeaders: (res, filePath) => {
        console.log(`Serving static file: ${filePath}`);
    }
}));
app.use('/fonts', express.static(path.join(__dirname, 'доставка еды', 'fonts'), {
    setHeaders: (res, filePath) => {
        console.log(`Serving static file: ${filePath}`);
    }
}));

// Root route for главная.html
app.get('/', (req, res) => {
    const filePath = path.join(__dirname, 'главная', 'главная.html');
    console.log(`Attempting to serve root: ${filePath}`);
    console.log(`File exists: ${fs.existsSync(filePath)}`);
    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        res.status(404).send(`404: главная.html not found at ${filePath}`);
    }
});

// Route for /delivery to serve сайтдоставки.html
app.get('/delivery', (req, res) => {
    const filePath = path.join(__dirname, 'доставка еды', 'сайтдоставки.html');
    console.log(`Attempting to serve delivery: ${filePath}`);
    console.log(`File exists: ${fs.existsSync(filePath)}`);
    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        res.status(404).send(`404: сайтдоставки.html not found at ${filePath}`);
    }
});

// Handle 404 for all other routes
app.use((req, res) => {
    console.log(`404: Requested path ${req.url} not found`);
    res.status(404).send(`404: Page not found for ${req.url}`);
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});