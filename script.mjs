import fs from 'fs';

// Créer les dossiers

try {
  const projectFolder = new URL('./app/[controllers, datas, models, views]/', import.meta.url);
  fs.mkdir(projectFolder, { recursive: true }, (err) => err && console.error(err));

} catch (err) { console.error(err.message) };

try {
  const projectFolder = new URL('./public/[css, img, js]/', import.meta.url);
  fs.mkdir(projectFolder, { recursive: true }, (err) => err && console.error(err));
} catch (err) { console.error(err.message) };

// Créer le fichier index.js

setTimeout(() => {
fs.writeFileSync('./index.js', `
import express from "express";
import 'dotenv/config';

const port = process.env.PORT || 3000;
const app = express();

app.set('view engine', 'ejs');
app.set('views', './app/views');

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.listen (port, () => {
    console.log(\`Server running on http://localhost:\${port}/\`)});
`, "utf-8");
}, 1000);

// Créer le fichier router.js

setTimeout(() => {
  fs.writeFileSync('./app/router.js', `
import express from 'express';

const router = express.Router();

router.get('/', mainController.home);

export default router;
`, "utf-8");
}, 1000);

// Créer package.json

fs.writeFileSync('package.json', `
  {
    "name": "project-name",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "type": "module",
    "scripts": {
      "start": "node ./app/index",
      "dev": "node-dev ./app/index --clear --notify=false"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "dependencies": {
      "dotenv": "^16.0.3",
      "ejs": "^3.1.8",
      "express": "^4.18.2"
    },
    "devDependencies": {
      "node-dev": "^8.0.0"
    }
  }
  `)
