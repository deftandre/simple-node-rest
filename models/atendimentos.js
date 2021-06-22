const moment = require("moment");
const connection = require("../db/connection");

class Atendimento {
    add(atendimento, res) {
        const dataCriacao = moment().format("YYYY-MM-DD HH:MM:SS");
        const data = moment(atendimento.data, "DD/MM/YYYY").format(
            "YYYY-MM-DD HH:MM:SS"
        );
        const dateIsValid = moment(data).isSameOrAfter(dataCriacao);
        const clientIsValid = atendimento.cliente.length >= 5;

        const validate = [
            {
                name: "data",
                validation: dateIsValid,
                message: "Data deve ser maior ou igual a data atual",
            },
            {
                name: "cliente",
                validation: clientIsValid,
                message: "Cliente deve ter pelo menos cinco caracteres",
            },
        ];

        const errors = validate.filter((field) => !field.validation);
        const existErrors = errors.length;

        if (existErrors) {
            res.status(400).json(errors);
        } else {
            const atendimentoDatado = { ...atendimento, dataCriacao, data };

            const sql = "INSERT INTO Atendimentos SET ?";

            connection.query(sql, atendimentoDatado, (err, result) => {
                if (err) {
                    res.status(400).json(err);
                } else {
                    res.status(201).json(atendimento);
                }
            });
        }
    }

    list(res) {
        const sql = "SELECT * FROM Atendimentos";

        connection.query(sql, (err, result) => {
            if (err) {
                res.status(400).json(err);
            } else {
                res.status(200).json(result);
            }
        });
    }

    searchById(id, res) {
        const sql = `SELECT * FROM Atendimentos WHERE id=${id}`;

        connection.query(sql, (err, result) => {
            const atendimento = result[0];
            if (err) {
                res.status(400).json(err);
            } else {
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
