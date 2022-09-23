// require sqlite to be able to use CRUD-OPERATIONS on our database
const dbPromise = require('./dbSetup')
const bcrypt = require('../crypt');

////////Contributor START//////////

//Create a new contributor
const addContributor = async (data) => {
    try {
      const dbcon = await dbPromise;
      let create = await bcrypt.createPassword(data.password);
      const query = await dbcon.run("INSERT INTO contributor(username,email,password) VALUES(?,?,?)", [data.username, data.email, create]);
      return query;
    }
    catch (error) {
      throw error;
    }
  }



const deleteContributor = async (id) => {

    try {
        const dbCon = await dbPromise;
        await dbCon.run(`DELETE FROM contributor WHERE userID=?`, [id]);
        return {status: 'contributor is now deleted form the database'};
    }
    catch(error) {
        throw new Error(error);
    }
}


const updateContributor = async (id, data) => {
    try {
        const dbCon = await dbPromise;
        let create = await bcrypt.createPassword(data.password);
        await dbCon.run(`UPDATE contributor SET username=?, email=?, password=? WHERE userID=?`, [data.username, data.email,create,id]);
        return 'question is now updated';
    }
    catch (error) {
        throw new Error(error)
    }
}


const getContributor = async (data) => {
    try {
        const dbCon = await dbPromise;
        const contributor = await dbCon.all("SELECT * FROM contributor where username=?",[data.username]);

        return contributor;

    } catch (error) {
        throw new Error('Gick inte att logga in')

    }
};



////////Contributor END//////////



//////////////LOGIN START///////////////7
const doLogin = async (data)=>{
    try{
        const dbCon = await dbPromise;
        const login = await dbCon.get("SELECT password FROM contributor WHERE username= ?",[data.username]);
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

////////////LOGIN END/////////////////






//////////////ANSWER START /////////////////////
const addAnswer = async (question,answer) => {
    
    try {
        const dbCon = await dbPromise;

       var se = await dbCon.run(`INSERT INTO answer (formID, answers) VALUES(?,?)`, [question.formID, answer.answers]);
       console.log(se); 
       return { status: "ok!"};
    }
    catch(error) {
        throw new Error(error);
    }
};

//////////////ANSWER END /////////////////////




module.exports = { 
    addContributor:addContributor,
    deleteContributor:deleteContributor,
    updateContributor:updateContributor,
    doLogin:doLogin,
    getQuestions,
    addAnswer:addAnswer,
    getContributor:getContributor
};
