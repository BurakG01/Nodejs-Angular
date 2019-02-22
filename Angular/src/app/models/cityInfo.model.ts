
import {Location} from "./location.model";
export class City  {
   
    id: number;
    name: string;
    location?: Location;
   
    constructor(cityResponse:any){
    this.id=cityResponse._id;
    this.name=cityResponse.name;
    this.location=cityResponse.geolocation
    }
  }
