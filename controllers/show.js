let showlist = new Array();

exports.postShow = (req, res, next) => {
    const show = {"id": showlist.length + 1, ...req.body};
    if (req.body.id) {
        return res.status(422).send({erro: "Ao incluir um novo item, não envie o id"})
    }
    if (!show) return res.status(422).send({erro: "Não há json de Show"})
    if ((!show.name) || (!show.permalink) || (!show.start_date)
        || (!show.country) || (!show.network) || (!show.status) || (!show.image_thumbnail_path)) {
        return res.status(422).send({erro: "Faltam informações sobre a série, veja no exercício exatamente como passar os dados"});
    }
    showlist = [...showlist, show];
    return res.status(201).send(show);
}

exports.putShow = (req, res, next) => {
    const id = req.param("id");

    let newShow = req.body;
    if ((!id) || (!showlist.some(show => show.id == id))) {
        return res.status(404).send({erro: "Show não encontrado"});
    }
    if ((!newShow.name) || (!newShow.permalink) || (!newShow.start_date)
        || (!newShow.country) || (!newShow.network) || (!newShow.status) || (!newShow.image_thumbnail_path)) {
        return res.status(422).send({erro: "Faltam informações sobre o show, veja no exercício exatamente como passar os dados"});
    }
    newShow = {"id": id, ...newShow};
    let newShowList = showlist.slice()
    newShowList[id - 1] = newShow;
    showlist = newShowList;
    return res.status(202).send(newShow);
}

exports.patchShow = (req, res, next) => {
    const id = req.param("id");
    const oldShow = showlist.filter(show => show.id == id ).pop();
    const newShow = req.body;
    if (!id||!oldShow){
        return res.status(404).send({erro:"Show não encontrato"});
    }
    for(let props in newShow){
        oldShow[props] = newShow[props];
    }
    let newShowList = showlist.slice();
    newShowList[id-1] = oldShow;
    showlist = newShowList;
    return res.status(202).send(oldShow);


}

exports.getShow = (req, res, next) => {
    const id = req.param("id");
    const nameQry = req.query.name;
    const statusQry = req.query.status;
    const countryQry = req.country;
    const listFiltered = showlist.filter(show =>
        (nameQry && show.name.indexOf(nameQry) > -1) ||
        (countryQry && show.country.indexOf(countryQry) > -1) ||
        (statusQry && show.status.indexOf(statusQry) > -1))
    if (!id) {
        if (nameQry || statusQry || countryQry)
            return res.send(listFiltered);
        return res.send(showlist);
    } else {
        let show = showlist.filter(show => show.id == id);
        if (show != null) {
            return res.send(show[0])
        } else {
            return res.status(404).send({erro: "Show não encontrado"});
        }
        return res.send(show)
    }
}

exports.deleteShow = (req,res,next) => {
    const id = req.param("id");
    if (showlist.some(show => show.id == id)){
        showlist = showlist.filter((show => show.id != id));
        return res.status(204).send({});
    } else {
        return res.status(404).send({erro:"Show não encontrado"});
    }
}