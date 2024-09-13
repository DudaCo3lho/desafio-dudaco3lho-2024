import { RecintosZoo } from "./recintos-zoo.js";

// Criando os recintos diretamente no arquivo de testes
const recintos = [
    new RecintosZoo("Recinto 1", "savana", 10, [{especie: "macaco", tamanho: 1}, {especie: "macaco", tamanho: 1}, {especie: "macaco", tamanho: 1}]),
    new RecintosZoo("Recinto 2", "floresta", 5, []),
    new RecintosZoo("Recinto 3", "savana com rio", 7, [{especie: "gazela", tamanho: 2}]),
    new RecintosZoo("Recinto 4", "rio", 8, []),
    new RecintosZoo("Recinto 5", "savana", 9, [{especie: "leão", tamanho: 3}]),
];

describe('Recintos do Zoologico', () => {
    test('Deve rejeitar animal inválido', () => {
        const resultado = RecintosZoo.analisaRecintos('UNICORNIO', 1, recintos);
        expect(resultado.erro).toBe("Animal inválido");
        expect(resultado.recintos).toBeUndefined();
    });

    test('Deve rejeitar quantidade inválida', () => {
        const resultado = RecintosZoo.analisaRecintos('MACACO', 0, recintos);
        expect(resultado.erro).toBe("Quantidade inválida");
        expect(resultado.recintos).toBeUndefined();
    });

    test('Não deve encontrar recintos para 10 macacos', () => {
        const resultado = RecintosZoo.analisaRecintos('MACACO', 10, recintos);
        expect(resultado.erro).toBe("Não há recinto viável");
        expect(resultado.recintos).toBeUndefined();
    });

    test('Deve encontrar recinto para 1 crocodilo', () => {
        const resultado = RecintosZoo.analisaRecintos('CROCODILO', 1, recintos);
        expect(resultado.erro).toBeFalsy();
        expect(resultado.recintos).toBeDefined();
        if (resultado.recintos) {
            expect(resultado.recintos[0]).toBe('Recinto 4 (espaço livre: 5, total: 8)');
            expect(resultado.recintos.length).toBe(1);
        }
    });

    test('Deve encontrar recintos para 2 macacos', () => {
        const resultado = RecintosZoo.analisaRecintos('MACACO', 2, recintos);
        expect(resultado.erro).toBeFalsy();
        expect(resultado.recintos).toBeDefined();
        if (resultado.recintos) {
            expect(resultado.recintos[0]).toBe('Recinto 1 (espaço livre: 5, total: 10)');
            expect(resultado.recintos[1]).toBe('Recinto 2 (espaço livre: 3, total: 5)');
            expect(resultado.recintos[2]).toBe('Recinto 3 (espaço livre: 2, total: 7)');
            expect(resultado.recintos.length).toBe(3);
        }
    });
});
