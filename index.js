const express = require("express");
const app = express();


const PORT = 4000
require('./DBConn/conn')

app.get('/', (req, res) => {
    res.send({"message" : "Congratulation Tour server is running"});
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})