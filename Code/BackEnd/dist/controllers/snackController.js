'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.simpleSearch = simpleSearch;
exports.localRender = localRender;
exports.usdaRender = usdaRender;

var _dbConfig = require('../config/dbConfig');

var _dbConfig2 = _interopRequireDefault(_dbConfig);

var _metaphone = require('metaphone');

var _metaphone2 = _interopRequireDefault(_metaphone);

var _scoringAlgorthim = require('../helpers/scoringAlgorthim');

var _scoringAlgorthim2 = _interopRequireDefault(_scoringAlgorthim);

var _conversion = require('../helpers/conversion');

var _conversion2 = _interopRequireDefault(_conversion);

var _searchHelpers = require('../helpers/searchHelpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function simpleSearch(req, res) {
    //leverging template string to prepare input for query
    var item = req.query.snack.toLowerCase();
    var portion = req.query.portion ? req.query.portion : false;
    var processed = req.query.processed ? req.query.processed : null;
    var units = req.query.units ? req.query.units : false;

    //extra search params
    var extras = {
        portion: portion,
        processed: processed,
        units: units
    };
    console.log(extras);

    //metaphone is used for phonetic search
    var advancedItem = '%' + (0, _metaphone2.default)(item) + '%';
    if (item) {
        _dbConfig2.default.execute("SELECT * FROM snack WHERE  product_search LIKE ? OR brand_name_search LIKE ? OR short_name_search LIKE ?;", [advancedItem, advancedItem, advancedItem], function (err, results, fields) {
            console.log(err);
            if (results) {
                //number of results from DB we want the top 10
                var size = results.length >= 10 ? 10 : results.length;
                results = results.slice(0, size);
            }

            (0, _searchHelpers.baseSearch)(item).then(function (resolute) {
                if (resolute) {
                    if (results && resolute) {
                        //add local + usda json if both avilable
                        var final_results = resolute.slice(0, 5).concat(results.slice(0, 5)).concat(resolute.slice(5, resolute.length).concat(results.slice(5, results.length)));
                        //adding the extra params 
                        final_results = final_results.map(function (element) {
                            var update = _extends({}, extras, element);
                            return update;
                        });
                    } else {
                        final_results = final_results.map(function (element) {
                            var update = _extends({}, extras, element);
                            return update;
                        });
                    }
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    return res.send(final_results);
                } else {
                    var _final_results = results.map(function (element) {
                        var update = _extends({}, extras, element);
                        return update;
                    });
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    return res.send(_final_results);
                }
            }).catch(function (err) {
                console.log(err);
                results = results.concat(extras);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                return res.send(results);
            });
        });
    } else {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'text/plain');
        res.end('nothing found');
    }
}

function precisionRound(number, precision) {
    var factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
}

function localRender(req, res) {
    var item = req.query.id;
    var itemPortion = req.query.portion;
    var units = req.query.units;

    if (units != 'false' && itemPortion != 'false') {
        var newPortion = (0, _conversion2.default)(units, itemPortion);
    }

    _dbConfig2.default.execute("SELECT * FROM snack WHERE id = ?", [item], function (err, result, fields) {
        //reult is an array we only want first instance
        result = result[0];
        if (result) {
            var nutrients = {
                calories: result.calories,
                totalfat: result.calories_fat,
                saturatedfat: result.saturated_fat,
                transfat: result.trans_fat,
                sodium: result.sodium,
                sugar: result.sugar
            };
            if (newPortion) {
                console.log(newPortion);
                var factor = newPortion / result.seving_size;

                //icremenr nutrients by factor
                Object.keys(nutrients).forEach(function (key) {
                    nutrients[key] *= factor;
                    nutrients[key] = precisionRound(nutrients[key], 1);
                });

                //update result
                result.calories = nutrients.calories;
                result.calories_fat = nutrients.totalfat;
                result.saturated_fat = nutrients.saturatedfat;
                result.trans_fat = nutrients.transfat;
                result.sodium = nutrients.sodium;
                result.sugar = nutrients.sugar;
                result.seving_size = precisionRound(newPortion, 1);
            }
            var score = (0, _scoringAlgorthim2.default)(nutrients, result.first_ingredient, result.seving_size, result.processed);
            res.statusCode = 200;

            //merges both the score and db result
            var final = Object.assign(result, score);
            res.setHeader('Content-Type', 'application/json');
            return res.send(final);
        }
        res.send('no results');
    });
}

function usdaRender(req, res) {
    var item = req.query.ndbno;
    var itemPortion = req.query.portion;
    var units = req.query.units;
    var processed = req.query.processed;

    console.log(itemPortion);
    console.log(units);

    if (units != 'false' && itemPortion != 'false') {
        var newPortion = (0, _conversion2.default)(units, itemPortion);
    }
    console.log('New Portion' + newPortion);
    (0, _searchHelpers.snackSearchNdbno)(item).then(function (result) {
        console.log(result);
        if (result) {
            var nutrients = {
                calories: result.calories,
                //converted to calories from fat
                totalfat: result.totalFat * 9,
                saturatedfat: result.saturatedFat,
                transfat: result.transFat,
                sodium: result.sodium,
                sugar: result.sugar,
                cholesterol: result.cholesterol,
                protein: result.protein,
                fiber: result.fiber,
                carbs: result.carbs
            };

            if (newPortion) {

                var factor = newPortion / result.portion;

                result.portion = precisionRound(newPortion, 1);
                console.log('factor' + factor);
                //icremenr nutrients by factor
                Object.keys(nutrients).forEach(function (key) {
                    nutrients[key] *= factor;
                    nutrients[key] = precisionRound(nutrients[key], 1);
                });
                //update result
                result.calories = nutrients.calories;
                result.totalFat = nutrients.totalfat;
                result.saturatedFat = nutrients.saturatedfat;
                result.transFat = nutrients.transfat;
                result.sodium = nutrients.sodium;
                result.sugar = nutrients.sugar;
                result.cholesterol = nutrients.cholesterol;
                result.protein = nutrients.protein;
                result.fiber = nutrients.fiber;
                result.carbs = nutrients.carbs;
                result.portion = newPortion;
            }

            // const firstIngredient=ingredients;
            var score = (0, _scoringAlgorthim2.default)(nutrients, result.ingredients, result.portion, processed);

            res.statusCode = 200;
            //merges both the score and api result
            var final = Object.assign(result, score);
            res.setHeader('Content-Type', 'application/json');
            return res.send(final);
        }
        res.send('no results');
    });
}
//# sourceMappingURL=snackController.js.map