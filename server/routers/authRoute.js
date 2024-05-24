const express = require('express')
const router = express();

const auth = require('../middlewares/authMiddlerwares');
const authController = require('../controllers/authController')

const userController = require('../controllers/admin/adminController');

const { registerValidator, loginValidator } = require('../helplers/validator')

router.post('/register', registerValidator, authController.registerUser)
router.post('/register_partner', registerValidator, authController.registerPartner)
router.post('/login', loginValidator, authController.loginUser)
router.get('/profile', auth, authController.getProfile)
router.post('/logout', authController.logout);
router.get('/refresh_token', authController.refreshToken)


//cua admin
router.get("/get_all_users", auth, userController.getAllUsers);
router.get("/get_user", auth, userController.getAllUsers);


module.exports = router;