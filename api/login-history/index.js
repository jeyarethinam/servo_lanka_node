var router = express.Router();
var controll = require('./controller');

router.get('/:id',controll.getByUserId);

module.exports = router;