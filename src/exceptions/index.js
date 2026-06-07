const { Client } = require("pg");

class ClientError extends Error {
  constructor(message, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
    this.name = "ClientError";
  }
}

class AuthenticationError extends ClientError {
  constructor(message) {
    super(message, 401);
    this.name = "AuthenticationError";
  }
}

class AuthorizationError extends ClientError {
  constructor(message) {
    super(message, 403);
    this.name = "AuthorizationError";
  }
}

class NotFoundError extends ClientError {
  constructor(message) {
    super(message, 404);
    this.name = "NotFoundError";
  }
}

class ConflictError extends ClientError {
  constructor(message) {
    super(message, 201);
    this.name = "ConflictError";
  }
}

module.exports = {
  ClientError,
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
  ConflictError,
};
