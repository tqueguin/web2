const films = [{title:'Harry Potter',duration:140,budget:100,link:'http://google.com'}];

const readAllFilms = () => films

const addFilm = (film) => {
    films.push({
        title: film.title,
        duration: film.duration,
        budget: film.budget,
        link: film.link,
    });
}


export { readAllFilms, addFilm };