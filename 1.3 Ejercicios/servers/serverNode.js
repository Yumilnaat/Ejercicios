import http from 'http';
import url from "url";

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {

const parsedUrl = url.parse(req.url, true);

if(parsedUrl.pathname === '/' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
    res.end('<hl>bienvenido a mi página web</hl>');
    } else if(parsedUrl.pathname === '/about' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<hl>Acerca de</hl>');
    }
    else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('<hl>404 Not Found</hl>');
    }
});

server.listen(port, hostname, () => {
    console.log(`Servidor corriendo en http://${hostname}:${port}/`);
});