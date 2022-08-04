const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors');
connectToMongo();

const app = express();
app.use(cors());
const port = 8000;

app.use(express.json());  // middleware to read the json data form the req

app.use('/api/auth', require('./routes/userRoute'));
app.use('/api/auth', require('./routes/blockRoute'));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);

})