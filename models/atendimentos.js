const moment = require("moment");
const axios = require("axios");
const connection = require("../infrastructure/db/connection");
const repository = require("../repositories/atendimento");

class Atendimento {
    constructor() {
        this.dateIsValid = ({ data, dataCriacao }) =>
            moment(data).isSameOrAfter(dataCriacao);
        this.clientIsValid = (tamanho) => tamanho == 11;

        this.valid = (params) =>
            this.validate.filter((field) => {
                const { nome } = field;
                const param = params[nome];

                return !field.validation(param);
            });

        this.validate = [
            {
                name: "data",
                validation: this.dateIsValid,
                message: "Data deve ser maior ou igual a data atual",
            },
            {
                name: "cliente",
                validation: this.clientIsValid,
                message: "Cliente deve ter pelo menos cinco caracteres",
            },
        ];
    }

    add(atendimento) {
        const dataCriacao = moment().format("YYYY-MM-DD HH:MM:SS");
        const data = moment(atendimento.data, "DD/MM/YYYY").format(
            "YYYY-MM-DD HH:MM:SS"
        );

        const params = {
            data: { data, dataCriacao },
            cliente: { tamanho: atendimento.cliente.length },
        };

        const errors = this.valid(params);
        const existErrors = errors.length;

        if (existErrors) {
            return new Promise((resolve, reject) => reject(errors));
        } else {
            const atendimentoDatado = { ...atendimento, dataCriacao, data };

            return repository.add(atendimentoDatado).then((result) => {
                const id = result.insertId;
                return { ...atendimento, id };
            });
        }
    }

    list() {
        return repository.list();
    }

    searchById(id, res) {
        const sql = `SELECT * FROM Atendimentos WHERE id=${id}`;

        connection.query(sql, async (err, result) => {
            const atendimento = result[0];
            const cpf = atendimento.cliente;
            if (err) {
                res.status(400).json(err);
            } else {
                const { data } = await axios.get(
                    `http://localhost:8082/${cpf}`
                );

                atendimento.cliente = data;

                res.status(200).json(atendimento);
            }
        });
    }

    change(id, valores, res) {
        const sql = `UPDATE Atendimentos SET ? WHERE id=?`;

        valores.data
            ? (valores.data = moment(valores.data, "DD/MM/YYYY").format(
                  "YYYY-MM-DD HH:MM:SS"
              ))
            : null;

        connection.query(sql, [valores, id], (err, result) => {
            if (err) {
                res.status(400).json(err);
            } else {
                res.status(200).json({ id, ...valores });
            }
        });
    }

    delete(id, res) {
        const sql = `DELETE FROM Atendimentos WHERE id=?`;

        connection.query(sql, id, (err, result) => {
            if (err) {
                res.status(400).json(err);
            } else {
                res.status(200).json({ id });
            }
        });
    }
}

module.exports = new Atendimento();
