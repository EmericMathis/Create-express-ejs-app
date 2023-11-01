import fs from 'fs';

//! Créer les dossiers
// Dossier app et sous dossiers
const appFolders = ['controllers', 'datas', 'models', 'views', 'views/partials']
for (const folder of appFolders) {
  try {
    const projectFolder = new URL(`./app/${folder}`, import.meta.url);
    fs.mkdirSync(projectFolder, { recursive: true }, (err) => err && console.error(err));
  } catch (err) { console.error(err.message) }
};

// Dossier public et sous dossiers
const publicFolders = ['css', 'img', 'js']
for (const folder of publicFolders) {
  try {
    const projectFolder = new URL(`./public/${folder}/`, import.meta.url);
    fs.mkdirSync(projectFolder, { recursive: true }, (err) => err && console.error(err));
  } catch (err) { console.error(err.message) }
};

//! Créer les fichiers dans les dossiers
// Créer le fichier index.js

fs.writeFileSync('./index.js',
  ` import express from "express";
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

// Créer le fichier router.js

fs.writeFileSync('./app/router.js',
  `import express from 'express';

  const router = express.Router();

  router.get('/', mainController.home);

  export default router;
  `, "utf-8");

// Créer le fichier mainController.js

fs.writeFileSync('./app/controllers/mainController.js',
  `import express from 'express';

  const mainController = {
    home: function(req, res) {
        res.render('home', data);
    },

    notFound: function(req, res) {
        res.status(404).render('error', {
            message: 'Page non trouvée',
        })
}
}

  export default mainController;
  `, "utf-8");

//! Créer les fichiers EJS
// Créer le fichier home.ejs

fs.writeFileSync('./app/views/home.ejs',
  `<%- include('partials/head') %>
<%- include('partials/header') %>

<%- include('partials/footer') %>
`, "utf-8");

// Créer le fichier head.ejs

fs.writeFileSync('./app/views/partials/head.ejs',
  `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title><%= title %></title>
  <link rel="stylesheet" href="/css/reset.css">
  <link rel="stylesheet" href="/css/style.css">
</head>
<body>
`, "utf-8");

// Créer le fichier header.ejs

fs.writeFileSync('./app/views/partials/header.ejs',
  `<body>
  <header>
    <h1>Hello World!</h1>
  </header>
`, "utf-8");

//! Créer les fichiers CSS
// Créer le fichier reset.css

fs.writeFileSync('./public/css/reset.css',
  `html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
})`, "utf-8");

// Créer le fichier style.css

fs.writeFileSync('./public/css/style.css', ``, "utf-8");

//! Créer package.json

fs.writeFileSync('package.json',
  `{
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
      "express": "^4.18.2",
      "slugify": "^1.6.6"
    },
    "devDependencies": {
      "node-dev": "^8.0.0"
    }
  }
  `
)

//! Créer README.md, gitignore, .env, .env.example

fs.writeFileSync('README.md', ``)
fs.writeFileSync('.gitignore',
  `node_modules
.env`)
fs.writeFileSync('.env', `PORT=3000`)
fs.writeFileSync('.env.example', `PORT=`)
