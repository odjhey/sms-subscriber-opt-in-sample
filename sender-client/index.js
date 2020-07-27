require('dotenv').config()
const request = require("request");

const shortcode = process.env.SHORTCODE;
const clientCorrelator = process.env.CLIENT_CORRELATOR;

var access_token = '';
var address = '';

var message = 'hello boi!';

var options = { method: 'POST',
  url: 'https://devapi.globelabs.com.ph/smsmessaging/v1/outbound/' + shortcode + '/requests',
  qs: { 'access_token': access_token },
  headers: 
   { 'Content-Type': 'application/json' },
  body: 
   { 'outboundSMSMessageRequest': 
      { 'clientCorrelator': clientCorrelator,
        'senderAddress': shortcode,
        'outboundSMSTextMessage': { 'message': message },
        'address': address } },
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});

