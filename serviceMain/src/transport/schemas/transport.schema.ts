import * as mongoose from 'mongoose';

export const TransportSchema = new mongoose.Schema({
  location:{
    latitude: Number,
    longitude: Number,
  },
  event:{
    typeEvent: Number,
    description: String,
  },
  typeTransport: String,
})