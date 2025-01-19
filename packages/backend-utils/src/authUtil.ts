import { Request } from "express";

export const getUser = (req: Request) => {
  return (req as any)?.context?.user;
};

export const getUserId = (req: Request) => {
  return (req as any)?.context?.user?._id;
};
