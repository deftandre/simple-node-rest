const customExpress = require("./config/customExpress");
const connection = require("./db/connection");
const Table = require("./db/table");

connection.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("connection success with db");

        Table.init(connection);
        const app = customExpress();

        app.listen(3000, () => console.log("servidor rodando na porta 3000"));
    }
});
