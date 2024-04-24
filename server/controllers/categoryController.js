const { validationResult } = require('express-validator');


const addCategory = async(req, res) =>{
    try{

        

    }catch(error){
        return res.status(400).json({
            success: false,
            msg: error.message,
        })
    }
}

module.exports = {
    addCategory
}