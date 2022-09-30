"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var productSchema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true },
    brand: { type: String, required: true, trim: true },
    price: { type: Number, required: true, trim: true },
    image: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    owner: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: 'User' },
}, { timestamps: true });
var Product = mongoose_1.model('Product', productSchema);
exports.default = Product;
