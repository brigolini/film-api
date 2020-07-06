let filmList = new Array();

exports.postFilm = (req, res, next) => {
    const film = {"id": filmList.length + 1, ...req.body};
    if (req.body.id) {
        return res.status(422).send({erro: "Ao incluir um novo item, não envie o id"})
    }
    if (!film) return res.status(422).send({erro: "Não há json de Filme"})
    if ((!film.name) || (!film.start_date) || (!film.country)) {
        return res.status(422).send({erro: "Faltam informações sobre o filme, você deve passar name, start_date e country"});
        return res.status(422).send({erro: "Faltam informações sobre o filme, você deve passar name, start_date e country"});
    }
    filmList = [...filmList, film];
    return res.status(201).send(film);
}

exports.putFilm = (req, res, next) => {
    const id = req.param("id");

    let newFilm = req.body;
    if ((!id) || (!filmList.some(film => film.id == id))) {
        return res.status(404).send({erro: "Filme não encontrado"});
    }
    if ((!newFilm.name) || (!newFilm.start_date) || (!newFilm.country)){
        return res.status(422).send({erro: "Faltam informações sobre o filme, você deve passar name, start_date e country"});
    }
    newFilm = {"id": id, ...newFilm};
    let newFilmList = filmList.slice()
    newFilmList[id - 1] = newFilm;
    filmList = newFilmList;
    return res.status(202).send(newFilm);
}

exports.patchFilm = (req, res, next) => {
    const id = req.param("id");
    const oldFilm = filmList.filter(film => film.id == id ).pop();
    const newFilm = req.body;
    if (!id||!oldFilm){
        return res.status(404).send({erro:"Filme não encontrato"});
    }
    for(let props in newFilm){
        oldFilm[props] = newFilm[props];
    }
    let newFilmList = filmList.slice();
    newFilmList[id-1] = oldFilm;
    filmList = newFilmList;
    return res.status(202).send(oldFilm);


}

exports.getFilm = (req, res, next) => {
    const id = req.param("id");
    const nameQry = req.query.name;
    const countryQry = req.query.status;
    const listFiltered = filmList.filter(film =>
        (nameQry && film.name.indexOf(nameQry) > -1) ||
        (countryQry && film.country.indexOf(countryQry) > -1))
    if (!id) {
        if (nameQry || countryQry)
            return res.send(listFiltered);
        return res.send(filmList);
    } else {
        let film = filmList.filter(film => film.id == id);
        if (film != null) {
            return res.send(film[0])
        } else {
            return res.status(404).send({erro: "Filme não encontrado"});
        }
        return res.send(film)
    }
}

exports.deleteFilm = (req,res,next) => {
    const id = req.param("id");
    if (filmList.some(film => film.id == id)){
        filmList = filmList.filter((film => film.id != id));
        return res.status(204).send({});
    } else {
        return res.status(404).send({erro:"Filme não encontrado"});
    }
}