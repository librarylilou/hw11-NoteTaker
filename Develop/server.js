const http = require('http');
const PORT = process.env.PORT || 8080;

const express = require('express');
const app = express(); 
app.use(express.static('client'));

const displayIndex = (res) => {
    const indexHTML = `
<html>
 <head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Note Taker</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootswatch/4.1.3/flatly/bootstrap.min.css" />
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css"
    integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossorigin="anonymous">
  <link rel="stylesheet" href="/assets/css/styles.css">
 </head>
    <body>
    <nav class='navbar navbar-dark bg-dark'>
      <a class='navbar-brand' href='/'>Note Taker
      </a>
    </nav>
    <div class='container'>
      <div style='margin-top: 80px;' class='jumbotron text-center'>
        <h1 class='display-4'>Note Taker <span role='img' aria-label='Memo'>📝</span></h1>
        <h4 class="mt-4">Take notes with Express</h4>
        <a class='btn btn-primary btn-lg mt-4' href='/notes' role='button'>Get Started</a>
      </div>
    </div>
  </body>
  
 </html>`;

    res.writeHead(200, { 'Content-Type': 'text/html' });

    res.end(indexHTML);
};

//display error message
const display404 = (url, res) => {
    const errorHTML = `
    <html>
      <body>
        <h1>404 Not Found </h1>
        <p>The page you were looking for: ${url} can not be found</p>
      </body>
    </html>`;
    
    res.writeHead(404, { 'Content-Type': 'text/html' });

  res.end(errorHTML);
};

// handle request(s)
const handleRequest = (req, res) => {

    const path = req.url;

    switch (path) {
        case '/':
            return displayIndex(res);
            break;
            
        default:
            return display404(path, res);
            break;
    }
};

// create server
const server = http.createServer(handleRequest);
server.listen(PORT, () => {

    console.log(`Server listening on: http://localhost:${PORT}`);
});

