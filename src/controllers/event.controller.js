import mongoose from "mongoose";
import { Event } from "../models/event.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// controller for handling event related tasks
// includes creating, updating, deleting, and fetching events

const createEvent = asyncHandler(async (req, res) => {
    const { eventName, startDate, endDate, startTime, venue, fee, description, poster} = req.body;

    const club = await Admin.findById(req.user.adminId);

    if(!club){
        throw new ApiError(400, "club not found");
    }

    if(!eventName || !startDate || !endDate || !startTime || !venue || !fee || !description){
        throw new ApiError(400, "all fields are required");
    }

    const event = await Event.create({
        eventName,
        clubName: club.clubName,
        description,
        startDate,
        endDate,
        startTime,
        venue,
        fee,
        poster: {
            public_id: poster?.public_id,
            url: poster?.url,
        }
    })

    if(!event){
        throw new ApiError(500, "something went wrong while creating the event");
    }

    return res
    .status(201)
    .json(new ApiResponse(200, event, "event created successfully"));
})

const updateEvent = asyncHandler(async (req, res) =>{
    const { eventId } = req.params;

    const event = await Event.findById(eventId);
    if(!event){
        throw new ApiError(400, "event not found");
    }

    const { eventName, startDate, endDate, startTime, venue, fee, description, poster} = req.body;

    if(eventName) event.eventName = eventName;
    if(startDate) event.startDate = startDate;
    if(endDate) event.endDate = endDate;
    if(startTime) event.startTime = startTime;
    if(venue) event.venue = venue;
    if(fee) event.fee = fee;
    if(description) event.description = description;
    if(poster) event.poster = poster;

    await event.save();

    return res
    .status(200)
    .json(new ApiResponse(200, event, "event updated successfully"));
    
})

export {
    createEvent, 
    updateEvent,
};