class Table {
    init(connection) {
        this.connection = connection;

        this.criarAtendimento();
        this.criarPets();
    }

    criarAtendimento() {
        const sql = `CREATE TABLE IF NOT EXISTS Atendimentos (id int NOT NULL AUTO_INCREMENT,
        cliente varchar(11) NOT NULL,
        pet varchar(20), servico varchar(20) NOT NULL, data datetime NOT NULL, dataCriacao datetime NOT NULL,
        status varchar(20) NOT NULL, observacoes text, PRIMARY KEY(id))`;

        this.connection.query(sql, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log("Tabela Atendimento criada com sucesso");
            }
        });
    }

    criarPets() {
        const query = `CREATE TABLE IF NOT EXISTS Pets (id int NOT NULL AUTO_INCREMENT,
            nome varchar(50), imagem varchar(200), PRIMARY KEY(id))`;

        this.connection.query(query, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log("Tabela Pets foi criada com sucesso");
            }
        });
    }
}

module.exports = new Table();
