const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8000;
const weather = require("./weather");

app.use(express.json());

// CORS setting
const whitelist = [
  "http://localhost:3000",
  "https://wherever-forecast.vercel.app/",
  "https://wherever-forecast.vercel.app",
];
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use("/", weather);

app.listen(port, () => console.log(`App listening on port ${port}`));
