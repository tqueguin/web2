import { clearPage } from '../../utils/render';


const ViewPage = async () => {
  try {
    clearPage();
    
    const films = await getAllFilms();
    document.getElementById('mainContent').appendChild(createMovieTable(films));
  } catch (err) {
    console.error('ViewPage::error: ', err);
  }
};

async function getAllFilms() {
  try {
    const response = await fetch('/api/films');

    if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);

    const films = await response.json();

    return films;
  } catch (err) {
    console.error('getAllFilms::error: ', err);
    throw err;
  }
}

function createMovieTable(films) {
  const table = document.createElement("table");
  table.className = "table table-bordered";
  const thead = document.createElement("thead");
  const tableTitles = document.createElement("tr");
  const title1 = document.createElement("th");
  title1.innerText = "Title";
  tableTitles.appendChild(title1);
  const title2 = document.createElement("th");
  title2.innerText = "Duration (min)";
  tableTitles.appendChild(title2);
  const title3 = document.createElement("th");
  title3.innerText = "Budget (million)";
  tableTitles.appendChild(title3);
  thead.appendChild(tableTitles);
  table.appendChild(thead);


  const tbody = document.createElement("tbody");
  films.forEach(film => {
    const line = document.createElement("tr");
    const filmTitle = document.createElement("th");
    filmTitle.innerHTML = `<a href=${film.link}>${film.title}</a>`
    line.appendChild(filmTitle);
    const filmDuration = document.createElement("th");
    filmDuration.innerText = film.duration;
    line.appendChild(filmDuration);
    const filmBudget = document.createElement("th");
    filmBudget.innerText = film.budget;
    line.appendChild(filmBudget);
    tbody.appendChild(line);
  });
  table.appendChild(tbody);
  return table;
}


export default ViewPage;
