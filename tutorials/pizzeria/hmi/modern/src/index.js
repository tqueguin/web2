import 'bootstrap/dist/css/bootstrap.min.css';
import './stylesheets/main.css';
import 'animate.css';

const MENU = [
  {
    id: 1,
    title: '4 fromages',
    content: 'Gruyère, Sérac, Appenzel, Gorgonzola, Tomates',
  },
  {
    id: 2,
    title: 'Vegan',
    content: 'Tomates, Courgettes, Oignons, Aubergines, Poivrons',
  },
  {
    id: 3,
    title: 'Vegetarian',
    content: 'Mozarella, Tomates, Oignons, Poivrons, Champignons, Olives',
  },
  {
    id: 4,
    title: 'Alpage',
    content: 'Gruyère, Mozarella, Lardons, Tomates',
  },
  {
    id: 5,
    title: 'Diable',
    content: 'Tomates, Mozarella, Chorizo piquant, Jalapenos',
  },
];

const body = document.querySelector('body');

body.addEventListener('click', startOrStopSound);

renderMenuFromString(MENU);

attachOnMouseEventsToGoGreen();

function startOrStopSound() {
  const myAudioPlayer = document.querySelector('#audioPlayer');

  if (myAudioPlayer.paused) myAudioPlayer.play();
  else myAudioPlayer.pause();
}

function renderMenuFromString(menu) {
  const menuTableAsString = getMenuTableAsString(menu);

  const main = document.querySelector('main');

  main.innerHTML += menuTableAsString;
}

function getMenuTableAsString(menu) {
  const menuTableLines = getAllTableLinesAsString(menu);
  const menuTable = addLinesToTableHeadersAndGet(menuTableLines);
  return menuTable;
}

function addLinesToTableHeadersAndGet(tableLines) {
  const menuTable = `
  <div class="table-responsive pt-5">
    <table class="table table-danger">
      <tr>
        <th>Pizza</th>
        <th>Description</th>
      </tr>
      ${tableLines}    
    </table>
  </div>
  `;
  return menuTable;
}

function getAllTableLinesAsString(menu) {
  let pizzaTableLines = '';

  menu?.forEach((pizza) => {
    pizzaTableLines += `<tr>
      <td>${pizza.title}</td>
      <td>${pizza.content}</td>
    </tr>`;
  });

  return pizzaTableLines;
}

function attachOnMouseEventsToGoGreen() {
  const table = document.querySelector('table');
  table.addEventListener('mouseover', () => {
    table.className = 'table table-success';
  });

  table.addEventListener('mouseout', () => {
    table.className = 'table table-danger';
  });
}
