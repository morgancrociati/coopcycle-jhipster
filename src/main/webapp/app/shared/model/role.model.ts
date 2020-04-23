import { ICompte } from 'app/shared/model/compte.model';
import { Roles } from 'app/shared/model/enumerations/roles.model';

export interface IRole {
  id?: number;
  role?: Roles;
  numComptes?: ICompte[];
}

export class Role implements IRole {
  constructor(public id?: number, public role?: Roles, public numComptes?: ICompte[]) {}
}
