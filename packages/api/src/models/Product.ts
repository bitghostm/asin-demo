import mongoose from "mongoose";

type Product = mongoose.Document & {
    asin: string;
    rank: string;
    category: string;
    dimensions: string;
}

const productSchema = new mongoose.Schema({
    asin: String,
    rank: String,
    category: String,
    dimensions: String,
});

export const Product = mongoose.model<Product>("Product", productSchema);
