import bcrypt from 'bcryptjs';

/**
 * This method hashes a string given the string and an optional salt
 * @param {string} password - The password to hash
 * @param {number?} [saltLength=10] - the salt length: defaults to 10
 *
 * @returns {string} Returns the hashedPassword
 */
const hashPassword = (password, saltLength = 10) => {
  const salt = bcrypt.genSaltSync(saltLength);
  return bcrypt.hashSync(password, salt);
};

/**
 * @param {string} sentPassword - The password sent in the req
 * @param {string} dbPassword - The password from db to compare against
 *
 * @returns {boolean} Returns one of [true/false]
 */
const comparePassword = (sentPassword, dbPassword) => bcrypt.compareSync(sentPassword, dbPassword);

export { hashPassword, comparePassword };
