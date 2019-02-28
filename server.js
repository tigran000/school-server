const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const loginRoute = require('./routes/login');
const profileRoute = require('./routes/profile');
const app = express();
app.use(bodyParser.json());

app.use(cors());
app.use(loginRoute);
app.use(profileRoute);

app.listen(8000, () => {
    console.log('Server started on port 8000');
});