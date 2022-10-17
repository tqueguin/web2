var express = require('express');
var router = express.Router();

const FILMS = [
    {
        id: 1,
        title: 'Titanic',
        duration: 150,
        budget: 200000000,
        link: 'https://www.imdb.com/title/tt0120338/',
    },
];

// READ ALL (FILTERED)
router.get('/', (req, res, next) => {
    console.log('GET /films');
    const minimumDuration =
        req?.query['minimum-duration']?.length > 0
            ?  req.query['minimum-duration']
            : undefined;
    let listFilms;
    if (minimumDuration) {
        listFilms = [...FILMS].filter(film => film.duration >= minimumDuration)
    }
    else {
        listFilms = FILMS;
    }
    res.json(listFilms);
});


// READ ONE
router.get('/:id', (req, res) => {
    console.log(`GET /films/${req.params.id}`);
    const indexOfFilmFound = FILMS.findIndex((film) => film.id == req.params.id);
    if (indexOfFilmFound < 0) return res.sendStatus(404);
    res.json(FILMS[indexOfFilmFound]);
});


// CREATE ONE
router.post('/', (req, res) => {
    const title = req?.body?.title?.length !== 0 ? req.body.title : undefined;
    const duration = req?.body?.duration?.length !== 0 ? req.body.duration : undefined;
    const budget = req?.body?.budget?.length !== 0 ? req.body.budget : undefined;
    const link = req?.body?.link?.length !== 0 ? req.body.link : undefined;

    console.log('POST /films');

    if (!title || !duration || !budget || !link) return res.sendStatus(400); // error code '400 Bad request'
    if (typeof(duration) !== "number" || typeof(budget) !== "number" || duration <= 0 || budget <= 0) return res.sendStatus(400);

    const lastItemIndex = FILMS?.length !== 0 ? FILMS.length - 1 : undefined;
    const lastId = lastItemIndex !== undefined ? FILMS[lastItemIndex]?.id : 0;
    const nextId = lastId + 1;

    const newFilm = {
        id: nextId,
        title: title,
        duration: duration,
        budget: budget,
        link: link,
    };

    FILMS.push(newFilm);

    res.json(newFilm);
});

// DELETE ONE
router.delete('/:id', (req, res) => {
    console.log(`DELETE /films/${req.params.id}`);
  
    const foundIndex = FILMS.findIndex(film => film.id == req.params.id);
  
    if (foundIndex < 0) return res.sendStatus(404);
  
    const filmsRemovedFromFilms = FILMS.splice(foundIndex, 1);
    const filmRemoved = filmsRemovedFromFilms[0];
  
    res.json(filmRemoved);
  });

module.exports = router;