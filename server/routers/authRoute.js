const express = require('express')

const router = express();
const auth = require('../middlewares/authMiddlerwares');
const authController = require('../controllers/authController')

const { registerValidator, loginValidator } = require('../helplers/validator')

router.post('/register', registerValidator, authController.registerUser)
router.post('/login', loginValidator, authController.loginUser)
router.get('/profile', auth, authController.getProfile)



module.exports = router;