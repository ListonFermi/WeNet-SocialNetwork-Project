import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);

export = {
  hashPassword: (password: string): string => {
    return bcrypt.hashSync(password, salt);
  },
  comparePassword : (inputPassword: string, passwordFromDb: string ): boolean =>{
    return bcrypt.compareSync(inputPassword,passwordFromDb)
  }
};
