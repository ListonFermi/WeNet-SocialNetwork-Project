// src/verifyAdmin.ts
import { verify } from "jsonwebtoken";
function verifyAdmin(req, res, next) {
  var _a;
  const adminToken = (_a = req.cookies) == null ? void 0 : _a.adminToken;
  if (!adminToken) {
    return res.status(401).send("Admin JWT not found in the cookies");
  }
  const secret = process.env.JWT_SECRET || "";
  if (!secret) {
    return res.status(500).send("JWT secret not found in the env");
  }
  try {
    const decoded = verify(adminToken, secret);
    if (!(decoded == null ? void 0 : decoded.role) || decoded.role != "wenet-admin") {
      return res.status(401).send("Invalid admin JWT");
    }
    next();
  } catch (err) {
    return res.status(401).send("Invalid admin JWT");
  }
}

// src/verifyUser.ts
import { verify as verify2 } from "jsonwebtoken";
function verifyUser(req, res, next) {
  var _a;
  const userToken = (_a = req.cookies) == null ? void 0 : _a.token;
  if (!userToken) {
    return res.status(401).send("JWT not found in the cookies");
  }
  const secret = process.env.JWT_SECRET || "";
  if (!secret) {
    return res.status(500).json("JWT secret not found in the env");
  }
  try {
    const decoded = verify2(userToken, secret);
    req.user = decoded == null ? void 0 : decoded.userData;
    if (!(decoded == null ? void 0 : decoded.role) || decoded.role != "wenet-user") {
      return res.status(401).send("Invalid JWT");
    }
    next();
  } catch (err) {
    return res.status(401).send("Invalid JWT");
  }
}
export {
  verifyAdmin,
  verifyUser
};
//# sourceMappingURL=index.mjs.map