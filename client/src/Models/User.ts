export class User {
  public id: number | null;
  public email: string;
  public password: string;
  public name:string;
  public username:string;
  public gender:string;
  public date_of_birth:string;
  public handicap: number | null;
  public calculated_on: string | null;

  constructor() {
    this.id = null;
    this.email = '';
    this.password = '';
    this.name = '';
    this.gender = '';
    this.username = '';
    this.date_of_birth = '';
    this.handicap = null;
    this.calculated_on = null;
  }
}

