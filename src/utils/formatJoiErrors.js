const formatJoiErrors = (errors) => {
  const { details } = errors;
  const detailsArray = [];

  const detailsObject = {};

  if (details) {
    details.map((detail) => {
      const { message, path } = detail;

      if (!detailsObject[path]) {
        detailsObject[path] = message.replace(/"/gi, '');
      }

      return detailsArray.push({
        message: message.replace(/"/gi, ''),
        key: path[0],
      });
    });

    return { detailsArray, detailsObject };
  }
  return {
    detailsArray: errors.toString(),
    detailsObject: errors.toString(),
  };
};

export default formatJoiErrors;
