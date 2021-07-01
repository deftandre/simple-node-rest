const fs = require("fs");
const path = require("path");

module.exports = (caminho, nomeDoArquivo, callbackImagemCriada) => {
    const validsTypes = ["jpg", "png", "jpeg"];
    const type = path.extname(caminho);
    const typeIsValid = validsTypes.indexOf(type.substring(1)) !== -1;

    if (typeIsValid) {
        const novoCaminho = `./assets/imagens/${nomeDoArquivo}${type}`;
        fs.createReadStream(caminho)
            .pipe(fs.createWriteStream(novoCaminho))
            .on("finish", () => callbackImagemCriada(false, novoCaminho));
    } else {
        const err = "Tipo é inválido";

        callbackImagemCriada(err);
    }
};
