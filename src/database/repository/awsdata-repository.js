const mongoose = require("mongoose");
const { AWSDataModel } = require("../models");

// ! Dealing with data base operations
class AWSDataRepository {

  async AWSDataCreate(req) {
    try {
      const awsdata = new AWSDataModel(req);
      const awsdataRes = await awsdata.save();
      return [awsdataRes];
    } catch (err) {
      console.log(err);
      return { error: err };
    }
  }

  async AWSDataCreateMany(data) {
    try {

      const CreateData = await AWSDataModel.insertMany(data)

      return CreateData;
    } catch (err) {
      console.log(err);
      return { error: err };
    }
  }

  async GetPipelineData(pipeline) {
    try {

      const data = await AWSDataModel.aggregate(pipeline);

      return data || []
    } catch (err) {
      console.log(err);
      return { error: err };
    }
  }

}

module.exports = AWSDataRepository;
