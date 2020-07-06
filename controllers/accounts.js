const accountsModel = require("../models/account")


const groupBy = (objectArray, property) => {
    return objectArray.reduce(function (total, obj) {
        let key = obj[property];
        if (!total[key]) {
            total[key] = [];
        }
        total[key].push(obj);
        return total;
    }, {});
}
exports.getAccounts = (req, res, next) => {
    const teste = groupBy(accountsModel.accountList,"agencia");
    console.log(teste)
    const id = req.param("id");
    const agenciaQry = req.query.agencia;
    const contaQry = req.query.conta;
    const nomeQry = req.nome;
    const listFiltered = accountsModel.accountList.filter(account =>
        (agenciaQry && account.name.indexOf(agenciaQry) > -1) ||
        (nomeQry && account.country.indexOf(nomeQry) > -1) ||
        (contaQry && account.status.indexOf(contaQry) > -1))
    if (!id) {
        if (agenciaQry || contaQry || nomeQry)
            return res.send(listFiltered);
        return res.send(accountsModel.accountList);
    } else {
        let conta = accountsModel.accountList.filter(account => account.id == id);
        if (conta != null) {
            return res.send(conta[0])
        } else {
            return res.status(404).send({erro: "Conta não encontrada"});
        }
        return res.send(conta)
    }
}