import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

// Validation rules for registering a citizen
export const registerCitizenValidationRules = [
  body("fullName").notEmpty().withMessage("Full name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  body("stateOfOrigin").notEmpty().withMessage("State of origin is required"),
  body("phone").isLength({ min: 11, max: 11 }).withMessage("Phone number is required"),
];

// Middleware to handle validation errors
export const validateRequest = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  next();
};