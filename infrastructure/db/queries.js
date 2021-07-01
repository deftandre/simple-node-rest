const connection = require("./connection");

const execQuery = (query, params = "") => {
    return new Promise((resolve, reject) => {
        connection.query(query, params, (err, result, fields) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

module.exports = execQuery;
