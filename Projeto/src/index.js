
export function contagemPalavrasPorParagrafo(texto){
    let paragrafos = selecionarParagrafos(texto);
    let resultado = paragrafos.flatMap((paragrafo) => {
        if(paragrafo == []){
           return [];
        }
        return contagemPalavras(paragrafo);
   });
   return resultado;
}

function contagemPalavras(texto){
    let todasPalavras = selecionarPalavras(texto);
    let contagemPalavrasTotal = {};
    todasPalavras.forEach((palavra) => {
        if(palavra.length > 4 && palavra.length <= 25){
            const palavraPronta = formatarPalavras(palavra);
            contagemPalavrasTotal[palavraPronta] = (contagemPalavrasTotal[palavraPronta] || 0) + 1;
        }      
    })
    if(Object.entries(contagemPalavrasTotal).length > 0){
        return contagemPalavrasTotal;
    }else{
        return [];
    }
}

function formatarPalavras(palavraOriginal){
    let palavraFormatada = palavraOriginal.replace(/[\/\*\^()*;:.,={}!@#$%&-_\\]/g, '');
    return palavraFormatada;
}

function selecionarParagrafos(textoObtido){
    return textoObtido.toLowerCase().split("\n")
}

function selecionarPalavras(paragrafoObtido){
    return paragrafoObtido.split(" ");
}



