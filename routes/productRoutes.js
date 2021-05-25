const { Router } = require("express");
const productController = require("../controllers/productController");
const productMiddleware = require("../middleware/productMiddleware");
const path = require("path");
const uuid = require("uuid");
const multer = require("multer");

// setup directory dan filename pada multer
const storage = multer.diskStorage({
  destination: function (req, file, next) {
    next(null, "uploads/foto_barang");
  },
  filename: function (req, file, next) {
    next(null, uuid.v4() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, next) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    next(null, true);
  } else {
    next(new Error("Please only upload jpeg, jpg, and png"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

const router = Router();

router.get("/product", productController.getProduct);
router.get("/product/search/:nama_barang", productController.findProduct_get);
router.get("/productDetails/:id_barang", productController.getProductDetails);
router.get("/productToko/:id_toko", productController.getProductToko);
router.post(
  "/addProduct",
  upload.single("foto"),
  productController.addProduct_post
);
router.post(
  "/editProduct",
  upload.single("foto"),
  productMiddleware.checkUserEdit,
  productController.editProduct_post
);
router.delete(
  "/deleteProduct/:id_barang",
  productMiddleware.checkUserDelete,
  productController.deleteProduct_delete
);

module.exports = router;
