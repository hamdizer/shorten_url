import { body, param, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

// User validation rules
export const validateUrl = [
    body("shortCode").notEmpty().withMessage("Code is required"),
    body("originalUrl").notEmpty().withMessage("originalUrl is required"),
    body("originalUrl").isURL().withMessage("originalUrl is invalid"),
    handleValidationErrors,
];

// ID validation for routes that require an ID


// Middleware to handle validation errors
export function handleValidationErrors(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
         res.status(400).json({ errors: errors.array() });
    }
    next();
}