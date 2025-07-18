import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const eventSchema = new Schema({
    eventName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 100,
    },

    clubName: {
        type: Schema.Types.ObjectId,
        ref: "Admin",
        required: true,
    },
    poster: {
        type: Object,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
        maxLength: 500,
    },
    startDate:{
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    startTime: {
        type: String,
        required: true,
    },
    venue: {
        type: String,
        required: true,
        trim: true,
    },
    fee: {
        type: Number,
        required: true,
        min: 0,
    },
},{
    timestamps: true,
})

eventSchema.plugin(mongooseAggregatePaginate);

export const Event = mongoose.model("Event", eventSchema);