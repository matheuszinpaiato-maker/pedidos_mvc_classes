const pedidos = require("../../dados/pedidos.json")

function subtotais() {
    pedidos.forEach(p => {
        p.subtotal = p.quantidade * p.preco
    })
}

const criar = (req, res) => {
    const dados = req.body
    dados.id = Number(pedidos[pedidos.length - 1].id) + 1
    pedidos.push(dados)
    res.status(201).json(dados)
}

const listar = (req, res) => {
    subtotais()
    res.json(pedidos)
}

const alterar = (req, res) => {
    const id = Number(req.params.id)
    const dados = req.body

    const indice = pedidos.findIndex(
        pedido => Number(pedido.id) === id
    )
    if (indice === -1) {
        return res.status(404).json({
            mensagem: "pedido não encontrado"
        })
    }
    pedidos[indice].cliente_id = dados.cliente_id
    pedidos[indice].produto = dados.produto
    pedidos[indice].quantidade = dados.quantidade
    pedidos[indice].preco = dados.preco
    res.json(pedidos[indice])
}

const excluir = (req, res) => {
    const id = req.params.id
    let status = 0

    for (let indice = 0; indice < pedidos.length; indice++) {
        if (pedidos[indice].id == id) {
            pedidos.splice(indice, 1)
            status = 1
            break
        }
    }
    if (status == 1) {
        res.json("pedido excluido com sucesso")
    } else {
        res.status(404).send("pedido não encontrado")
    }
}


module.exports = {
    criar, listar, alterar, excluir
}