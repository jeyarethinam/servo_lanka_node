var router = express.Router();
var controll = require('./controller');

router.get('/list',controll.getAllService);

// router.get('/list',controll.test);

module.exports=router;