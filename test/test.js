
var should =require("should");
var request=require("request");
var expect=require("chai").expect;
var baseUrl="http://apilayer.net/api/live?access_key=aba2827e1a8f6da87ab6047f5dd53bb6&currencies=EUR"
var a='0;'
var util=require("util");
//check curreny Web API
describe('return currency',function(){
    it('returns currency',function(done){
        request.get({url:baseUrl},function(error,response,body){
            var bodyObj=JSON.parse(body);
            console.log(body);
            expect(bodyObj.source).to.equal("USD");
            expect(bodyObj.success).to.equal(true);
            done();
        });
    });
});

//check custom vision API

describe('return userName',function(){
    it('returns usrName',function(){
        request.post({url:'https://southcentralus.api.cognitive.microsoft.com/customvision/v1.0/Prediction/741e238e-c659-4a8b-9e0f-a4a8868c305b/url?iterationId=999e3f89-da99-4c28-862f-09f2dd5a97a0',
        json: true,
        headers: {
            'Content-Type': 'application/json',
            'Prediction-Key': 'cb3277985d2148ccb06c7a86262b7f70'
        },
        body: { 'Url': "https://cdn.images.express.co.uk/img/dynamic/20/590x/secondary/Lulu-1035723.jpg" }
         
        },function(ret){
            expect(ret.Predictions[0].Tag).to.equal('lulu');
            expect(res).to.be.json;
            expect(res.body.results).to.be.an('array');
        });;
    });
});