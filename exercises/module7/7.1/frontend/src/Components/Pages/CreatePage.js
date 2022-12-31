import { clearPage } from '../../utils/render';
import Navigate from '../Router/Navigate';
import { getAuthenticatedUser } from '../../utils/auths';

const CreatePage = async () => {
  clearPage();
  createForm();
  const form = document.querySelector("form");
  form.addEventListener('submit', onAddFilm)
};

async function onAddFilm(e) {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const duration = parseInt(document.getElementById("duration").value, 10);
  const budget = parseInt(document.getElementById("budget").value, 10);
  const link = document.getElementById("link").value;

  const authenticatedUser = getAuthenticatedUser();

  const options = {
    method: 'POST',
    body: JSON.stringify({
      title,
      duration,
      budget,
      link
    }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: authenticatedUser.token,
    },
  };
  const response = await fetch('/api/films', options); // fetch return a promise => we wait for the response
  if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
  // const newFilm = await response.json(); // json() returns a promise => we wait for the data
  Navigate('/view');

}



function createForm() {
  const main = document.querySelector('main');
  const form = `<div class="container">
  <div class="row justify-content-md-center">
    <div class="col-6">
      <form>
        <div class="mb-3">
          <label for="lines" class="form-label">Title</label>
          <input type="text" class="form-control" id="title">
        </div>
        <div class="mb-3">
          <label for="columns" class="form-label">Duration (minutes)</label>
          <input type="number" class="form-control" id="duration">
        </div>
        <div class="mb-3">
          <label for="string" class="form-label">Budget (millions)</label>
          <input type="number" class="form-control" id="budget">
        </div>
        <div class="mb-3">
          <label for="string" class="form-label">Link</label>
          <input type="url" class="form-control" id="link">
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  </div>
</div>`
  main.innerHTML = form;
}

export default CreatePage;
