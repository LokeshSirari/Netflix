exports.jsonSuccessTrueResponse = function (data,res) {
    console.log(data)
    return res.json({
        success: true,
        body: data
    });

}
exports.jsonSuccessFalseResponse = function (data,res) {

    return res.json({
        success: false,
        body: data
    });

}
