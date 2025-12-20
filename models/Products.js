import mongoose from 'mongoose';

const productsschema = new mongoose.Schema(
    {
        productID : {
            type: String,
            required: true,
            unique: true,
        },
        name : {
            type: String,
            required: true,
        },
        altNames : {
            type: [String],
            required: false,
            default: []
        },
        description : {
            type: String,
            required: true,
        },
        price : {
            type: Number,
            required: true,

        },
        category : {
            type: String,
            required: true,
        },
        images: {
            type: [String],
            required : true,
        },
        
        model : {
            type: String,
            required: false,
            default: "Standard",
        },
        brand : {
            type: String,
            required: true,
            default: "Generic",
        },
        stock : {
            type: Number,
            required: true,
            default: 0, 
        },
        isAvailable: {
            type: Boolean,
            required: true,
            default: true,
        } ,
        labelPrice : {
        type: Number,
        required: false,
      },
    }
);
const Product = mongoose.model("Product", productsschema);

export default Product;
    