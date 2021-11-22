import { Document } from "mongoose";

export class Transport extends Document{
  location:{
    latitude: number;
    longitude: number;
  };
  event:{
    typeEvent: number;
    description: string;
  };
  typeTransport: string;
}