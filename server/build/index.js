"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
require("dotenv/config");
var user_1 = require("./routes/user");
var product_1 = require("./routes/product");
var cors_1 = __importDefault(require("cors"));
var app = express_1.default();
var port = 5000;
app.use(express_1.default.json());
app.use(cors_1.default());
app.use(user_1.userRouter);
app.use(product_1.productRouter);
mongoose_1.default
    .connect('mongodb+srv://mabawonku:dolapo@cluster0-uedra.mongodb.net/ecommerce-docker?retryWrites=true' ||
    '', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
})
    .then(function () { return console.log('Mongo running'); })
    .catch(function (e) { return console.log(e); });
app.listen(port, function () {
    console.log("Server is up on port " + port);
});
