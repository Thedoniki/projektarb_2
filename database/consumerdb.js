// require sqlite to be able to use CRUD-OPERATIONS on our database
const dbPromise = require('./dbSetup')
const bcrypt = require('../crypt');


//////////////LOGIN START///////////////

//LOGIN METHOD
const doLogin = async (data)=>{
    try{
        const dbCon = await dbPromise;
        const login = await dbCon.get("SELECT password FROM consumer WHERE username= ?",[data.username]);
        compare = await bcrypt.compPass(data.password, login.password);
        console.log(compare);
        if(compare)
        {
            return true;
        }
        else{   
            return false;
        }
         
    }
    catch(error){
        console.log(error);
    }
}

//////////////LOGIN END///////////////

////////////////Consumer START /////////////

//Create a new consumer
const addConsumer = async (data) => {
    try {
      const dbcon = await dbPromise;
      let create = await bcrypt.createPassword(data.password);
      const query = await dbcon.run("INSERT INTO consumer(username,email,password) VALUES(?,?,?)", [data.username, data.email, create]);
      return query;
    }
    catch (error) {
      throw error;
    }
  }

const getAllConsumers = async () => {
    try {
        const dbConnection = await dbPromise;
        const consumers = await dbConnection.all("SELECT * FROM consumer ORDER by userID ASC");

        return consumers;
    } catch (error) {
        throw new Error('Gick inte att logga in')

    }
};


const getConsumer = async (data) => {
    try {
        const dbConnection = await dbPromise;
        const consumer = await dbConnection.all("SELECT * FROM consumer where username=?",[data.username]);

        return consumer;

    } catch (error) {
        throw new Error('Gick inte att logga in')

    }
};

////////////////Consumer END ///////////////


//////////////QUESTION START /////////////////////


const addQuestion = async (question,category) => {
    
    try {
        const dbCon = await dbPromise;
      
        await dbCon.run(`INSERT INTO question (questionTitle, username, questionText,category) VALUES(?,?,?,?)`, [question.questionTitle,question.username,question.questionText, category]);

      
        return { status: "ok!"};
    }
    catch(error) {
        throw new Error(error);
    }
}

const updateQuestion = async (id, data) => {
    try {
        const dbCon = await dbPromise;
        await dbCon.run(`UPDATE question SET questionTitle=?, questionText=? WHERE questionID=?`, [data.questionTitle,data.questionText,id]);
        return 'question is now updated';
    }
    catch (error) {
        throw new Error(error)
    }
}

const deleteQuestion = async (id) => {
    try {
        const dbCon = await dbPromise;
        await dbCon.run("DELETE FROM question WHERE questionID=?", [id]);
        return {status: 'question is now deleted form the database'};
    }
    catch (error) {
        throw new Error(error);
    }
};



const getQuestions = async () => {
    try {
        const dbCon = await dbPromise;
    
        const questions = await dbCon.all('SELECT * FROM question ORDER by questionID ASC')
        return questions;

        
    }
    catch (error) {
        throw new Error('Error, something went wrong');
    }
};


const getQuestion = async (username) => {
    //returnera produkter
    try {
        const dbCon = await dbPromise;

        const questions = await dbCon.all('SELECT * FROM question WHERE username=? ORDER by questionID ASC', [username])

        return questions;
    }
    catch (error) {
        throw new Error('Error, something went wrong');
    }
};

//////////////QUESTION END /////////////////////

////////!! queryCollection START !!/////////

/*
const getMatchingFormID = async() => {
    const dbCon = await dbPromise;
    const getFormID = await dbCon.get("SELECT * FROM queryCollection ORDER BY formID DESC LIMIT 1;");
    const getQuestionID = await dbCon.get("SELECT * FROM question ORDER BY questionID DESC LIMIT 1;");
    try {
        
        const update = await dbCon.run(`UPDATE question SET formID=? WHERE questionID=?`, [getFormID.formID, getQuestionID.questionID]);
        return update;
        
    }
    catch (error) {
        throw new Error(error);
    }
}


*/



////////////////!! queryCollection END !!/////////////////




module.exports = {
    addQuestion:addQuestion,
    updateQuestion:updateQuestion,
    deleteQuestion:deleteQuestion,
    getQuestions:getQuestions,
    doLogin:doLogin,
    getAllConsumers:getAllConsumers,
    getConsumer:getConsumer,
    addConsumer:addConsumer,
    getQuestion:getQuestion
};