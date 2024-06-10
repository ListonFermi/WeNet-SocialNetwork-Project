export interface IAdmin {
  _id?: string;
  username: string;
  password: string;
}

export interface IGoogleCredentialRes{
  credential: string;
  clientId: string;
  select_by : string
}