class Table {
    init(connection) {
        this.connection = connection;

        this.criarAtendimento();
    }

    criarAtendimento() {
        const sql = `CREATE TABLE Atendimentos (id int NOT NULL AUTO_INCREMENT,
        cliente varchar(50) NOT NULL,
        pet varchar(20), servico varchar(20) NOT NULL, data datetime NOT NULL, dataCriacao datetime NOT NULL,
        status varchar(20) NOT NULL, observacoes text, PRIMARY KEY(id))`;

        this.connection.query(sql, (err) => {
            if (err && err.code != "ER_TABLE_EXISTS_ERROR") {
                console.log(err);
            } else {
                console.log("Tabela Atendimento criada com sucesso");
            }
        });
    }
}

module.exports = new Table();
