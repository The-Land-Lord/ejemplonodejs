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
const fetch = require('node-fetch');
const app = express();
const apiUrl = 'https://solar.googleapis.com/v1/buildingInsights:findClosest?';
const APISolar = 'AIzaSyBjTgPR83CvhCr7qbxNtWAfSbpmtI9oolI';

// Configuración Firestore
const Firestore = require('@google-cloud/firestore');
const db = new Firestore({
  projectId: 'PruebaSolar2',
  keyFilename: '/pruebasolar2-028fe05d30da.json',
});

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.write('<form method="POST">');
  res.write('<label for="num1">Número 1:</label>');
  res.write('<input type="number" id="num1" name="num1" step="any" required>');
  res.write('<br>');
  res.write('<label for="num2">Número 2:</label>');
  res.write('<input type="number" id="num2" name="num2" step="any" required>');
  res.write('<br>');
  res.write('<button type="submit">Enviar</button>');
  res.write('</form>');
  res.end();
});

app.post('/', async (req, res) => {
  const num1 = req.body.num1;
  const num2 = req.body.num2;
  res.setHeader('Content-Type', 'text/html');
  res.write(`<p style="color: red;">Los números ingresados son: ${num1} y ${num2}</p>`);
  await solar(num1, num2);
  res.end();
});

// Función para obtener datos JSON de la API Solar
async function solar(coor1, coor2) {
  const URLFinal = `${apiUrl}location.latitude=${coor1}&location.longitude=${coor2}&key=${APISolar}`;
  try {
    const response = await fetch(URLFinal);
    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status}`);
    }
    const data = await response.json();
    const adddata = await db.collection('Solar').add(data);
    console.log(data); // Aquí puedes ver la respuesta JSON en la consola
    // Utiliza 'data' para manipular o mostrar la información como desees
  } catch (error) {
    console.error('Error al obtener datos:', error);
  }
}

const port = parseInt(process.env.PORT) || 8080;
app.listen(port, () => {
  console.log(`Iniciado en puerto ${port}`);
});

// Exports for testing purposes.
module.exports = app;
