const http = require('node:http');
const fs = require('node:fs');

const routes = ['/', '/about', '/contact-me'];

http.createServer((req, res) => {
  const route = req.url;

  if (routes.includes(route)) {
    let file = null;
    if (route === '/') {
      file = 'index.html';
    } else {
      file = `${route.slice(1)}.html`;
    }

    fs.readFile(file, 'utf-8', (err, data) => {
      if (err) return notFound(res);

      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      return res.end();
    });
  } else return notFound(res);
}).listen(8080);

function notFound(response) {
  fs.readFile('404.html', 'utf-8', (err, data) => {
    if (err) {
      response.writeHead(500, {'Content-Type': 'text/html'});
      response.write('500 - Internal Server Error');
      return response.end();
    }

    response.writeHead(404, {'Content-Type': 'text/html'});
    response.write(data);
    response.end();

    return response; // returning the response for chain calls
  });
}
