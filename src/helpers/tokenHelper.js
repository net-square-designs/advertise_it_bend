import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const setupTokenData = data => ({
  email: data.email,
  phone: data.phone,
  id: data.id,
  uniqueId: data.uniqueId,
  accountType: data.accountType,
  secretKey: data.secretKey,
  Profile: data.Profile,
});

/**
 *
 * @param {string} token
 * @returns {*} decodedToken
 */
const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
};

export { setupTokenData, verifyToken };
