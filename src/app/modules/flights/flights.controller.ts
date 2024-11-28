import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { flightServices } from "./flights.services";

const createFlight = catchAsync(async (req, res) => {
    const result = await flightServices.createFlightIntoDB(req.body);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Flight created successfully',
      data: result
    });
  });


  const getAllAvailableFlight = catchAsync(async (req, res) => {
    const result = await flightServices.getAllAvailableFlightFromDB()
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Available Flights Retrieve successfully',
      data: result,
    });
  });

  //get flights by searching method
  const getFlightsBySearch = catchAsync(async (req, res) => {
    const result = await flightServices.getFlightsBySearching(req.query)
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Available Flights Retrieve successfully',
      data: result,
    });
  });

  //find flight by id
  const getSingleFlight = catchAsync(async (req, res) => {
    const result = await flightServices.getFlightById(req.params.id)
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'single flight retrieve successfully',
      data: result,
    });
  });


  
const flightUpdate = catchAsync(async (req, res) => {
    const result = await flightServices.updateFlightByAdmin(req.params.id, req.body);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Flight updated successfully',
      data: result,
    });
  });
  
  const flightDelete = catchAsync(async (req, res) => {
    const result = await flightServices.deleteFlightByAdmin(req.params.id);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Flight deleted successfully',
      data: result,
    });
  });
  

  export const flightController={
    createFlight,
    flightDelete,
    flightUpdate,
    getAllAvailableFlight,
    getFlightsBySearch,
    getSingleFlight
  }