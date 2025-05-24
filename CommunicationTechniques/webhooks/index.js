const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(bodyParser.json());


//webHook end-point
app.post('/webhook', (req, res) => {
    
    //extract the payload from the incoming post request
    const payload = req.body;

    //you can do authentication checks here (is valid secret key)...
    //you can process the activity you want to handle here
      
    //log the received payload (you might want to process it in a more meaningful way)(may be you would be massagin the data or doing some activity on db or whatever) (These processing generally kept in some MQ (message queue) & from there you can process it)
    console.log("Received webhook payload >", payload);

    // Optionally, send a response to the sender to acknowledge receipt(i have successfully received the webhook, now you don't worry about that, whatever i need to do i'll do it, i'll process it)
    res.status(200).send("Webhook received successfully"); 

})





app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})