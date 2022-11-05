const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users");
const middleware = require("../middleware/auth-middleware");
const usersController = new UsersController();

// 회원가입
router.post("/signup", usersController.signUp);

// 로그인
router.post("/login", usersController.login);

// 내 정보 확인하기
router.get("/", middleware, usersController.findUser);

// 정보 수정하기
router.put("/", middleware, usersController.updateUserData);

// 회원 탈퇴하기
router.delete("/", middleware, usersController.deleteUserData);

module.exports = router;
