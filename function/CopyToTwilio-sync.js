/**
 *  Based on  the Twilio Sync Token Template
 * 
 *  You need a token to read the list, this creates that token for you.
 * Since this wasa qucik Hack, it is only protected by a key, probably should do something
 * more.  Oh Well, only using this one.
 * 
 */

exports.handler = function (context, event, callback) {
    if (event.key === '') {//add your own key here. 
        // make sure you enable ACCOUNT_SID and AUTH_TOKEN in Functions/Configuration
        const ACCOUNT_SID = context.ACCOUNT_SID;

        const SERVICE_SID = context.SYNC_SERVICE_SID;
        const API_KEY = context.TWILIO_API_KEY;
        const API_SECRET = context.TWILIO_API_SECRET;

        const IDENTITY = 'VEText Hackaton Voting';

        const AccessToken = Twilio.jwt.AccessToken;
        const SyncGrant = AccessToken.SyncGrant;

        const syncGrant = new SyncGrant({
            serviceSid: SERVICE_SID
        });

        const accessToken = new AccessToken(
            ACCOUNT_SID,
            API_KEY,
            API_SECRET
        );
        accessToken.addGrant(syncGrant);
        accessToken.identity = IDENTITY;
        const response = new Twilio.Response();
        // Add CORS
        let headers = {
            "Access-Control-Allow-Origin": "http://localhost:8080",
            "Access-Control-Allow-Methods": "GET,POST",
            "Access-Control-Allow-Headers": "Content-Type",
            "Content-Type": "application/json"
        };
        // Set headers in response
        response.setHeaders(headers);



        var token = { token: accessToken.toJwt() }
        console.log(token)
        response.setBody(token);
        callback(null, response)
    } else {

        callback(null, { error: 'no access' });
    }
}