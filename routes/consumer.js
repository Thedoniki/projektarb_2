const routes = require('express').Router();
const dbService = require('../database/consumerdb')
const session = require('express-session');
routes.use(
    session({
    secret: 'thisisasecret',
    saveUninitialized: false,
    resave: false })
    );

    routes.get('/:username/',function(req,res){  /// 
        res.sendFile(__dirname + '/public/consumer.html');
    
    });


//Create question
routes.post('/:username/question/', async (req, res) => {

    var category= req.body.category;

    const toQuestion ={
        
        questionTitle: req.body.questionTitle,
        questionText:req.body.questionText,
        username:req.params.username
    };
   // console.log(toQuestion);


        try {
            
            const makeQuestion = await dbService.addQuestion(toQuestion,category);
         //   console.log(makeQuestion);
         //   console.log(formID);

        //  console.log(makeQuestion);
            res.json('Question processed!')

        }
        catch (error) {
            console.log(error);
        }
    

});


//Update question
routes.put('/question/update/:id', async (req, res) => {

    try {
    if (req.body.questionTitle.length > 0 &&
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


//route for all questions
routes.get('/questions/:username/', async (req, res) => {

    
    try {
    
        const questions = await dbService.getQuestion(req.params.username);
        console.log(questions);
        res.json(questions);
    }
    catch (error) {
        res.json('Something went wrong, questions could not be extracted from database.');
    }
});



/*

routes.get('/',(req,res) => {
    sess = req.session;
    if(sess.username && sess.password) {
        return res.redirect('/consumer/');
    }else{
        res.sendFile(__dirname +'./public/index.html');
    }
    
});




//Login for user
routes.post('/consumer/login/', async (req, res,next) => {
    const sess = req.session;
    sess.data = req.body;

    try {

        var data = sess.data;
        console.log(data);
        const username = await dbService.doLogin(data);
        if(username == true){
           // const user = await dbService.getConsumer(req.body.username);
           //res.json(data);
            res.json(username);
            next()
        }else{
            res.json(false);
        }  

        //res.json(username);
    }
    catch (error) {
        console.log("Login failed!")

    }
});

//redirect logn consumer to own page
routes.get('/consumer/:username', async (req,res,next) => {
    
    try{

        res.sendFile(__dirname + '/public/consumer.html');
    } catch (error) {
        res.json('consumer.js rad 144');
    }
    });

*/

//route for all questions
routes.get('/consumer/question/all/', async (req, res) => {

    try {
        const questions = await dbService.getQuestions();
        res.json(questions);
    }
    catch (error) {
        res.json('Something went wrong, questions could not be extracted from database.');
    }
});

routes.post('/consumer/login/', async (req, res, next) => {
    
    const sess = req.session;
    sess.data = req.body;
    var data = sess.data;
    console.log(data);
    const username = await dbService.doLogin(data);
    
    if (username == false) next('route')
      else next()
    }, function (req, res, next) {
        const sess = req.session;
    sess.data = req.body;
    var username = sess.data;

        res.send(username);
    
    });

    


/*  BEHÖVS EJ MEN SPARAR TILL PROJEKT KLART FÖR ATT VA 100% SÄKER



routes.get('/consumer/login/', async(req,res) => {
    sess = req.session;
    sess.username = req.body.username;
    data= sess.username;
           
        const consumers = await dbService.getConsumer(data);
    
        if(req.params.username == consumers) {
        res.redirect('/consumer.html');
        //res.redirect('/consumer/'+ data + '/');
        //res.json.bind = allt nedan syns.
    
       // res.json(consumers); 

        res.write(`<h1>Hello ${data} </h1><br>`);
        res.end('<a href='+'/logout'+'>Logout</a>');
    }else if(req.params.username != consumers){
        res.redirect('/index.html');
    }
    else {
        res.write('<h1>Please login first.</h1>');
        res.end(data);
    }
});


*/


routes.get('/logout',(req,res) => {
    req.session.destroy((err) => {
        if(err) {
            return console.log(err);
        }
        res.redirect('/');
    });

});


//route for all consumers
routes.get('/consumers/', async (req, res) => {
    
    try {
        const consumers = await dbService.getAllConsumers();
        res.json(consumers);
    }
    catch (error) {
        res.json('Something went wrong, questions could not be extracted from database.');
    }
});

//add user
routes.post('/consumer/add', async (req, res) => {
    try {
        let data = req.body;
        const res = await dbService.addConsumer(data);
        console.log(data);
    }
    catch (error) {
        console.log(error);
    }
    res.json({ status: 'ok' });
});



module.exports = routes;


/**

//login method for consumer
routes.post('/login', async (req, res) => {

    console.log(req.body);
    sess = req.session;
  
    sess.username = req.params.username;
    sess.password = req.params.password;

    var data = ({
        username : sess.username,
        password : sess.password

    })
   

    try {
        
            const user = await dbService.doLogin(data.username);

            if (user) {
                const valid = await bcrypt.comparePass(data.password, user.password);
                if (valid) {
                    res.end('done');
                } else {
                    res.send(false);
                }
            } else {
                res.send(false);
            }

    } catch (error) {
        console.log(error);
    }
});



 */
