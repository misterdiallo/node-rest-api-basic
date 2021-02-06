const http = require('http');
const path = require('path');
const fs = require('fs');
const port = process.env.PORT || 5000;
// create a server
const server = http
    .createServer((req, res) => {

        if (req.url === '/about') {
            req.url = 'about.html';
        }
        if (req.url === '/contact') {
            req.url = 'contact.html';
        }
        if (req.url === '/') {
            req.url = 'index.html';
        }
        if (req.url === '/product') {
            req.url = 'product.html';
        }

        // Build file path
        let filePath = path.join(
            __dirname, './views/public',
            req.url
        );
        let extension = path.extname(filePath);
        let contentType = "text/html";
        switch (extension) {
            case '.js':
                contentType = 'text/javascript';
                break;
            case '.css':
                contentType = 'text/css';
                break;
            case '.json':
                contentType = 'application/json';
                break;
            case '.png':
                contentType = 'image/png';
                break;
            case '.jpg':
                contentType = 'image/jpg';
                break;
        };
        fs.readFile(filePath, (err, content) => {
            if (err) {
                if (err.code === 'ENOENT') {
                    console.log(filePath);
                    fs.readFile(path.join(__dirname, './views/public', '404.html'), (err, content) => {
                        res.writeHead(404, { 'Content-Type': 'text/html' });
                        res.end(content, 'utf8');
                    });
                } else {
                    res.writeHead(500);
                    res.end('Erreur de server : ' + err.code);
                }
            } else {

                res.writeHead(200, { 'Content-Type': contentType });
                res.end(content, 'utf8');
            }

        });
    });
server.listen(port, () => console.log(`Ecoute sur le port ${port}...`));