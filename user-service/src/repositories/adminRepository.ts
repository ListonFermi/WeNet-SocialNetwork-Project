import jwt from "jsonwebtoken";

export = {
  verifyLogin: async (username: string, password: string): Promise<string> => {
    try {
      const adminUsername = process.env.ADMIN_USERNAME;
      const adminPassword = process.env.ADMIN_PASSWORD;
      if (!adminUsername || !adminPassword) throw new Error("ENV issues");
        console.log({adminUsername,adminPassword,username,password})
      const isMatching =
        username === adminUsername && password === adminPassword;
      if (!isMatching) throw new Error("Credentials doesn't match");
      return adminUsername;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  generateJWT: async (adminUsername: string): Promise<string> => {
    try {
      const secret: string | undefined = process.env.JWT_SECRET;
      if (!secret) throw new Error("JWT Secret not found");
      return jwt.sign({ adminUsername }, secret, { expiresIn: "1h" });
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
};
