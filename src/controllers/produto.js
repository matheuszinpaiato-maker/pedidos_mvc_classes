const produtos = require("../../dados/produtos.json")

const criar = (req, res) => {
    const dados = req.body
    dados.id = Number(produtos[produtos.length - 1].id) + 1
    produtos.push(dados)
    res.status(201).json(dados)
}

const listar = (req, res) => {
    res.json(produtos)
}

const alterar = (req, res) => {
    const id = Number(req.params.id)
    const dados = req.body

    const indice = produtos.findIndex(
        produto => Number(produto.id) === id
    )
    if (indice === -1) {
        return res.status(404).json({
            mensagem: "produto não encontrado"
        })
    }
    produtos[indice].nome = dados.nome
    produtos[indice].cpf = dados.nome
    res.json(produtos[indice])
}

const excluir = (req, res) => {
    const id = req.params.id
    let status = 0

    for (let indice = 0; indice < produtos.length; indice++) {
        if (produtos[indice].id == id) {
            produtos.splice(indice, 1)
            status = 1
            break
        }
    }
    if (status == 1) {
        res.json("produto excluido com sucesso")
    } else {
        res.status(404).send("produto não encontrado")
    }
}


module.exports = {
    criar, listar, alterar, excluir
}