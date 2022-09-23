// require sqlite to be able to use CRUD-OPERATIONS on our database
const dbPromise = require('./dbSetup')
const bcrypt = require('../crypt');

/////////////////////////////
//////// queryCollection START/////////
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


//////////////////////////////



///////// QUESTION START ///////////////

// Create category
const createCategory = async (data) => {
    
    try {
        const dbCon = await dbPromise;
        await dbCon.run(`INSERT INTO category (category) VALUES(?)`, [data]);
        return { status: "ok!"};
    }
    catch(error) {
        throw new Error(error);
    }
}

///////////////////!!!!!!!!!!!!!!SKAPA EN FUNKTION SOM HÄMTAR KATEGORIER TILL FRONTEND!!!!!!!!///////////////////

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



const getQuestionByID = async (id) => {
    try {
        const dbCon = await dbPromise;
        const question = await dbCon.all('SELECT * FROM question WHERE questionID=?',[id]);
        return question;
    }
    catch (error) {
        throw new Error('Error, something went wrong');
    }
};



const updateQuestion = async (id, data) => {
    try {
        const dbCon = await dbPromise;
        await dbCon.run(`UPDATE question SET questionTitle=?, category=?, questionText=? WHERE questionID=?`, [data.questionTitle, data.category,data.questionText,id]);
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


//////////////LOGIN///////////////7

//////////////LOGIN///////////////7
const doLogin = async (data)=>{
    try{
        const dbCon = await dbPromise;
        const login = await dbCon.get("SELECT password FROM superAdmin WHERE username= ?",[data.username]);
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

const getSuperAdmin = async (data) => {
    try {
        const dbCon = await dbPromise;
        const contributor = await dbCon.all("SELECT * FROM superAdmin where username=?",[data.username]);

        return contributor;

    } catch (error) {
        throw new Error('Gick inte att logga in')

    }
};


//////// QUESTION END ///////////////



/////////////// user START /////////////
const addSuperAdmin = async (data) => {
    try {
      const dbcon = await dbPromise;
      let create = await bcrypt.createPassword(data.password);
      const query = await dbcon.run("INSERT INTO superAdmin(username,email,password) VALUES(?,?,?)", [data.username, data.email, create]);
      return query;
    }
    catch (error) {
      throw error;
    }
  }





/////////////// user END /////////////




/////EXPORT MODULE////
    module.exports = { 
        createCategory:createCategory,
        getQuestions:getQuestions,
        updateQuestion:updateQuestion,
        deleteQuestion:deleteQuestion,
        doLogin:doLogin,
        getSuperAdmin:getSuperAdmin,
        addSuperAdmin:addSuperAdmin,
        getQuestionByID:getQuestionByID
    };



