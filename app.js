require('dotenv').config();
const Express =require('express');
const app = Express();
const dbConnection = require('./db');

app.use(Express.json());   ///////////MUST go above any routes - tells the app we want to use json in our request///////

const controllers = require('./controllers');

////// Test Route to Make Sure Server Connected to Postman /////////
app.use('/test', (req, res)=> {
    res.send("This is a message from the test route!")
});

app.use(require('./middleware/headers'));
//////// Controller Routes ////////////
app.use('/user', controllers.userController);
// app.use('/secret_garden', controllers.adminController);  //admin route
// app.use(require('./middleware/validate-jwt-admin'));
// app.use(require('./middleware/validate-jwt'));   ///<--- validate sessions
app.use('/plant', controllers.plantController);

////// Connecting Server to DataBase (PgAdmin)  ///////////////
dbConnection.authenticate()
    .then(() => dbConnection.sync())   //{force:true} to drop table (delete all DB data)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`[Server]: App is listening on ${process.env.PORT}.`);
        });
    })

.catch((err) => {
    console.log(`[Server]: Server crashed. Error = ${err}`);
});
