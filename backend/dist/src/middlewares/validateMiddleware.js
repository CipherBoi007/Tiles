"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const zod_1 = require("zod");
const validate = (schema) => {
    return async (req, res, next) => {
        try {
            await schema.parseAsync(req.body);
            return next();
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                const issues = error.issues || error.errors || [];
                return res.status(400).json({
                    message: 'Validation failed',
                    errors: issues.map((e) => ({ path: Array.isArray(e.path) ? e.path.join('.') : String(e.path), message: e.message })),
                });
            }
            return next(error);
        }
    };
};
exports.validate = validate;
