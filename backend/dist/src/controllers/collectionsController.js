"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCollection = exports.updateCollection = exports.createCollection = exports.getCollections = void 0;
const categoriesController_1 = require("./categoriesController");
exports.getCollections = categoriesController_1.getCategories;
exports.createCollection = categoriesController_1.createCategory;
exports.updateCollection = categoriesController_1.updateCategory;
exports.deleteCollection = categoriesController_1.deleteCategory;
