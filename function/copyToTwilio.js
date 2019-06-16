/*
   function for recording hackathon stuff to work with the scoring website I am writing:
   https://github.com/smelliott100/VETextHack
   Shane.elliott@gmail.com
*/
const sync = Runtime.getSync();

exports.handler = async function (context, event, callback) {
    let twiml = new Twilio.twiml.MessagingResponse();



    if (isNaN(event.Body)) {


        const body = event.Body ? event.Body.toLowerCase() : null;
        var opts = body.split(' ');
        console.log('opts:', opts);
        switch (opts[0]) {
            case 'list':

                await sync.syncLists('VETextHack')
                    .syncListItems
                    .list()
                    .then(function (data) {
                        console.log('data', data[0].data)
                        //Stopped here listing data (Not sure why I need this but started on it should finish)

                        twiml.message('resp');
                        callback(null, twiml);
                    })

                break;
            case 'j':

                console.log('j', opts[1])

                var fracTest = (opts[1] - Math.floor(opts[1])) !== 0;

                const score = opts[1];
                if (!fracTest) {
                    if (0 < score && score < 11) {
                        //add score
                        let payload = {
                            number: event.To,
                            Jscore: Number(score)
                        };
                        sync.lists('VETextHack').syncListItems.create({
                            data: payload
                        }).then(function (result) {

                            twiml.message("Judge Score Set for: " + event.To);
                            callback(null, twiml);
                        }).catch(function (error) {
                            console.log(error)
                        })
                    } else {
                        //send error
                        twiml.message("Please provide a number between 1 and 10");
                        callback(null, twiml);
                    }
                }
                else {
                    twiml.message("Please provide a WHOLE number between 1 and 10");
                    callback(null, twiml);
                }

                break;
            case 'reset':
                console.log('reset');
                sync.lists('VETextHack').remove()
                    .then(function (result) {
                        console.log(result);
                        sync.lists.create({
                            uniqueName: "VETextHack",
                        }).then(function () {
                            twiml.message("list Reset");
                            callback(null, twiml);
                        })

                    }).catch(function (error) {
                        console.log(error);

                    })
                break;

            default:
                twiml.message("Sorry, you need to check with shane on options");
                await console.log('opts:', opts);
                callback(null, twiml);
                break;


        }
    } else {
        var fracTest = (event.Body - Math.floor(event.Body)) !== 0;
        console.log(fracTest)
        const score = event.Body;
        if (!fracTest) {
            if (0 < score && score < 11) {
                //add score
                let payload = {
                    number: event.To,
                    score: Number(score)
                };
                sync.lists('VETextHack').syncListItems.create({
                    data: payload
                }).then(function (result) {
                    console.log(result);
                    twiml.message("Score Recorded" + event.To);
                    callback(null, twiml);
                }).catch(function (error) {
                    console.log(error)
                })
            } else {
                //send error
                twiml.message("Please provide a number between 1 and 10");
                callback(null, twiml);
            }
        }
        else {
            twiml.message("Please provide a WHOLE number between 1 and 10");
            callback(null, twiml);
        }
    }

};