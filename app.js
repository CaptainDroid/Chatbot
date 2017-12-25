express = require('express')
Conversationv1 = require('watson-developer-cloud/conversation/v1')

var app = express()

var contexts = [];

app.get('/smssent', function(req, res) {
    var message = req.query.Body;
    var number = req.query.From;
    var twilioNumber = req.query.To;

    var index = 0;
    var context = null;
    var contextIndex = 0;
    contexts.forEach(function(){
        console.log(value.from);
        if(value.from == number) {
            context = value.context;
            contextIndex = index;
        }
        index = index + 1;
    });

    console.log("Received message from " +number +" saying \""+"\"");

    var conversation = new ConversationV1({
        username: 'ddd50b2d-9a4a-455a-99b0-0142e5048712',
        password: 'ba7gvTBQH5cE',
        version_date : ConversationV1.VERSION_DATE_2016_09_20
    });

    console.log(JSON.stringify(context));
    console.log(contexts.length);

    conversation.message({
        input: { text : message },
        workspace_id: '68f993f1-f115-4a24-9acf-bd211b6bf12d',
        context: context
    }, function(err, res) {
        if(err) {
            console.log(err);
        } else {
            console.log(response.output.text[0]);
            if(context = null){
                contexts.push({ 'from' : nunmber, 'context' : response.context} )
            } else {
                contexts[contextIndex].context = response.context;
            }

            var intent = response.intents[0].intent;
            console.log(intent);
            if(intent == "done") {
                contexts.splice (contextIndex, 1);
                //call rest api to do whatever additional you want to do here, say buy something or order something
            }

            var client = require('twilio')(
                'AC09a4bb00657fe4b558c515e7e392fc0a',
                '1bb9208775263310a00d5a4e93227ffc'
            );

            client.messages.create({
                from : twilioNumber,
                to : number,
                body : response.output.text[0]
            }, function(err, message) {
                if(err){
                    console.log(err.message);
                }
            });
            }
    });
    res.send('');
});

app.listen(3000, function() {
    console.log("App listening on port 3000")
})
