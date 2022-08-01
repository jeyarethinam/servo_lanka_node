
var connect = require("./connection");

exports.getAllIndustry = function (cb) {
    var queryString = "select * from industry";

    connect.query(queryString, (err, result) => {
        // release()
        if (err) {
            return cb(true, err, null);
        } else {
            console.info(result);
            return cb(false, result, null);
        }
    });
}
