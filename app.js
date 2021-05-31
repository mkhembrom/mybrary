const dotenv = require('dotenv');

if(process.env.NODE_ENV !== 'production') {
    dotenv.config();
}
const express = require('express');
const expressLayout = require('express-ejs-layouts');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 5000;
const indexRouter = require('./routes');

app.use(express.static(path.join(__dirname, 'public')));

/** Set View */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', 'layouts/layout.ejs');

/** Middlewares */
app.use(expressLayout);

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to Mongoose'));

app.use('/', indexRouter);

app.listen(PORT, () => {
    console.clear();
    console.log(`Server running at PORT ${PORT}`);
})