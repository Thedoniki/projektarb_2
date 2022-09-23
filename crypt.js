const bcrypt = require('bcrypt');
const saltRounds = 10;


const createPassword = async (Password) => {
    
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(Password, salt);
    return hash;
};


const compPass = async (Password, hash) => {
    return await bcrypt.compare(Password, hash);
};


module.exports = {
    createPassword : createPassword,
    compPass : compPass
};
