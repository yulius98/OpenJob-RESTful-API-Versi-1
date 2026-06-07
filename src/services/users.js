const { nanoid } = require('nanoid');
const bcrypt = require('bcrypt');
const UsersRepository = require("../repositories/users");
const { NotFoundError, ClientError } = require("../exceptions");

const UsersService = {
  async register({ name, email, password, role = 'user' }) {
    const existingEmail = await UsersRepository.findByEmail(email);
    if (existingEmail) {
      throw new ClientError('Email already registered')
    }

    
    const id = `user-${nanoid(16)}`;
    const hashedPassword = await bcrypt.hash(password, 10);

    return UsersRepository.create({
      id,
      name,
      email,
      password: hashedPassword,
      role,
    });
  },

  async getById(id) {
    const user = await UsersRepository.findById(id);
    if (!user) {
      throw new NotFoundError('User not found');
    }
    return user;
  },
};

module.exports = UsersService;
