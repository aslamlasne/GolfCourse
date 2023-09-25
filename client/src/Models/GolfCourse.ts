import { Hole } from "./Hole";

export class GolfCourse {
  public id: number | null;
  public name:string;
  public address:string;
  public zip:string;
  public holes:Hole[] | null = null;

  constructor() {
    this.id = null;
    this.name = '';
    this.address = '';
    this.zip = '';
    this.holes = null;
  }
}

