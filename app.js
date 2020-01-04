const express = require('express');
const path = require('path');


// instanciacion
const app = express();
const models = require('./models');
const server = process.env.SERVER || 's1';
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');




// router para contexto
app.get('*', async function(req,res){
  let personas = await models.getPersonas();
  res.render('index', {
    personas: personas,
    server: server
  });
})

app.post('/addPerson', async function(req,res){
  console.log(req.body)
  await models.addPersona(req.body.nombre);
  let personas = await models.getPersonas();
  res.redirect(`${req.baseUrl}/`);
})


// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = err;

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
