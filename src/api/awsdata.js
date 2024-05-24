const { validationResult } = require("express-validator");
const axios = require('axios');
const AWSDataService = require("../service/awsdata-service");
const utils = require('../utils')

module.exports = (app) => {
  const service = new AWSDataService();
  let apiresponse = { statuscode: 400, message: "Bad Request", data: [], apistatus: false };

  // ! Create AWS Data In Local DataBase for Better Response - Hit Only One Time
  app.post("/awsdata/create", async (req, res, next) => {

    try {

      const response2 = await axios.get("https://s3.amazonaws.com/roxiler.com/product_transaction.json");
      apiresponse = await service.AWSDataCreateMany(response2);

      var response = await utils.GetApiResponse(apiresponse);
      return res.status(apiresponse.statuscode).json(response);

    } catch (err) {
      console.log(err);
      res.json(err)
      next(err);
    }
  });

  app.get("/awsdata", async (req, res, next) => {

    try {

      apiresponse = await service.GetAllData(req.body);

      var response = await utils.GetApiResponse(apiresponse);
      return res.status(apiresponse.statuscode).json(response);

    } catch (err) {
      console.log(err);
      res.json(err)
      next(err);
    }
  });

};
