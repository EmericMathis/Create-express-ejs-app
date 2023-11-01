import fs from 'fs';

// Créer les dossiers
try {
  const projectFolder = new URL('./app/[controllers, models, views]/', import.meta.url);
  fs.mkdir(projectFolder, { recursive: true }, (err) => err && console.error(err));

} catch (err) { console.error(err.message) };

try {
  const projectFolder = new URL('./public/[css, img]/', import.meta.url);
  fs.mkdir(projectFolder, { recursive: true }, (err) => err && console.error(err));
} catch (err) { console.error(err.message) };

// Créer le fichier index.js
const index = `index.js`;
fs.writeFileSync(index, `
import express from "express";
import 'dotenv/config';

const port = process.env.PORT || 3000;
const app = express();

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.listen (port, () => {
    console.log(\`Server running on http://localhost:\${port}/\`)});
`, "utf-8");

// Créer le fichier router.js
setTimeout(() => {
  fs.writeFileSync('./app/router.js', `
import express from 'express';

const router = express.Router();

router.get('/', mainController.home);

export default router;
`, "utf-8");

  console.log(`Created router.js`);
}, 1000);
