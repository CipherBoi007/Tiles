"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("./lib/prisma"));
async function check() {
    const catalogues = await prisma_1.default.catalogue.findMany({});
    console.log('Total catalogues in DB:', catalogues.length);
    catalogues.forEach((c) => {
        console.log(`ID: ${c.id} | Title: "${c.title}" | fileUrl: "${c.fileUrl}"`);
    });
}
check();
