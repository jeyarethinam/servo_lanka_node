var router = express.Router();
var controll = require('./controller');

router.post('/login',controll.login);
router.post('/register',controll.register);
router.post('/email_login',controll.loginWithEmail);
router.post('/send_mail_auth',controll.sendMailWhenUserLogin);
router.post('/validate__auth_key',controll.validateAuthKey);
router.put('/:id',controll.update);
router.get('/:id',controll.getById);
router.post('/change_password',controll.changePassword);



module.exports=router;
