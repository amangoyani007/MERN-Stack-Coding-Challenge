const { response } = require("express");
const { AWSDataRepository } = require("../database");
const { ObjectId } = require('mongodb');
const utils = require('../utils')

// ! All Business logic will be here
class AWSDataService {

  constructor() {
    this.repository = new AWSDataRepository();
    this.resdata = {
      message: 'invalid Request',
      apistatus: false,
      statuscode: 400
    };
  }

  async AWSDataCreateMany(userInputs) {

    try {
      const id = userInputs.data[0].id
      const pipeline = [{ $match: { id } }];
      const existingdata = await this.repository.GetPipelineData(pipeline);

      if (existingdata.length == 0) {
        const response = await this.repository.AWSDataCreateMany(userInputs.data);
        var successmsg = await utils.ResponseMessage("datainsert");
        var errormsg = await utils.ResponseMessage("nodatainsert");
        var apires = await utils.FormateData(response, successmsg, errormsg);
        return apires;
      }
      else {
        this.resdata.message = await utils.ResponseMessage("dataexist");
        this.resdata.statuscode = 409;
        this.resdata.data = [];
      }
      return this.resdata;

    } catch (err) {
      console.log({ error: err });
      return ({ error: err });
    }

  }

  async GetAllData(userInputs) {

    try {
      let { search, sortby, sortorder, nextpage, perpage } = userInputs;

      var { skip, limit } = await utils.GetPagination(nextpage, perpage);

      if (!search) search = ""
      var searchex = new RegExp(search.replace(/\+/g, ''), 'i');
      var addflt = [];
      if (searchex.length != 0) {
        var fltsearch = {
          $or: [
            { id: searchex },
            { title: searchex },
            { description: searchex },
            { price: searchex },
          ]
        }
        addflt.push(fltsearch)
      }
      if (addflt == []) addflt.push({})

      const pipeline = [
        { $match: { $and: addflt } },
        {
          $project: {
            __v: 0,
            _id: 0,
            createdAt: 0,
            updatedAt: 0
          }
        },
        { $skip: skip },
        { $limit: limit },
      ];

      const find = await this.repository.GetPipelineData(pipeline);

      if (find) {
        var successmsg = await utils.ResponseMessage("datafound");
        var errormsg = await utils.ResponseMessage("nodatafound");
        var apires = await utils.FormateData(find, successmsg, errormsg);
        return apires;
      }
      return [];
    } catch (err) {
      console.log({ error: err });
      return ({ error: err });
    }
  }

}

module.exports = AWSDataService;