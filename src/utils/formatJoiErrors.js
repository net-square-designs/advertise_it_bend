const formatJoiErrors = (errors) => {
  const { details } = errors;
  const detailsArray = [];

  details.map((detail) => {
    const { message, path } = detail;

    return detailsArray.push({
      message: message.replace(/"/gi, ''),
      key: path[0],
    });
  });

  return { details: detailsArray };
};

export default formatJoiErrors;
