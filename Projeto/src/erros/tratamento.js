export default function tratarErros(erro){
    switch(erro.code){
        case "ENOENT":
            return "Caminho de arquivo não reconhecido."
        case "ERR_INVALID_ARG_TYPE":    
            return "Insira um caminho de arquivo."
        default:
            return "Um erro desconhecido ocorreu."
    }   
}

