// const { json } = require('express');
const path = require('node:path');
const express = require('express');
const { serialize, parse } = require('../utils/json');

const router = express.Router();

const jsonDbPath = path.join(__dirname, '/../data/films.json');

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
router.get('/', (req, res) => {
    console.log('GET /films');
    const minimumDuration =
        req?.query['minimum-duration']?.length > 0
            ? req.query['minimum-duration']
            : undefined;
    let listFilms;

    const films = parse(jsonDbPath, FILMS);

    if (minimumDuration) {
        listFilms = [...films].filter(film => film.duration >= minimumDuration)
    }
    else {
        listFilms = films;
    }
    res.json(listFilms);
});


// READ ONE
router.get('/:id', (req, res) => {
    console.log(`GET /films/${req.params.id}`);
    const films = parse(jsonDbPath, FILMS);
    const indexOfFilmFound = films.findIndex((film) => film.id === req.params.id);
    if (indexOfFilmFound < 0) return res.sendStatus(404);
    return res.json(films[indexOfFilmFound]);
});


// CREATE ONE
router.post('/', (req, res) => {
    const title = req?.body?.title?.length !== 0 ? req.body.title : undefined;
    const duration = req?.body?.duration?.length !== 0 ? req.body.duration : undefined;
    const budget = req?.body?.budget?.length !== 0 ? req.body.budget : undefined;
    const link = req?.body?.link?.length !== 0 ? req.body.link : undefined;

    console.log('POST /films');

    if (!title || !duration || !budget || !link) return res.sendStatus(400); // error code '400 Bad request'
    if (typeof (duration) !== "number" || typeof (budget) !== "number" || duration <= 0 || budget <= 0) return res.sendStatus(400);

    const films = parse(jsonDbPath, FILMS);
    const lastItemIndex = films?.length !== 0 ? films.length - 1 : undefined;
    const lastId = lastItemIndex !== undefined ? films[lastItemIndex]?.id : 0;
    const nextId = lastId + 1;

    const newFilm = {
        id: nextId,
        title,
        duration,
        budget,
        link
    };

    films.push(newFilm);

    serialize(jsonDbPath, films)

    return res.json(newFilm);
});

// DELETE ONE
router.delete('/:id', (req, res) => {
    console.log(`DELETE /films/${req.params.id}`);

    const films = parse(jsonDbPath, FILMS);

    const foundIndex = films.findIndex(film => film.id === req.params.id);

    if (foundIndex < 0) return res.sendStatus(404);

    const filmsRemovedFromFilms = films.splice(foundIndex, 1);
    const filmRemoved = filmsRemovedFromFilms[0];

    serialize(jsonDbPath, films);

    return res.json(filmRemoved);
});


// UPDATE ONE

router.patch('/:id', (req, res) => {
    console.log(`PATCH /films/${req.params.id}`);


    const title = req?.body?.title;
    const duration = req?.body?.duration;
    const budget = req?.body?.budget;
    const link = req?.body?.link;

    console.log('POST /films');

    if ((!title && !duration && !budget && !link) || title?.length === 0 || duration?.length === 0 || budget?.length === 0 || link?.length === 0 ) return res.sendStatus(400);

    const films = parse(jsonDbPath, FILMS);

    const foundIndex = films.findIndex(film => film.id === req.params.id);

    if (foundIndex < 0) return res.sendStatus(404);

    const updatedFilm = { ...films[foundIndex], ...req.body };

    films[foundIndex] = updatedFilm;

    serialize(jsonDbPath, films);

    return res.json(updatedFilm);
});


module.exports = router;