const bcrypt = require('bcrypt');
const UsersRepository = require('../repositories/users');
const AuthenticationsRepository = require('../repositories/authentications');
const { generateAccessToken, generateRefreshToken, verifyRefreshToken } = require('../utils/tokenize');
const { AuthenticationError, ClientError } = require('../exceptions');

const AuthenticationsService = {
  async login({ email, password }) {
    const user = await UsersRepository.findByEmail(email);
    if (!user) {
      throw new AuthenticationError('Invalid email or password');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new AuthenticationError('Invalid email or password');
    }

    const accessToken = generateAccessToken({ id: user.id });
    const refreshToken = generateRefreshToken({ id: user.id });

    await AuthenticationsRepository.add(refreshToken);

    return {
      accessToken,
      refreshToken,
    };
  },

  async refresh({ refreshToken }) {
    const storedToken = await AuthenticationsRepository.find(refreshToken);
    if (!storedToken) {
      throw new ClientError('Refresh token not found');
    }

    let payload;
    try {
      payload = verifyRefreshToken(refreshToken);
    } catch {
      throw new ClientError('Invalid refresh token');
    }

    const accessToken = generateAccessToken({ id: payload.id });
    return { accessToken };
  },

  async logout({ refreshToken }) {
    const storedToken = await AuthenticationsRepository.find(refreshToken);
    if (!storedToken) {
      throw new ClientError('Refresh token not found');
    }

    await AuthenticationsRepository.delete(refreshToken);
  },
};

module.exports = AuthenticationsService;
