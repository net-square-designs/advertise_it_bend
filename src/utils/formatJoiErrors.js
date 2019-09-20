const formatJoiErrors = (errors) => {
  const { details } = errors;
  const detailsArray = [];

  if (details) {
    details.map((detail) => {
      const { message, path } = detail;

      return detailsArray.push({
        message: message.replace(/"/gi, ''),
        key: path[0],
      });
    });

    return { details: detailsArray };
  }
  return { details: errors.toString() };
};

export default formatJoiErrors;
