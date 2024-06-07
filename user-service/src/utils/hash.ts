import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);

export = {
  hashString: (password: string): string => {
    return bcrypt.hashSync(password, salt);
  },
  compareHash : (inputPassword: string, passwordFromDb: string ): boolean =>{
    return bcrypt.compareSync(inputPassword,passwordFromDb)
  }
};
