import express from 'express';
import { createProduct, deleteProduct, getAllProducts, updateProduct } from '../controllers/productController.js';


const productRouter = express.Router();


productRouter.get("/", getAllProducts);

productRouter.get("trending",(req,res)=>{ 
    res.json({
        message: "Trending products endpoint"
    });
});
productRouter.post("/", createProduct);
productRouter.get("/:productID", getAllProducts);
productRouter.delete("/:productID",deleteProduct);
productRouter.put("/:productID",updateProduct);

export default productRouter;
