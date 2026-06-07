const AuthenticationsService = require("../services/authentications");

const AuthenticationsController = {
  async login(req, res, next) {
    try {
      const { accessToken, refreshToken } = await AuthenticationsService.login(
        req.body,
      );
      res.json({
        status: "success",
        data: {
          accessToken,
          refreshToken,
        },
      });
    } catch (err) {
      next(err);
    }
  },

  async refresh(req, res, next) {
    try {
      const { accessToken } = await AuthenticationsService.refresh({
        refreshToken: req.body.refresh_token,
      });
      res.json({
        status: "success",
        data: {
          accessToken,
        },
      });
    } catch (err) {
      next(err);
    }
  },

  async logout(req, res, next) {
    try {
      await AuthenticationsService.logout({
        refreshToken: req.body.refresh_token,
      });
      res.json({
        status: "success",
        message: "Logout success",
      });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = AuthenticationsController;
