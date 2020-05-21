var express = require('express');
var cors = require('cors');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');

const router = express.Router();

router.use(express.json());
router.use(cors());

router.use('/api/v1/admin', adminRouter);
router.use('/api/v1/users', usersRouter);

module.exports=router;