var builder = require('botbuilder');
var currencyInfomation=require('./controller/currencyCard');
var userInfo=require('./controller/Userdetail');
var addUserInfo=require('./controller/FocusedCountry');
var deleteCountryInfo=require('./controller/DeleteCountry');
var customVision = require('./controller/congitiveVistion');
var qna = require('./controller/QnAMaker');

exports.startDialog = function (bot) {
    // when use open the chatbot, the weclome message will be sent first.
    bot.on('conversationUpdate', function (message) {
        if (message.membersAdded) {
            message.membersAdded.forEach(function (identity) {
                if (identity.id === message.address.bot.id) {
                    bot.beginDialog(message.address, 'start');
                }
            });
        }
    });
// Luis 
 var recognizer = new builder.LuisRecognizer('https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/8739bf4b-ad95-40aa-8bf8-c2e19e45e7d5?subscription-key=a97d1e266e1b4546911a75726572c853&verbose=true&timezoneOffset=0&q=');

bot.recognizer(recognizer);
//options for my bot system
const Option1 = '1.Check the currency';
const Option2 = '2.Check my list';
const Option3 = '3.Change user list';
const Option4 = '4.Q&A';
const Option5 = '5.Login with photo';
const Option6 = '6.Logout';
const Option7 = '7.Connect to support';
// start dialog will give a guide to user, when use open the botchat
bot.dialog('start',function (session) {
    if (!isAttachment(session)){
    builder.Prompts.choice(session,
        'Hi,I am Bot of Contoso Bank,you can follow thoes options',
        [Option1,Option2,Option3,Option4,Option5,Option6,Option7],
        { listStyle: builder.ListStyle.button });
       session. clearDialogStack();
    }
});

//for option check the currency
bot.dialog('CURRENCY' ,function (session, args) {
    if (!isAttachment(session)) {             
       var countryEntity = builder.EntityRecognizer.findEntity(args.intent.entities, 'country');
          if (countryEntity) {
                switch(countryEntity.entity.toLowerCase()) {
                     case 'china':  var codeCountry='CNY'; break;
                     case 'new zealand':  var codeCountry='NZD';break;
                     case 'europe':var codeCountry='EUR';break;
                   }
                
                session.send('Finding the currency from USA to'+' '+codeCountry);
                currencyInfomation.displayCurrencyCards(codeCountry,session);
              } else {
                session.send('Finding the currency from USA to other countries');
                currencyInfomation.displayCurrencyCards('EUR,GBP,CAD,PLN,CNY,NZD',session);
              }
         }      
      }).triggerAction({
          matches: 'CURRENCY'
      });

   
//add country or delete country
bot.dialog('changedetail' ,function (session, args) {
    if (!isAttachment(session)) {             
           session.send('type "add countryName" or "delete countryName"');
         }      
      }).triggerAction({
          matches: 'change'
      });


   // check the detail of user
   bot.dialog('UserDetail', [
    function (session, args, next) {
       
     if (!isAttachment(session)) {   
        session.dialogData.args = args || {};        
        if (!session.conversationData["username"]) {
            builder.Prompts.text(session, "Enter a username to setup your account.");                
        } else {
            next(); // Skip if we already have this info.
        }
     }
    },
    function (session, results, next) {
        if (!isAttachment(session)) { 
            if (results.response) {
                session.conversationData["username"] = results.response;
            }
            session.send("Retrieving your Counties");  
           
          userInfo.userDetails(session, session.conversationData["username"]); 
        }          
    }
]).triggerAction({
    matches: 'UserDetail'
});


//add more country
bot.dialog('CreateNewUser', [
    function (session, args, next) {
        if (!isAttachment(session)){
        session.dialogData.args = args || {};        
        if (!session.conversationData["username"]) {
            builder.Prompts.text(session, "Enter a username to setup your account.");                
        } else {
            next(); 
        }}
    },
    function (session, results, next) {
        if (!isAttachment(session)) {
            if (results.response) {
                session.conversationData["username"] = results.response;
            }
            var countryEntity = builder.EntityRecognizer.findEntity(session.dialogData.args.intent.entities, 'country');
            if (countryEntity) {
                switch(countryEntity.entity.toLowerCase()) {
                    case 'china':  var codeCountry='CNY'; break;
                    case 'new zealand':  var codeCountry='NZD';break;
                    case 'europe':var codeCountry='EUR';break;
                  }
                session.send('I will help you add this country');
                addUserInfo.addotherCountry(session.conversationData["username"],codeCountry);
            } else {
                session.send("No country identified!!!");
            }
        }
    }
]).triggerAction({
    matches: 'CreateNewUser'
});


//Delete country
bot.dialog('DeleteCountry', [
    function (session, args, next) {
     if (!isAttachment(session)){        
        session.dialogData.args = args || {};
        if (!session.conversationData["username"]) {
            builder.Prompts.text(session, "Enter a username to setup your account.");
           } else {
            next(); // Skip if we already have this info.
            }
     }
    },
    function (session, results,next) {
     if (!isAttachment(session)) {
        if(results.response){
            session.conversationData['username']=results.response;
        }

        var countryEntity = builder.EntityRecognizer.findEntity(session.dialogData.args.intent.entities, 'country');
        if (countryEntity) {
            session.send('Deleting \'%s\'...', countryEntity.entity);
            switch(countryEntity.entity.toLowerCase()) {
                case 'china':  var codeCountry='CNY'; break;
                case 'new zealand':  var codeCountry='NZD';break;
                case 'europe':var codeCountry='EUR';break;
              }
            deleteCountryInfo.deleteCountryInfos(session,session.conversationData['username'],codeCountry); //<--- CALLL WE WANT
        } else {
            session.send("No country identified! Please try again");
        }
     }
       
    }
]).triggerAction({
    matches: 'Delete'
});


bot.dialog('QnA', [
    function (session, args, next) {
        session.dialogData.args = args || {};
        builder.Prompts.text(session, "What is your question?");
    },
    function (session, results, next) {
        qna.talkToQnA(session, results.response);
    }
]).triggerAction({
    matches: 'QandA'
});

//support
bot.dialog('Support', [
    function (session, args, next) {
        if (!isAttachment(session)){
        session.dialogData.args = args || {};        
        if (!session.conversationData["username"]) {
            builder.Prompts.text(session, "Enter a username to setup your account.");                
        } else {
            next(); // Skip if we already have this info.
        }}
    },
    function (session, results, next) { 
        if (!isAttachment(session)){
        if (results.response) {
            session.conversationData["username"] = results.response;
        }  
        console.log(!session.conversationData["Email"]&&session.conversationData["username"]);    
        if (!session.conversationData["Email"]&&session.conversationData["username"]) {
            console.log(session.conversationData["username"] );
            builder.Prompts.text(session, "Enter a email for connection.");                
        } else {
            next(); // Skip if we already have this info.
        }}
    },
    function (session, results, next) {
        if (!isAttachment(session)) {

            if (results.response) {
                session.conversationData["Email"] = results.response;
            }
            session.send("Thanks"+' '+session.conversationData["username"] +','+ 'we will connect you soon');
            session. clearDialogStack();
        }   
    }
]).triggerAction({
    matches: 'support'
});

//login
bot.dialog('login',[
    function (session, args, next) {
        builder.Prompts.text(session, "send your image"); 
    },
    function (session, results) {
                console.log(results.message.attachments>0);
                if(results.response.includes('http')){
                   
                    customVision.retreiveMessage(session,session.message.text);
                }
                else if(session.message.attachments && session.message.attachments.length > 0){
                        
                }
                else{
                    session.send('wrong imageurl');
                }
            }
  
]).triggerAction({
    matches: 'Login'
});




//logout
bot.dialog('logout',
function (session, args, next) {
    session.conversationData["username"]=null;
    session.send('success')
}
).triggerAction({
matches: 'Logout'
});

}

function isAttachment(session) { 
    var msg = session.message.text;
    if ((session.message.attachments && session.message.attachments.length > 0) || msg.includes("http")) {
        session.send('i am here');
        customVision.retreiveMessage(session);
        return true;
    }
    else {
        return false;
    }
}