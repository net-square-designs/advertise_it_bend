const setupTokenData = data => ({
  email: data.email,
  phone: data.phone,
  id: data.id,
  uniqueId: data.uniqueId,
  accountType: data.accountType,
  secretKey: data.secretKey,
  Profile: data.Profile,
});

export default setupTokenData;
