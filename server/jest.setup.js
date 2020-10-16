module.exports = () => {
  let path = ".env";
  if (process.env.NODE_ENV === "test") {
    path = ".test.env";
  } else if (process.env.NODE_ENV === "dev") {
    path = ".dev.env";
  }

  require("dotenv").config({
    path,
  });
};
