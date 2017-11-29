var rest = require('../API/restclient');

exports.talkToQnA = function postQnAResults(session, question){
    var url = 'https://westus.api.cognitive.microsoft.com/qnamaker/v2.0/knowledgebases/9665de2b-53ae-4600-9c41-c8e5ca148413/generateAnswer';
    rest.postQnAResults(url, session, question, handleQnA)
};

function handleQnA(body, session, question) {
    session.send(body.answers[0].answer);
    if(body.answers[0].answer==null){
        session.send('Sorry, I did not understand \'%s\'. Type \'support\' if you need assistance');
    }
  
};