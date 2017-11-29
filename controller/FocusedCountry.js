var rest = require('../API/Restclient');
exports.addotherCountry = function sentdata(username,countryCode){
    var url = 'http://msaadancedtraning.azurewebsites.net/tables/UserOfInfo';
    rest.AddotherCountry(url,username,countryCode);
};