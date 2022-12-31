import { clearPage } from '../../utils/render';
import {addFilm} from '../../data/movies';
import Navigate  from '../Router/Navigate';

const CreatePage = () => {
  clearPage();
  createForm();
  const form = document.querySelector("form");
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const duration = document.getElementById("duration").value;
    const budget = document.getElementById("budget").value;
    const link = document.getElementById("link").value;
    if(title.length > 0 && duration > 0 && budget > 0 && link.length > 0){
      addFilm({
        title,
        duration,
        budget,
        link
      })
      Navigate('/view');
    }
    
  })
};

function createForm() {
  const main = document.getElementById("mainContent");
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
