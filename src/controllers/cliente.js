const clientes = require("../../dados/clientes.json")

const criar = (req, res) => {
    const dados = req.body
    dados.id = Number(clientes[clientes.length - 1].id) + 1
    clientes.push(dados)
    res.status(201).json(dados)
}

const listar = (req, res) => {
    res.json(clientes)
}

const alterar = (req, res) => {
    const id = Number(req.params.id)
    const dados = req.body

    const indice = clientes.findIndex(
        cliente => Number(cliente.id) === id
    )
    if (indice === -1) {
        return res.status(404).json({
            mensagem: "Cliente não encontrado"
        })
    }
    clientes[indice].cpf = dados.cpf
    clientes[indice].nome = dados.nome
    res.json(clientes[indice])
}

const excluir = (req, res) => {
    const id = req.params.id
    let status = 0

    for (let indice = 0; indice < clientes.length; indice++) {
        if (clientes[indice].id == id) {
            clientes.splice(indice, 1)
            status = 1
            break
        }
    }
    if (status == 1) {
        res.json("Cliente excluido com sucesso")
    } else {
        res.status(404).send("Cliente não encontrado")
    }
}


module.exports = {
    criar, listar, alterar, excluir
}