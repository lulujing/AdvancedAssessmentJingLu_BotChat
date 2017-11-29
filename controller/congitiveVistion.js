var request = require('request'); //node module for http post requests


exports.retreiveMessage = function (session,urlimage){
   
    request.post({
        url: 'https://southcentralus.api.cognitive.microsoft.com/customvision/v1.0/Prediction/741e238e-c659-4a8b-9e0f-a4a8868c305b/url?iterationId=999e3f89-da99-4c28-862f-09f2dd5a97a0',
        json: true,
        headers: {
            'Content-Type': 'application/json',
            'Prediction-Key': 'cb3277985d2148ccb06c7a86262b7f70'
        },
        body: { 'Url': urlimage }
    }, function(error, response, body){
        
        validResponse(session,body);
    });
}

function validResponse(session,body){
    if (body && body.Predictions && body.Predictions[0].Tag && body.Predictions[0].Probability>0.6){
        session.conversationData['username']=body.Predictions[0].Tag;
        console.log(session.conversationData['username']);
        session.send('Welcome'+body.Predictions[0].Tag);
       
    } else{
      session.send("Sorry,can not find any information about you");
    }
}