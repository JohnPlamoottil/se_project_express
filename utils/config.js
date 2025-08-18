const { JWT_SECRET = "dev-jj", NODE_ENV } = process.env;

module.exports = {
  JWT_SECRET,
  NODE_ENV,
};
