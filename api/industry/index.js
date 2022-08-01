var router = express.Router();
var controll = require('./controller');

router.get('/list',controll.getAllInsustries);

// router.get('/list',controll.test);

module.exports=router;