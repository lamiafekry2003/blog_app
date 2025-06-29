import userRouter from "../src/Modules/User/user.controller.js";
import authRouter from "../src/Modules/Auth/auth.controller.js";
import blogRouter from "../src/Modules/Blog/blog.controller.js";

const bootstrap = (app,express) => {
  app.use(express.json());
  app.use("/users", userRouter);
  app.use("/auth", authRouter);
  app.use("/blog", blogRouter);
};
export default bootstrap;