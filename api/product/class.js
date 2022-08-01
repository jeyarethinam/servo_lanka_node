


exports.prepareProductBody = function (result) {
    finalResult = [];
    if (result != undefined || result.length != 0) {
        for (let i = 0; i < result.length; i++) {
            data = {
                "id": result[i].id,
                "name": result[i].name,
                "desc": result[i].desc,
                "price": result[i].price.toFixed(2),
                "images": [],
                "location": result[i].location,
                "time": result[i].time,
                "condition": result[i].condition,
                "category_id": result[i].category_id,
                "industry": {
                    "id": result[i].industry_id,
                    "name": result[i].industry_name,
                    "desc": result[i].industry_desc,
                },
                "service_provider": {
                    "id": result[i].service_provider_id,
                    "name": result[i].service_pro,
                    "whatsapp": result[i].service_pro_whatsapp,
                    "phone": result[i].service_pro_phone
                }
            }
            finalResult.push(data);

        }
        return appFun.successRes(finalResult);
    }

}


