function mostrarSomenteRepetições(paragrafo){
    return Object.keys(paragrafo).filter((palavra) => paragrafo[palavra] >= 2);
}

function formatarSaida(conjuntoContagens){
    let saidaFormatada = ''
    conjuntoContagens.forEach((paragrafo, numeracaoParagrafo) => {
        let palavrasRepetidas = mostrarSomenteRepetições(paragrafo).join(", ");
        if(palavrasRepetidas.length > 0){
            saidaFormatada += `Parágrafo ${numeracaoParagrafo + 1}: ${palavrasRepetidas} \n`;
        }
    });
    return saidaFormatada;
}

export {formatarSaida};