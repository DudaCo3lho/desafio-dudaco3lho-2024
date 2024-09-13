// Arquivo para definir os animais que o Zoológico pode tratar

const animais = [
    {
        especie: "leão",
        bioma: "savana",
        alimentacao: "carnívoro",
        tamanho: 3,
        podeConviver: (animaisNoRecinto) => {
            // Leão só pode conviver com outros leões
            return animaisNoRecinto.every(animal => animal.especie === "leão");
        }
    },
    {
        especie: "leopardo",
        bioma: "savana",
        alimentacao: "carnívoro",
        tamanho: 2,
        podeConviver: (animaisNoRecinto) => {
            // Leopardo só pode conviver com outros leopardos
            return animaisNoRecinto.every(animal => animal.especie === "leopardo");
        }
    },
    {
        especie: "crocodilo",
        bioma: "rio",
        alimentacao: "carnívoro",
        tamanho: 3,
        podeConviver: (animaisNoRecinto) => {
            // Crocodilo só pode conviver com outros crocodilos
            return animaisNoRecinto.every(animal => animal.especie === "crocodilo");
        }
    },
    {
        especie: "macaco",
        bioma: ["savana", "floresta"],
        alimentacao: "herbívoro",
        tamanho: 1,
        podeConviver: (animaisNoRecinto) => {
            // Macacos podem conviver e precisam de pelo menos outro animal no recinto
            return animaisNoRecinto.length > 0;
        }
    },
    {
        especie: "gazela",
        bioma: "savana",
        alimentacao: "herbívoro",
        tamanho: 2,
        podeConviver: (animaisNoRecinto) => {
            // Podem conviver com outros animais, desde que sejam herbívoros
            return animaisNoRecinto.every(animal => animal.alimentacao === "herbívoro");
        }
    },
    {
        especie: "hipopotamo",
        bioma: ["savana", "rio"],
        alimentacao: "herbívoro",
        tamanho: 4,
        podeConviver: (animaisNoRecinto, recinto) => {
            // Podem conviver com outros animais, desde que seja em recinto com rio
            if (recinto.tipo === "rio" | recinto.tipo === "savana com rio") {
                return true;
            }
            else {
                return animaisNoRecinto.every(animal => animal.especie === "hipopótamo");
            }
        }
    }
];

export default animais;