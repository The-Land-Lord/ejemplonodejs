// Copyright 2020 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// [START cloudrun_helloworld_service]
// [START run_helloworld_service]
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.write('<form method="POST">');
    res.write('<label for="num1">Número 1:</label>');
    res.write('<input type="number" id="num1" name="num1" required>');
    res.write('<br>');
    res.write('<label for="num2">Número 2:</label>');
    res.write('<input type="number" id="num2" name="num2" required>');
    res.write('<br>');
    res.write('<button type="submit">Enviar</button>');
    res.write('</form>');
    return res.end();
  } else if (req.method === 'POST' && req.url === '/') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const num1 = new URLSearchParams(body).get('num1');
      const num2 = new URLSearchParams(body).get('num2');
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      res.write(`<p style="color: red;">Los números ingresados son: ${num1} y ${num2}</p>`);
      return res.end();
    });
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Página no encontrada');
  }
});

app.post('/', (req, res) => {
  if (req.method === 'POST' && req.url === '/') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const num1 = new URLSearchParams(body).get('num1');
      const num2 = new URLSearchParams(body).get('num2');
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      res.write(`<p style="color: red;">Los números ingresados son: ${num1} y ${num2}</p>`);
      return res.end();
    });
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Página no encontrada');
  }
});


const port = parseInt(process.env.PORT) || 8080;
app.listen(port, () => {
  console.log(`Hello, hello, hello, esta es mi prueba en el puerto  ${port}`);
});
// [END run_helloworld_service]
// [END cloudrun_helloworld_service]

// Exports for testing purposes.
module.exports = app;
