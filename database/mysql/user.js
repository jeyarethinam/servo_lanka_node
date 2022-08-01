var db = require('./connection');

exports.getUser = function (un,pw,cb) {
    var startDate = new Date();
    var queryString = "select * from user where usernae ='siva' and password = 'siva'";
    
    db.connect((err, client, release)=>{
        if(err){  return cb(true, err, date); }
        client.query(queryString, (err, result) =>{
            release()
            if(err){
                console.info(err);
                return cb(true, err, date);
            }else{
                appFun.getTimeDiff(startDate,new Date(),"from pg");
                return cb(false, result.rows, date);
            }
        });
    });
}
