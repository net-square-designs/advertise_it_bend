const getPayload = (req) => {
  const data = {};
  Object.keys(req.body).map((key) => {
    data[key] = req.body[key].trim();
    return data;
  });
  return data;
};

export { getPayload };
