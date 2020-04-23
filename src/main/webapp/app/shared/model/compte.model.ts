import { ICooperative } from 'app/shared/model/cooperative.model';
import { IRole } from 'app/shared/model/role.model';

export interface ICompte {
  id?: number;
  pseudo?: string;
  email?: string;
  motDePasse?: string;
  adminsys?: ICooperative[];
  admincoops?: ICooperative[];
  roles?: IRole[];
}

export class Compte implements ICompte {
  constructor(
    public id?: number,
    public pseudo?: string,
    public email?: string,
    public motDePasse?: string,
    public adminsys?: ICooperative[],
    public admincoops?: ICooperative[],
    public roles?: IRole[]
  ) {}
}
