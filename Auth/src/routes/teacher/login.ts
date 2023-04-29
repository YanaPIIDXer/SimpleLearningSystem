import { Request, Response } from "express";

export default async (req: Request, res: Response) => {
  res.status(500).send("Not Implemented");
};
