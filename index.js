require('./models/routes')
const express = require('express')
const path = require('path')
const handlebars = require('handlebars')
const exphbs = require('express-handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const bodyparser = require('body-parser')
const { engine } = require('express-handlebars');
const routes_controller = require('./controllers/routes_controller')
const port = process.env.port || 3000

var app = express();

app.use(bodyparser.urlencoded({extended: false}))
app.use(bodyparser.json())

app.get('/', (req, res) => {
    res.send('<h2>Welcome to ASSR APP</h2> <h3>Click here to get access to the <b> <a href="/router/list">DATABASE</a></b></h3>');
});

app.set('views', path.join(__dirname, "/views/"));

app.engine('hbs', exphbs.engine({
        handlebars: allowInsecurePrototypeAccess(handlebars),
        extname: 'hbs',
        defaultLayout: "mainLayout",
        layoutsDir: __dirname + "/views/layouts/",
    })
);

app.set('view engine', 'hbs');

app.listen(port, () => {
    console.log('server started at port ${port}')
});

app.use('/router', routes_controller);