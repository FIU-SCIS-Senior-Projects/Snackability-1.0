'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _snackController = require('../../controllers/snackController');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();


router.get('/search', _snackController.simpleSearch);
router.get('/local', _snackController.localRender);
router.get('/usda', _snackController.usdaRender);

exports.default = router;
//# sourceMappingURL=snack.js.map