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

// 회원 성별 공개 여부
router.get('/visible/:userId', middleware, usersController.visibleGender);

// 참여 예약한 모임
router.get("/partyReserved", middleware, usersController.partyReservedData);

// 참여 확정된 모임
router.get("/partyGo", middleware, usersController.partyGoData);

// 다른 유저 정보보기
router.get("/:nickName", usersController.lookOtherUser)

module.exports = router;
