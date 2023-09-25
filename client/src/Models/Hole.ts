export class Hole {
  public id: number | null;
  public course_id: number | null;
  public hole_number: number;
  public hole_index: number;
  public distance_to_hole: number;
  public par_strokes: number;

  constructor() {
    this.id = null;
    this.course_id = null;
    this.hole_number = 0;
    this.hole_index = 0;
    this.distance_to_hole = 0.00;
    this.par_strokes = 0;
  }
}

