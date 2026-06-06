const { verifyAccessToken } = require('../utils/tokenize');
const { AuthenticationError } = require('../exceptions');

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      throw new AuthenticationError('Missing or invalid authorization header');
    }

    const token = authHeader.split(' ')[1];
    const payload = verifyAccessToken(token);

    req.user = { id: payload.id };
    next();
  } catch (err) {
    if (err.name === 'AuthenticationError') {
      return next(err);
    }
    next(new AuthenticationError('Invalid or expired access token'));
  }
};

module.exports = authMiddleware;
