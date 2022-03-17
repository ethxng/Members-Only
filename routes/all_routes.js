const express = require('express');
const router = express.Router();
const passport = require('passport');
const authController = require('../controllers/authController');
const memberController = require("../controllers/memberController");
const adminController = require("../controllers/adminController");
const messageController = require('../controllers/messageController');
const message = require('../models/message');
const { route } = require('..');

router.get("/", authController.index);

// write a '/messages' route, where user member and admin can see author, else see anonymously

router.get('/log-in', authController.login_get);
router.post('/log-in', authController.login_post);
router.get('/sign-up', authController.signup_get);
router.post('/sign-up', authController.signup_post);
// only need 1 GET route for log out 
router.get('/log-out', authController.logout);
router.get('/member', memberController.member_get);
router.post('/member', memberController.member_post);
router.get('/admin', adminController.admin_get);
router.post('/admin', adminController.admin_post);
router.get('/messages', messageController.message_get);
router.get('/messages/create', messageController.message_create_get)
router.post('/messages/create', messageController.message_create_post);
router.get('/messages/:id/delete', messageController.message_detail)
router.post('/messages/:id/delete', messageController.message_delete);
module.exports = router;
