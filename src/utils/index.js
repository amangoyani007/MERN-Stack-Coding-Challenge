
module.exports.FormateData = async (data, successmsg = '', errormsg = '', custmsg = '', limit) => {
  let res = {};
  if (data.length != 0 && (!data.error)) {
    res.message = await this.ResponseMessage("success");
    res.data = data;
    if (limit) {
      res.loadmore = (data.length < limit) ? 0 : 1;
    }
    res.apistatus = true;
    res.statuscode = 200;
    if (successmsg != '') {
      res.message = successmsg;
    }
  } else if (data.error) {
    res.message = await this.ResponseMessage("error");
    res.data = [];
    res.apistatus = false;
    res.statuscode = 404;
  } else {
    res.message = await this.ResponseMessage("failed");
    res.data = [];
    res.apistatus = false;
    res.statuscode = 200;
    if (errormsg != '') {
      res.message = errormsg;
    }
  }
  if (custmsg != '') {
    res.message = custmsg;
  }
  return res;
};

module.exports.GetApiResponse = async (
  { data, message = "", statuscode = 200, apistatus = true }) => {
  try {
    if (data.length == 0) {
      var data = {
        success: apistatus,
        message: "Data Not found",
        data: [],
      };
    } else {
      var data = {
        success: apistatus,
        message: "Data Get Succesfully",
        data: data,
      };
    }
    if (message != "") data["message"] = message;
    if (statuscode != 200) data["success"] = apistatus;
    return await data;
  } catch (error) {
    return error;
  }
};

module.exports.ResponseMessage = (message_type) => {
  try {
    const messages = {
      datafound: "Data Found",
      otpsent: "OTP sent successfully",
      enterotp: "please eneter otp",
      datainsert: "Data Inserted",
      dataupdate: "Data Updated",
      dataexist: "Data Exist",
      nodatafound: "No Data Found",
      employeecheckin: "Check-in successful",
      employeenotcheckin: "Employee not checkin yet",
      alreadycheckinemployee: "Employee already CheckIN",
      alreadycheckoutemployee: "Employee already CheckOut",
      employeecheckout: "Check-out successful",
      tokengenerated: "token generated",
      employeestatuscheckin: "Employee status is checkin",
      employeeabsent: "Employee status is absent",
      employeestatuscheckout: "Employee status is checkout",
      enumdatatypeerror: "Enum Data type error Type must be In this",
      invalidemp: "Invalid Detail",
      enteremployeeid: "Please Enter Employee ID",
      whatsappsessiontimeout: "User Session Is Inactive For Last 24 hours You Can Only send Template message",
      varifysuccesfully: "OTP Verified Succesfully",
      invalididorotp: "Invalid EmployeeID or OTP",
      notverifyotp: "OTP not verified",
      employeelogout: "Employee Logout Succesfully",
      autodialeron: "Autodialer Status ON",
      autodialeroff: "Autodialer Status OFF",
      statuson: "Status On",
      statusoff: "Status Off",
      unauthorized: "Access to this portal is unauthorized",
      verified: "Verified Succesfully",
      notverified: "PIN Not Verified",
      statuscall: "On Call",
      statusidle: "IDLE",
      requirederror: "Please Fill all Required Field",
      employeedismiss: "The Lead Transfer Notification for this Employee has been Dismissed",
      invalidpassword: "Invalid Password",
      nodataupdate: "No Data Updated",
      nodatainsert: "Data not Inserted Successfuly",
      datapresent: "Already present in database",
      error: "Something went wrong",
      success: "Data found",
      failed: "No Data found",
      datadeleted: "Data deleted sucessfully",
      nodatadeleted: "Delete Opration failed"
    };
    return messages[message_type];
  } catch (error) {
    return error;
  }
};

// ! Pagination - Default page-1, size-10
module.exports.GetPagination = async (page, size) => {
  if (page == undefined || page == "") {
    page = 1;
  } else {
    page = parseInt(page);
  }
  if (size == undefined || size == "") {
    size = 10;
  } else {
    size = parseInt(size);
  }
  skip = size * (page - 1);
  limit = size;
  return { limit, skip };
};