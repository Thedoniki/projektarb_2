const routes = require('express').Router();
const dbService = require('../database/contributordb');
const session = require('express-session');
routes.use(
    session({
    secret: 'thisisasecret',
    saveUninitialized: false,
    resave: false })
    );

    //rredirect logn contributor to own page
routes.get('/:username',function(req,res){  /// 
    res.sendFile(__dirname + '/public/contributor.html');
});


//CREATE AN CONTRIBUTOR ACCONT
routes.post('/contributor/', async (req, res) => {
    try {
        let data = req.body;
        const res = await dbService.addContributor(data);
        console.log(data);
    }
    catch (error) {
        console.log(error);
    }
    res.json({ status: 'ok' });
});


//Delete contributor
routes.delete('/contributor/:id', async (req, res) => {
    try {
        const p = await dbService.deleteContributor(req.params.id);
        if (p) {
            res.json(`Contributor with id ${req.params.id} is deleted`);
        }
        else {
            res.json(`Contributor with ${req.params.id} does not exist`)
        }
    }
    catch (error) {
        res.json(error);
    }
});


//Update contributor
routes.patch('/contributor/update/:id', async (req, res) => {
    if (req.body.username.length > 0 &&
        req.body.email.length > 0 &&
        req.body.password.length > 0) {
        try {
            const updatedContributor = await dbService.updateContributor(req.params.id, req.body);
            console.log(updatedContributor);
            res.json(`Contributor with ID: ${req.params.id} successfully updated.`)
        }
        catch (error) {
            console.log(error);
        }
    }
    else {
        res.json('The update was not successful.')
    }
});

/////////////// contributor END /////////////


//login method for contributor

routes.post('/contributor/login/', async (req, res) => {
    const sess = req.session;
    sess.data = req.body;

    try {
        var data = sess.data;
        console.log(data);
        const username = await dbService.doLogin(data);
        if(username == true){

           // res.json(username)
           res.send(username);
        }else{
            res.send(false);
            //res.json(false);
        }  

        //res.json(username);
    }
    catch (error) {
        console.log("Login failed!")

    }
});



/* BEHÖVS EJ MEN SPARAR TILL PROJEKT KLART FÖR ATT VA 100% SÄKER



routes.get('/contributor/:username', async(req,res) => {
    sess = req.session;
    sess.username = req.params.username;
    data= sess.username;
    
        
        const contributor = await dbService.getContributor(data);
        if(req.params.username.match(contributor)) {
        res.redirect('/contributor.html');
        //res.redirect('/consumer/'+ data + '/');
        //res.json.bind = allt nedan syns.
    
       // res.json(consumers); 

        res.write(`<h1>Hello ${data} </h1><br>`);
        res.end('<a href='+'/logout'+'>Logout</a>');
    }
    else {
        res.write('<h1>Please login first.</h1>');
        res.end('<a href='+'/'+'>Login</a>');
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

 module.exports = routes;