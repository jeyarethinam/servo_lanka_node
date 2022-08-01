var connect = require("./connection");

exports.getAllService = function (cb) {
    var queryString = `select product.*,
    industry.name as industry_name,
    industry.desc as industry_desc,
    service_provider.name as service_pro,
    service_provider.whatsapp as service_pro_whatsapp ,
    service_provider.phone as service_pro_phone
    from product 
    LEFT JOIN industry ON product.industry_id =industry.id 
    LEFT JOIN service_provider ON product.service_provider_id =service_provider.id`;

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

exports.newService = function (obj, cb) {
    var query = `INSERT into farmers (full_name,address,contact,acc_no,bank) value('${obj.full_name}','${obj.address}','${obj.contact}','${obj.acc_no}','${obj.bank}')`
    db(query, null, obj, (err, result, cbData) => {
        if (err) return cb(true, err);

        return cb(false, result);

    });
};
