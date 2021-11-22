export interface DataRadar {
  location:{
    latitude: number,
    longitude: number,
  },
  event:{
    typeEvent: number,
    description: string,
  },
  typeTransport: string,
}