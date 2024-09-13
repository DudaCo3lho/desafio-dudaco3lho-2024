import animais from "./animaisZoo";

class RecintosZoo {
    constructor(nome, tipo, tamanhoTotal, animaisNoRecinto) {
        this.nome = nome;
        this.tipo = tipo;
        this.tamanhoTotal = tamanhoTotal;
        this.animaisNoRecinto = animaisNoRecinto;
    }

    espacoDisponivel() {
        return this.tamanhoTotal - this.animaisNoRecinto.reduce((total, animal) => total + animal.tamanho, 0);
    }

    podeReceberAnimal(novoAnimal, quantidade) {
        const espacoNecessario = novoAnimal.tamanho * quantidade;
        let espacoLivre = this.espacoDisponivel();
        const especiesDiferentes = this.animaisNoRecinto.some(animal => animal.especie !== novoAnimal.especie);
        if (especiesDiferentes) {
            espacoLivre -= 1;
        }
        const convivencia = novoAnimal.podeConviver(this.animaisNoRecinto);
        return this.tipo === novoAnimal.bioma && espacoLivre >= espacoNecessario && convivencia;
    }

    static analisaRecintos(tipoAnimal, quantidade, recintos) {
        const animal = animais.find(a => a.especie.toLowerCase() === tipoAnimal.toLowerCase());
        if (!animal) {
            return { erro: "Animal inválido" };
        }

        if (quantidade <= 0 || !Number.isInteger(quantidade)) {
            return { erro: "Quantidade inválida" };
        }

        const recintosViaveis = recintos
            .map((recinto, index) => {
                if (recinto.podeReceberAnimal(animal, quantidade)) {
                    const espacoLivre = recinto.espacoDisponivel() - animal.tamanho * quantidade;
                    return `Recinto ${index + 1} (espaço livre: ${espacoLivre}, total: ${recinto.tamanhoTotal})`;
                }
                return null;
            })
            .filter(recinto => recinto !== null);

        if (recintosViaveis.length === 0) {
            return { erro: "Não há recinto viável" };
        }

        return { recintos: recintosViaveis };
    }
}
export {RecintosZoo as RecintosZoo};
