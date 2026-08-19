import { Request, Response, NextFunction } from 'express';
import { ZodError, ZodTypeAny } from 'zod';

export const validate = (schema: ZodTypeAny) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);
      return next();
    } catch (error: any) {
      if (error instanceof ZodError) {
        const issues = (error as any).issues || (error as any).errors || [];
        return res.status(400).json({
          message: 'Validation failed',
          errors: issues.map((e: any) => ({ path: Array.isArray(e.path) ? e.path.join('.') : String(e.path), message: e.message })),
        });
      }
      return next(error);
    }
  };
};
