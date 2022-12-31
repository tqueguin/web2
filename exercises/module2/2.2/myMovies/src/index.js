import 'bootstrap/dist/css/bootstrap.min.css';
import './stylesheets/main.css';


import sw from './img/starwars.png';
import jp from './img/jurassicpark.png'

renderImageInMain(sw);
renderImageInMain(jp);
addTextInMain("Welcome to myMovies")

function renderImageInMain(imageName) {
  const image = document.createElement('img');
  image.src = imageName;
  image.height = 150;
  const main = document.querySelector('main');
  main.appendChild(image);
}

function addTextInMain(text){
    document.querySelector('header').innerText = text;
}
