var rest = require('../API/Restclient');
var currencyInfomation=require('./currencyCard');
exports.userDetails = function getUserData(session, username){
    var url = 'http://msaadancedtraning.azurewebsites.net/tables/UserOfInfo';
    rest.getMyCurrency(url, session, username, handleCountryResponse)
};

function handleCountryResponse(message, session, username) {
    var userDetailResponse = JSON.parse(message);
    console.log(userDetailResponse);
    var allCountriesCode = [];
    for (var index in userDetailResponse) {
        var usernameReceived = userDetailResponse[index].UserName;
        var countriesCode = userDetailResponse[index].CountryCode;
        console.log(userDetailResponse[index].CountryCOde);
        console.log(username);
        //Convert to lower case whilst doing comparison to ensure the user can type whatever they like
        if (username.toLowerCase() === usernameReceived.toLowerCase()) {
            //Add a comma after all favourite foods unless last one
            if(userDetailResponse.length - 1) {
                allCountriesCode.push(countriesCode);
            }
            else {
                allCountriesCode.push(countriesCode + ', ');
            }
           
        }        
    }
    
    // Print all favourite foods for the user that is currently logged in
    session.send("%s, your focused countries are: %s", username, allCountriesCode);  
    currencyInfomation.displayCurrencyCards(allCountriesCode,session);              
    
}