'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _snack = require('./snack');

var _snack2 = _interopRequireDefault(_snack);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

// import userRoutes from'./snack';
// import adminRoutes from'./admin';

router.use("/snack", _snack2.default);
// router.use("/user", userRoutes);
// router.use("/admin", adminRoutes);

exports.default = router;
//# sourceMappingURL=index.js.map