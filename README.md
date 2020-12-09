<h1 align="center">
  <img alt="Ícone do projeto" title="" src=".github/logo.png"/>
</h1>

<p align="center">
  <img src="https://img.shields.io/static/v1?label=author&message=roger3g&color=DAA520&labelColor=1C1C1C" style="display: inline;"> <img src="https://img.shields.io/static/v1?label=languages&message=3&color=DAA520&labelColor=1C1C1C" style="display: inline;"> <img src="https://img.shields.io/static/v1?label=license&message=MIT&color=DAA520&labelColor=1C1C1C" style="display: inline;"> <img src="https://img.shields.io/static/v1?label=version&message=1.0.0&color=DAA520&labelColor=1C1C1C" style="display: inline;"> <img src="https://img.shields.io/static/v1?label=platform&message=web&color=DAA520&labelColor=1C1C1C" style="display: inline;">
</p>

<div align="center">
  <img src=".github/desktop.svg" alt="Exemplo da interface no desktop" style="width: 100%;">  
</div>

## 📌 Table of Contents

- [Technology](#-technology)
- [Project](#-project)
- [Layout](#-layout)
- [Implementation ideas](#-implementation-ideas)
- [Directory structure](#-directory-structure)
- [Installation](#-installation)
- [How to contribute](#-how-to-contribute)
- [License](#-license)

## 🛠 Technology

- **Front-End**
  - [HTML](https://developer.mozilla.org/pt-BR/docs/Web/HTML)
  - [CSS](https://developer.mozilla.org/pt-BR/docs/Web/CSS)
  - [Javascript](https://developer.mozilla.org/pt-BR/docs/Web/Javascript)

- **Back-End**
  - [Node.js](https://nodejs.org/en/)
  - [Express.js](https://expressjs.com/)
  - [Nodemon](https://nodemon.io/)
  - [dotenv](https://www.npmjs.com/package/dotenv)
  - [nunjucks](https://mozilla.github.io/nunjucks/)

**Note**: Back-end technologies were used to deploy to heroku, they do **not reflect** on the direct development of the application.

## 💻 Project

Flappy bird clone with pure JavaScript. <br>

**Note**: The game is in development.

## 🔖 Layout

You can access the game **demo** [here](https://flappy-roger.herokuapp.com/).

## 💡 Implementation ideas

- [ ] Refactor.
- [ ] End the game

## 📂 Directory structure

```
|-- .github/
|-- public/
  |-- assets/
  |-- pages/
  |-- scripts/
  |-- styles/
  |-- index.html
|-- src/
  |-- server.js
|-- .env
|-- .gitignore
|-- LICENSE.md
|-- package.json
|-- package-lock.json
|-- README.md
```

## ⬇ Installation

You will need [Nodejs](https://nodejs.org/en/) and [git](https://git-scm.com/) installed on your machine. Then, you can run the scripts below:

```bash
# Clone this repository
$ git clone https://github.com/roger3g/flappy-bird.git

# Access the project folder in the cmd/terminal
$ cd flappy-bird

# Install the dependencies
$ npm install

# Run the application in development mode
$ npm run dev

# The port that the server will open will be shown on the console
```

## 🤔 How to contribute

1. Fork this repository;
2. Create a branch with your feature: **`git checkout -b my-feature`**;
3. Commit your changes: **`git commit -m 'feat: My new feature'`**;
4. Push to your branch: **`git push origin my-feature`**.

After the merge of your pull request is done, you can delete your branch.

## 📝 License

This project is under the MIT license. See the archive [LICENSE](LICENSE.md) for more details.
