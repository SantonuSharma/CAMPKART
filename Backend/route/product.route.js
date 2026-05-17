import express from "express";
import { createProduct, getProduct, getMyProduct, deleteProduct } from "../controller/product.controller.js";
import upload from "../config/multer.config.js"


const router = express.Router()

router.get("/", getProduct);
router.get("/my-products/:userId", getMyProduct);
router.post("/", upload.single("image"), createProduct);
router.delete("/:id", deleteProduct);

export default router