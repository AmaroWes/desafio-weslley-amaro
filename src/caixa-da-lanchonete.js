const mockTabela = {
    'cafe': [null, 3],
    'chantily': ['cafe', 1.50],
    'suco': [null, 6.20],
    'sanduiche': [null, 6.50],
    'queijo': ['sanduiche', 2],
    'salgado': [null, 7.25],
    'combo1': [null, 9.50],
    'combo2': [null, 7.50]
}

class CaixaDaLanchonete {

    calcularValorDaCompra(metodoDePagamento, itens) {

        let valorTotal = 0.00;
        let flagCombo = 0;
        let moeda = "R$";
        let valorString = "";
        let flagExtra = [];
        let produtos = [];
        let qtde = [];

        if (!metodoDePagamento) {
            return "Sem método de pagamento";
        }

        if (!itens[0]) {
            return "Não há itens no carrinho de compra!";
        }

        for (const i in itens) {
            let item = itens[i].split(",");

            if (!item[1]) {
                return "Item inválido!";
            }

            produtos.push(item[0].trim());
            qtde.push(item[1].trim());
        }

        for (const j in produtos) {
            if (!Object.keys(mockTabela).includes(produtos[j])) {
                return "Item inválido!";
            }

            if (produtos[j].endsWith("1") || produtos[j].endsWith("2") || produtos[j] == "chantily" || produtos[j] == "queijo") {
                flagCombo += 1;
                flagExtra.push(produtos[j]);
            }

            if (qtde[j] == 0) {
                return "Quantidade inválida!"
            } 

            let valor = mockTabela[produtos[j]][1] * qtde[j];
            valorTotal += valor;
        }

        if (flagCombo === produtos.length) {
            return "Item extra não pode ser pedido sem o principal";
        }

        for (const extra of flagExtra) {
            if (mockTabela[extra][0] != null && !produtos.includes(mockTabela[extra][0])) {
                return "Item extra não pode ser pedido sem o principal";
            }
        }

        switch (metodoDePagamento) {
            case "dinheiro":
                valorTotal -= ((valorTotal * 5) / 100);
                break;

            case "credito":
                valorTotal += ((valorTotal * 3) / 100);
                break;

            case "debito":
                break;

            default:
                return "Forma de pagamento inválida!";
        }

        if (Number.isInteger(valorTotal)) {
            valorString = valorTotal.toString().concat(",", "00");

        } else {

            valorString = valorTotal.toString().replace(".", ",").split(",");

            if (valorString[1].length < 2) {
                valorString[1] += "0";
            } else if (valorString[1].length > 2) {
                valorString[1] = valorString[1].slice(0, 2);
                let valor = parseInt(valorString[1]);

                if (valor >= 60) {
                    valor += 1;
                }
                valorString[1] = valor.toString(); 
            }

            valorString = valorString.join(",");
        }

        let resposta = moeda.concat(" ", valorString);

        return resposta;
    }

}

export { CaixaDaLanchonete };
