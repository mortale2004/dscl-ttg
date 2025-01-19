import type { Response } from "express";
import { HttpStatusCodes } from "@dscl-ttg/constants";
export const responseUtil = {
  update: (response: any, res: Response, message?: any) => {
    res.status(HttpStatusCodes.OK).json({
      data: response || {},
      message: message,
      status: true,
    });
  },
  updateWithGet: (response: any, res: Response, message?: any) => {
    res.status(HttpStatusCodes.OK).json({
      data: response?.data?.[0] || {},
      message: message,
      status: true,
    });
  },
  create: (response: any, res: Response, message?: any) => {
    res.status(HttpStatusCodes.OK).json({
      data: response || {},
      message: message,
      status: true,
    });
  },
  createWithGet: (response: any, res: Response, message?: any) => {
    res.status(HttpStatusCodes.OK).json({
      data: response?.data?.[0] || {},
      message: message,
      status: true,
    });
  },
  delete: (response: any, res: Response, message?: any) => {
    res.status(HttpStatusCodes.OK).json({
      data: response?.data || [],
      count: response?.count?.[0]?.count || 0,
      message: message,
      status: true,
    });
  },
  get: (response: any, res: Response, message?: any) => {
    res.status(HttpStatusCodes.OK).json({
      data: response || {},
      message: message,
      status: true,
    });
  },
  getRecord: (response: any, res: Response, message?: any) => {
    res.status(HttpStatusCodes.OK).json({
      data: response || {},
      message: message,
      status: true,
    });
  },
  getList: (response: any, res: Response, message?: any) => {
    res.status(HttpStatusCodes.OK).json({
      data: response?.data || [],
      count: response?.count,
      page: response?.page,
      message: message,
      status: true,
    });
  },
  givenResponse: (response: any, res: Response) => {
    res.status(HttpStatusCodes.OK).json(response);
  },
};
