var rest = require('../API/restclient');
var builder = require('botbuilder');

exports.displayCurrencyCards = function getCurrencyData(countriesCode,session){
    var code=countriesCode.tostring;
    var url = "http://apilayer.net/api/live?access_key=aba2827e1a8f6da87ab6047f5dd53bb6&currencies="+countriesCode;
    rest.getCurency(url,session,countriesCode,displayCurrencyCard);
}

function displayCurrencyCard(message,countriescode,session){
    //Parses JSON
    var currenciesJson = JSON.parse(message);

   console.log(currenciesJson.quotes);
    
    var currencyInfos = [];
    for(var eachCurrency in currenciesJson.quotes)
    {
        var currencyInfo={};
        console.log(eachCurrency);
        console.log(currenciesJson.quotes[eachCurrency]);
        currencyInfo.title=eachCurrency.toString().substring(eachCurrency.toString().length-3);
        currencyInfo.value=currenciesJson.quotes[eachCurrency].toString();
        currencyInfos.push(currencyInfo);
    }
    console.log(currencyInfos);
    
    session.send(new builder.Message(session).addAttachment({
        contentType: "application/vnd.microsoft.card.adaptive",
        content: {
            "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
            "type": "AdaptiveCard",
            "version": "0.5",
            "body": [
                {
                    "type": "Container",
                    "items": [
                        {
                            "type": "TextBlock",
                            "text": 'Exchange currency of USA',
                            "size": "large"
                        },
                        {
                            "type": "TextBlock",
                            "text": "Currency Information"
                        }
                    ]
                },
                {
                    "type": "Container",
                    "spacing": "none",
                    "items": [
                        {
                            "type": "ColumnSet",
                            "columns": [
                                {
                                    "type": "Column",
                                    "width": "auto",
                                    "items": [
                                        {
                                            "type": "FactSet",
                                            "facts": currencyInfos
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    }));
}