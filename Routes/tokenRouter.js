const router = require('express').Router()
const tokenController = require('../controller/token/tokenController')


router.post('/token',tokenController.createToken)
router.post('/reset',tokenController.passwordReset)
router.get('/:token',tokenController.checkToken)


module.exports = router