import shortId from 'shortid';
/**
 * This method generates a random string as a reference number
 * @returns {string} random string
 */
const generateUniqueId = () => shortId.generate();

export default generateUniqueId;
