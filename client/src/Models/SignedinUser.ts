import { User } from "./User";

export class SignedinUser {
  public user: User | null;
  public authenticated:boolean;
  public JWT_TOKEN: string;
  constructor() {
    this.user = null;
    this.authenticated = false;
    this.JWT_TOKEN = '';
  }
}

