import fs from "fs";
import path from "path";
import  tratarErros from "./erros/tratamento.js";
import { contagemPalavrasPorParagrafo } from "./index.js";
import { formatarSaida } from "./helpers.js";
import { Command } from "commander";
import chalk from "chalk";

const program = new Command();

program
    .version("1.0.0")
    .option("-l, --leitura <string>", "Caminho do texto a ser lido.")
    .option("-c, --criacao <string>", "Caminho do arquivo a ser criado com o resultado.")
    .option("-t, --teste <char>", "Verificar funcionamento do programa.")
    .action((opcoes) => {
        const {leitura, criacao, teste} = opcoes;
        
        if(!leitura || !criacao){
            console.error(chalk.red("Erro: Por favor insira o local do arquivo a ser lido e o local em que deseja salvar o resultado."));
            program.help();
            return;
        }

        const caminhoLeitura = path.resolve(leitura);
        const caminhoCriacao = path.resolve(criacao);

        try {
            executar(caminhoLeitura, caminhoCriacao);
            console.log(chalk.green("Programa executado com sucesso."));
        } catch (error) {
            throw error;
        }

        if(teste){
            testePrograma(teste);
        }
    });

program.parse();

function testePrograma(){
    console.log(chalk.cyan("Programa funcionando!"));
}

function executar(localArquivoFonte, localArquivoResultado){
    try {
        fs.readFile(localArquivoFonte, 'utf-8', (erro, texto) => {
            try{
                if (erro) throw erro;
                const textoParaArquivo = contagemPalavrasPorParagrafo(texto);
                criarSalvarArquivo(textoParaArquivo, localArquivoResultado);
            }catch (erro){
               console.log(tratarErros(erro));
            }
        });
    }catch(erro){
        console.log(tratarErros(erro));
    }
}

async function criarSalvarArquivo(dados, local){
    const arquivoNovo = `${local}/PalavrasRepetidas.txt`;
    const conteudoArquivo = formatarSaida(dados);
    try {
        await fs.promises.writeFile(arquivoNovo, conteudoArquivo);
    } catch (error) {
        throw new Error("Falha ao criar arquivo.");
    }
} 

/*
function criarSalvarArquivo(dados, local){
    const arquivoNovo = `${local}/PalavrasRepetidas.txt`;
    const conteudoArquivo = JSON.stringify(dados);

    fs.promises.writeFile(arquivoNovo, conteudoArquivo)
    .then(() => {
        console.log("Arquivo criado.")
    })
    .catch((error) => {
        throw error;
    })
    .finally(()=> {
        console.log("Procedimento concluído.")
    });
}*/