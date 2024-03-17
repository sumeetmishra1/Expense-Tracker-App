const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const bodyparser = require('body-parser');
const userroutes = require('./routes/userroutes');
const expenseroutes = require('./routes/expenseroutes');
const purchaseroute = require('./routes/purchaseroutes');
const premiumroute = require('./routes/premiumroutes');
const passwordroute = require('./routes/passwordroutes');
const app = express();
const morgan = require('morgan')
require('dotenv').config();
app.use(cors());
app.use(bodyparser.json({ extended: false }));
const accessLogStream = fs.createWriteStream(
    path.join(__dirname, 'access.log'),
    { flags: 'a' }
)
app.use(morgan('combined', { stream: accessLogStream }));
app.use('/user', userroutes);
app.use('/expenses', expenseroutes);
app.use('/purchase', purchaseroute);
app.use('/premium', premiumroute);
app.use('/password', passwordroute);

app.use((req, res) => {
    if (req.url === '/') {
        res.sendFile(path.join(__dirname, `Expense-Trackerfrntend/Frontintro/index.html`))
    }
    else {
        res.sendFile(path.join(__dirname, `Expense-Trackerfrntend/${req.url}`))
    }
})

const DB_URL = process.env.DB_URL;
mongoose.connect(DB_URL).then(() => {
    app.listen(4000);
    console.log('connected')
})
 .catch(err => console.log(err));