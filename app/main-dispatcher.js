var express = require('express');
var cors = require('cors');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');
var targetRouter = require('./routes/targetMedia');

const router = express.Router();

router.use(express.json());
router.use(cors());

router.use('/api/v1/admin', adminRouter);
router.use('/api/v1/users', usersRouter);
router.use('/api/v1/target', targetRouter);

module.exports=router;
