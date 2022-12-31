import { clearPage } from '../../utils/render';
import { getAuthenticatedUser, isAuthenticated } from '../../utils/auths';


const ViewPage = async () => {
  try {
    clearPage();

    const films = await getAllFilms();
    document.querySelector('main').appendChild(createMovieTable(films));
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
  title2.innerText = "Link";
  tableTitles.appendChild(title2);
  const title3 = document.createElement("th");
  title3.innerText = "Duration (min)";
  tableTitles.appendChild(title3);
  const title4 = document.createElement("th");
  title4.innerText = "Budget (million)";
  tableTitles.appendChild(title4);
  const title5 = document.createElement("th");
  title5.innerText = "Operations";
  if(isAuthenticated()){
    tableTitles.appendChild(title5);
  }
  thead.appendChild(tableTitles);
  table.appendChild(thead);


  const tbody = document.createElement("tbody");
  films.forEach(film => {
    const line = document.createElement("tr");
    const filmTitle = document.createElement("th");
    filmTitle.innerText = film.title;
    filmTitle.contentEditable = true;
    line.appendChild(filmTitle);
    const filmLink = document.createElement("th");
    filmLink.innerHTML = `<a href=${film.link}>${film.link}</a>`;
    filmLink.contentEditable = true;
    line.appendChild(filmLink);
    const filmDuration = document.createElement("th");
    filmDuration.innerText = film.duration;
    filmDuration.contentEditable = true;
    line.appendChild(filmDuration);
    const filmBudget = document.createElement("th");
    filmBudget.innerText = film.budget;
    filmBudget.contentEditable = true;
    line.appendChild(filmBudget);
    const operations = document.createElement("th");
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.id = film.id;
    deleteButton.addEventListener("click", deleteOneMovie);
    const saveButton = document.createElement("button");
    saveButton.innerText = "Save";
    saveButton.id = film.id;
    saveButton.addEventListener("click", saveOneMovie);
    operations.appendChild(deleteButton);
    operations.appendChild(saveButton);
    if(isAuthenticated()){
      line.appendChild(operations);
    }

    tbody.appendChild(line);
  });
  table.appendChild(tbody);
  return table;
}

async function deleteOneMovie(e) {
  const movieId = e.target.id;

  const authenticatedUser = getAuthenticatedUser();

  try {
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authenticatedUser.token,
      },
    };

    const response = await fetch(`/api/films/${movieId}`, options);

    if (!response.ok) {
      throw new Error(`deleteOneMovie:: fetch error : ${response.status} : ${response.statusText}`);
    }
  } catch (err) {
    console.error('deleteOneMovie::error: ', err);
    throw err;
  }

}

async function saveOneMovie(e) {
  const movieId = e.target.id;
  
  const td = e.target.parentElement.parentElement;
  const title = td.children[0].innerText;
  const link = td.children[1].innerText;
  const duration = td.children[2].innerText;
  const budget = td.children[3].innerText;

  const authenticatedUser = getAuthenticatedUser();

  try {
    const options = {
      method: 'PATCH',
      body: JSON.stringify({
        title,
        link,
        budget,
        duration
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: authenticatedUser.token,
      },
    };

    const response = await fetch(`/api/films/${movieId}`, options);

    if (!response.ok) {
      throw new Error(`deleteOneMovie:: fetch error : ${response.status} : ${response.statusText}`);
    }
  } catch (err) {
    console.error('deleteOneMovie::error: ', err);
    throw err;
  }

}


export default ViewPage;
