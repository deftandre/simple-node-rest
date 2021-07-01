const connection = require("../infrastructure/db/connection");
const filesUpload = require("../infrastructure/files/filesUpload");

class Pet {
    adicionar(pet, res) {
        const query = "INSERT INTO Pets SET ?";

        filesUpload(pet.imagem, pet.nome, (err, novoCaminho) => {
            if (err) {
                res.status(400).json(err);
            } else {
                const novoPet = { nome: pet.nome, imagem: novoCaminho };

                connection.query(query, novoPet, (err) => {
                    if (err) {
                        console.log(err);
                        res.status(400).json(err);
                    } else {
                        res.status(200).json(novoPet);
                    }
                });
            }
        });
    }
}

module.exports = new Pet();
