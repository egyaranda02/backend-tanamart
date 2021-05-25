const { Router } = require("express");

const authMiddleware = require("../middleware/authMiddleware");
const authController = require("../controllers/authController");
const router = Router();

router.post("/signup", authController.signup_post);
router.post("/login", authController.login_post);
router.get("/logout", authController.logout_get);
router.get("/getUser", authMiddleware.checkAdmin, authController.getUser_get);
router.delete(
  "/deleteUser/:id_user",
  authMiddleware.checkAdmin,
  authController.deleteUser_delete
);

module.exports = router;
