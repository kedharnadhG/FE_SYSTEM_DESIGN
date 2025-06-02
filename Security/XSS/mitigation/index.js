const express = require('express');


const port = 3010;
const app = express();

//middleware (anything which reaches to the next-line goes to this middleware)
app.use((req, res, next) => {
    res.setHeader(
        "Content-Security-Policy", 
        "default-src 'self';" +
        "script-src 'self' 'nonce-randomKey' 'unsafe-inline' http://unsecure.com;"
    );
    next();
})


app.use(express.static('public')); //all my static files are in public folder

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})


app.listen(port, ()=>{
    console.log(`Server started at http://localhost:${port}`);
})