var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  verifyAdmin: () => verifyAdmin,
  verifyUser: () => verifyUser
});
module.exports = __toCommonJS(src_exports);

// src/verifyAdmin.ts
var import_jsonwebtoken = require("jsonwebtoken");
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
    const decoded = (0, import_jsonwebtoken.verify)(adminToken, secret);
    if (!(decoded == null ? void 0 : decoded.role) || decoded.role != "wenet-admin") {
      return res.status(401).send("Invalid admin JWT");
    }
    next();
  } catch (err) {
    return res.status(401).send("Invalid admin JWT");
  }
}

// src/verifyUser.ts
var import_jsonwebtoken2 = require("jsonwebtoken");
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
    const decoded = (0, import_jsonwebtoken2.verify)(userToken, secret);
    req.user = decoded == null ? void 0 : decoded.userData;
    if (!(decoded == null ? void 0 : decoded.role) || decoded.role != "wenet-user") {
      return res.status(401).send("Invalid JWT");
    }
    next();
  } catch (err) {
    return res.status(401).send("Invalid JWT");
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  verifyAdmin,
  verifyUser
});
//# sourceMappingURL=index.js.map