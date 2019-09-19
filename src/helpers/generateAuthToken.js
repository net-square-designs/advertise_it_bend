import jwt from 'jsonwebtoken';

/**
 * @typedef {{ firstname: string}} Profile
 * @typedef {{
   id: string, uniqueId: string, email: string, fullname: string
   phone: string, level: string, secretKey:string
  }} UserData
 *
 * @typedef {{
   id: string, uniqueId: string, email: string,
   phone: string, level: string, secretKey:string
   Profile: Profile
  }} AdminData
 */

/**
 * @description Method to generate a token
 * @param {AdminData} Data data used to generate the token
 *
 * @returns {string} Returns the generated token
 */
const generateUserAuthToken = ({
  id,
  uniqueId,
  email,
  Profile: { firstname },
  phone,
  level,
  secretKey,
}) => {
  try {
    return jwt.sign(
      {
        id,
        uniqueId,
        firstname,
        email,
        phone,
        level,
        secretKey,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '10d',
      },
    );
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * @description Method to generate a token
 * @param {UserData} Data data used to generate the token
 *
 * @returns {string} Returns the generated token
 */
const generateAdminAuthToken = ({
  id,
  uniqueId,
  fullname,
  phone,
  email,
  level,
  secretKey,
}) => {
  try {
    return jwt.sign(
      {
        id,
        uniqueId,
        fullname,
        phone,
        email,
        level,
        secretKey,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '10d',
      },
    );
  } catch (error) {
    throw new Error(error);
  }
};

export { generateUserAuthToken, generateAdminAuthToken };
