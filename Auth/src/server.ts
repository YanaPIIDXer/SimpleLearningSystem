import Express from "express";
import CORS from "cors";

const app = Express();
app.use(Express.json());
app.use(CORS());

app.listen(3000, () => {
  console.info("Start Auth Server!");
});
