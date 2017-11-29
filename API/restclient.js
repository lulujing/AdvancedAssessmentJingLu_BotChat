var request = require('request');
//get currency data
exports.getCurency = function getData(url,session,countriesCode,callback){
    
        request.get(url, function(err,res,body){
            if(err){
                console.log(err);
            }else {
                callback(body,countriesCode,session);
            }
        });
    };

    //get witchlist currency of countries
    exports.getMyCurrency = function getData(url, session, username, callback){
        request.get(url, {'headers':{'ZUMO-API-VERSION': '2.0.0'}}, function(err,res,body){
            if(err){
                console.log(err);
            }else {
                callback(body, session, username);
            }
        });
    };
 // add new focused country
    exports.AddotherCountry = function getData(url,username,countryCode){
        var options = {
            url: url,
            method: 'POST',
            headers: {
                'ZUMO-API-VERSION': '2.0.0',
                'Content-Type':'application/json'
            },
            json: {
                "UserName":username,
                "CountryCode":countryCode
            }
          };
          
          request(options, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                console.log(body);
            }
            else{
                console.log(error);
            }
          });
    };

    //delete the country

    exports.deleteCountry = function deleteData(url,session,username,countryCode,id,callback){
        var options = {
            url: url + "\\" + id,
            method: 'DELETE',
            headers: {
                'ZUMO-API-VERSION': '2.0.0',
                'Content-Type':'application/json'
            }
        };
        request(options,function (err, res, body){
            if( !err && res.statusCode === 200){
                console.log(body);
                callback(body,session,username,countryCode);
            }else {
                console.log(err);
                console.log(res);
            }
        })
    
    };


    exports.postQnAResults = function getData(url, session, question, callback){
        var options = {
            url: url,
            method: 'POST',
            headers: {
                'Ocp-Apim-Subscription-Key':'7786e5e6e38940b986d6fe41d8287d1f',
                'Content-Type':'application/json'
            },
            json: {
                "question" : question
            }
          };
      
          request(options, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                callback(body, session, question);
            }
            else{
                console.log(error);
            }
          });
      };