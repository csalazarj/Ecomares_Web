const mongoose = require("mongoose");

const {
    ECOMARESWEB_APP_MONGODB_ATLAS,
    ECOMARESWEB_APP_MONGODB_HOST,
    ECOMARESWEB_APP_MONGODB_DATABASE
} = process.env;

//const MONGODB_URI = `mongodb://${ECOMARESWEB_APP_MONGODB_HOST}/${ECOMARESWEB_APP_MONGODB_DATABASE}`;
const MONGODB_URI = ECOMARESWEB_APP_MONGODB_ATLAS;

mongoose
  .connect(ECOMARESWEB_APP_MONGODB_ATLAS, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then((bd) => console.log("Database is conected"))
  .catch((err) => console.log(err));