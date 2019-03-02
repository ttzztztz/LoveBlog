import crypto from "crypto";
import jwt from "jsonwebtoken";
import { SECRET } from "./consts";
import { IJWTContent } from "../typings";

export const addSaltPasswordOnce = function(pwd_MD5: string) {
    return crypto
        .createHash("md5")
        .update(pwd_MD5 + SECRET)
        .digest("hex");
};

export const signJWT = function(uid: string, username: string, role: string) {
    return jwt.sign(
        {
            uid: uid,
            username: username,
            role: role
        } as IJWTContent,
        SECRET,
        {
            expiresIn: 86400
        }
    );
};

export const verifyJWT = function(token?: string) {
    if (!token) {
        throw new Error("No token provided");
    }
    if (token.indexOf("Bearer ") === 0) {
        token = token.replace("Bearer ", "");
    }
    return jwt.verify(token, SECRET) as IJWTContent;
};
