import { Application } from "express";
import studentRegister from "./student/register";
import studentLogin from "./student/login";
import teacherRegister from "./teacher/register";
import teacherLogin from "./teacher/login";

export const setRoutes = (app: Application) => {
  app.post("/student/register", studentRegister);
  app.post("/student/login", studentLogin);
  app.post("/teacher/register", teacherRegister);
  app.post("/teacher/login", teacherLogin);
};
