import Products from '../models/Products.js';
import { isAdmin } from './userController.js';

export function createProduct(req,res){
    
    if(!isAdmin(req)){
        res.status(403).json({
            message: "Forbidden"
        });
        return;
    }
    const product = new Products(req.body);
        product.save().then(
            () => {
                res.json({
                    message: "Product created successfully"
                });
            }
        ).catch(
            (error) => {
                res.status(500).json({
                    message: "Error creating product",
                    error: error.message
                });
            }
        );
    }


export function getAllProducts(req,res){

    if(isAdmin(req)){

        Products.find().then(
        (products) => {
            res.json(products);
        }
    ).catch(
        (error) => {
            res.status(500).json({
                message: "Error fetching products",
                error: error
            });
        }
    );

    }else{

    Products.find({isAvailable: true}).then(
        (products) => {
            res.json(products);
        }
    ).catch(
        (error) => {
            res.status(500).json({
                message: "Error fetching products",
                error: error
            });
        }
    );
}
}

export function deleteProduct(req,res){
    if(!isAdmin(req)){
        res.status(403).json({
            message: "Only admin can delete products"
        });
        return;
    }
    const productID = req.params.productID;
    Products.deleteOne({productID: productID}).then(
        () => {
            res.json({
                message: "Product deleted successfully"
            });
        }
    )


}

export function updateProduct(req,res){
    if(!isAdmin(req)){
        res.status(403).json({
            message: "Only admin can update products"
        });
        return;
    }
    const productID = req.params.productID;
    Products.updateOne({productID: productID}, req.body).then(
        () => {
            res.json({
                message: "Product updated successfully"
            });
        }
    )

}

export function getProductByID(req,res){
    const productID = req.params.productID;
    Products.findOne({productID: productID}).then(
        (product) => {
            if(product == null){
            res.status(404).json({
                message: "Product not found"
            });
            }else{
                res.json(product);
        }
    }
    ).catch(
        (error) => {
            res.status(500).json({
                message: "Error fetching product",
                error: error
            });
        }
    )
}