"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var UrlSchema = new mongoose_1.Schema({
    shortCode: { type: String, required: true },
    originalUrl: { type: String, required: true, unique: true }
});
exports["default"] = mongoose_1["default"].model("URL", UrlSchema);
