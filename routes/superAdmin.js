const routes = require('express').Router();
const dbService = require('../database/superAdmindb.js');
const session = require('express-session');
routes.use(
    session({
    secret: 'thisisasecret',
    saveUninitialized: false,
    resave: false })
    );

    //redirect logn superadmin to own page
routes.get('/:username/',function(req,res){  /// Via hemsida 
    res.sendFile(__dirname + '/public/superAdmin.html'); 
});


//var methodOverride = require('method-override')
////https://www.oreilly.com/library/view/programming-javascript-applications/9781491950289/ch08.html
///https://www.npmjs.com/package/method-override

// Now methodOverride() will work:
//routes.use( methodOverride() );



///////////////LOGIN START /////////////

  

//login method for contributor

routes.post('/superadmin/login/', async (req, res) => {
  const sess = req.session;
  sess.data = req.body;

  try {
      var data = sess.data;
      console.log(data);
      const username = await dbService.doLogin(data);
      if(username == true){

           res.send(username);
        }else{
            res.send(false);

          }

  }
  catch (error) {
      console.log("Login failed!")

  }
});


routes.get('/logout',(req,res) => {
  req.session.destroy((err) => {
      if(err) {
          return console.log(err);
      }
      res.redirect('/');
  });

});



/////////////LOGIN END /////////////////




///////// QUESTION START ///////////////


routes.post('/question/:category/add', async (req, res) => {
    try {
        let data = req.params.category;

        const res = await dbService.createCategory(data);
        console.log(data);

    }
    catch (error) {
        console.log(error);
    }
    res.json({ status: 'ok' });
});


//route for all questions
routes.get('/question/all/', async (req, res) => {

    try {
        const questions = await dbService.getQuestions();
        res.json(questions);
    }
    catch (error) {
        res.json('Something went wrong, questions could not be extracted from database.');
    }
});


 
//Update question
routes.put('/question/update/:id', async (req, res) => {

    try {
    if (req.body.questionTitle.length > 0 &&
        req.body.category.length > 0 &&
        req.body.questionText.length > 0 ) {
       
            const updatedProd = await dbService.updateQuestion(req.params.id, req.body);
            console.log(updatedProd);
            res.json(`Question with ID: ${req.params.id} successfully updated.`);
        }
        
        else {
            res.json({ info:`Question with id: ${questionID} is not found` });
        }
    }catch (error) {
        res.send(error.message);
    }
    
});


//Delete question
routes.delete('/question/delete/:id', async (req, res) => {
    try {
        const question = await dbService.deleteQuestion(req.params.id);
        res.json(`Question with ID: ${req.params.id} is now deleted`);    
    }
    catch(error) {
        res.send('We did not succeed to delete the question')
    }
});


routes.get('/question/:id', async function (req, res) {
 
  try {
    const question = await dbService.getQuestionByID(req.params.id);
    console.log(question); 
    res.json(question);
  } catch (error) {
    res.json({ error: error});
  }
});


//////// QUESTION END ///////////////

//////// ANSWERS START ///////

// TEEEEEESTAAAA!!!!!!!

////////ANSWERS END /////////

/////////////// superAdmin START /////////////

//CREATE AN superadmin ACCONT
routes.post('/superadmin/', async (req, res) => {
  try {
      let data = req.body;
      const res = await dbService.addSuperAdmin(data);
      console.log(data);
  }
  catch (error) {
      console.log(error);
  }
  res.json({ status: 'ok' });
});



/////////////// superAdmin END /////////////



///////OTHER////////////////


/////EXPORT MODULE////
module.exports = routes; 