var rest = require('../API/Restclient');
exports.deleteCountryInfos = function deleteCountryCode(session,username,countryCode){
    var url = 'http://msaadancedtraning.azurewebsites.net/tables/UserOfInfo';
  
    rest.getMyCurrency(url,session,username,function(message,session,username){
     var   Countries = JSON.parse(message);
    

        for(var i in Countries) {
           console.log(Countries[i].id);
            if (Countries[i].CountryCode === countryCode && Countries[i].UserName.toLowerCase() === username) {
              
                rest.deleteCountry(url,session,username,countryCode,Countries[i].id,handleDeletedCountryResponse)

            }
            else{
                
                session. clearDialogStack();
            }
        }
    });

};

function handleDeletedCountryResponse(body,session,username,favouriteFood)
{
    session.send('success');
}