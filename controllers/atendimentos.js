const atendimentos = require("../models/atendimentos");
const Atendimento = require("../models/atendimentos");

module.exports = (app) => {
    app.get("/atendimentos", (req, res) => Atendimento.list(res));

    app.get("/atendimentos/:id", (req, res) => {
        const id = parseInt(req.params.id);

        Atendimento.searchById(id, res);
    });

    app.post("/atendimentos", (req, res) => {
        const atendimento = req.body;

        Atendimento.add(atendimento, res);
    });

    app.patch("/atendimentos/:id", (req, res) => {
        const id = parseInt(req.params.id);
        const valores = req.body;

        atendimentos.change(id, valores, res);
    });

    app.delete("/atendimentos/:id", (req, res) => {
        const id = parseInt(req.params.id);

        Atendimento.delete(id, res);
    });
};
