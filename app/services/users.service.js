const pool = require("../config/database");

module.exports = {
    create: async (data, callBack) => {

        pool.query(
        `insert into users(name,email,phone,address) 
            values(?,?,?,?)`,
            [
                data.name,
                data.email,
                data.phone,
                data.address
            ],
            (error,results,fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
    getAll: (callBack) => {
        pool.query(
            `select name,email,phone,address from users`,
                (error,results,fields) => {
                    if(error){
                        return callBack(error);
                    }
                    return callBack(null, results);
                }
            )
    },
}
