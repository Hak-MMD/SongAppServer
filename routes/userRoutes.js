const express = require('express');
const router = express.Router();
const { register, login, myAccount, whoAmI, } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');


router.post('/register', register);
router.post('/login', login);
router.get('/myAccount/:id', protect, myAccount);
router.get('/whoAmI', protect, whoAmI);

module.exports = router;