'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.baseSearch = baseSearch;
exports.snackSearchNdbno = snackSearchNdbno;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _key = require('../config/key.js');

var _key2 = _interopRequireDefault(_key);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var api_key = _key2.default.key;

function baseSearch(snack) {
    return new Promise(function (resolve, reject) {

        //first targets branded food products
        var SEARCH_URL = 'https://api.nal.usda.gov/ndb/search/?format=json&DS=SR&q=' + snack + '&sort=n&max=10&offset=0&api_key=' + api_key;
        //targets the standard reffernce api
        var SEARCH_URL_SR = 'https://api.nal.usda.gov/ndb/search/?format=json&ds=Standard%20Reference&q=' + snack + '&max=5&offset=0&api_key=' + api_key;

        if (!snack) {
            reject();
        }

        _axios2.default.get(SEARCH_URL).then(function (response) {
            var data = response.data.list.item;
            _axios2.default.get(SEARCH_URL_SR).then(function (response2) {
                if (response2.data.list) {
                    var final_data = response2.data.list.item.concat(data);
                    console.log(final_data);
                    resolve(final_data);
                }
                resolve(data);
            }).catch(function (err) {
                reject(err);
            });
        }).catch(function (err) {
            reject(err);
        });
    });
}

function snackSearchNdbno(ndbno) {

    return new Promise(function (resolve, reject) {

        var key = 'uzjbjZNFbAkQCtmitGtNGO7xR2O5or032fyxUMzF';
        var url2 = 'https://api.nal.usda.gov/ndb/V2/reports?ndbno=' + ndbno + '&type=b&format=JSON&api_key=' + api_key;

        var nutriSearch = function nutriSearch(nutrients, nutrient) {
            for (var x = 0; x < nutrients.length; x++) {
                if (nutrients[x].name == nutrient) {
                    return nutrients[x].measures[0].value;
                }
            }
        };
        function getGrams(nutrients) {
            return nutrients[0].measures[0].eqv;
        }

        if (!ndbno) {
            reject('too small');
        }

        _axios2.default.get(url2).then(function (response2) {

            var nutrients = response2.data.foods[0].food.nutrients;

            if (response2.data.foods[0].food.ing) {
                var ingredients = response2.data.foods[0].food.ing.desc;
            } else {
                var ingredients = 'They are Secret!';
            }

            var food = {
                ingredients: ingredients,
                calories: nutriSearch(nutrients, 'Energy'),
                sodium: nutriSearch(nutrients, 'Sodium, Na'),
                totalFat: nutriSearch(nutrients, 'Total lipid (fat)'),
                transFat: nutriSearch(nutrients, 'Fatty acids, total trans'),
                saturatedFat: nutriSearch(nutrients, 'Fatty acids, total saturated'),
                sugar: nutriSearch(nutrients, 'Sugars, total'),
                cholesterol: nutriSearch(nutrients, 'Cholesterol'),
                protein: nutriSearch(nutrients, 'Protein'),
                fiber: nutriSearch(nutrients, 'Fiber, total dietary'),
                carbs: nutriSearch(nutrients, 'Carbohydrate, by difference'),
                portion: getGrams(nutrients),
                name: response2.data.foods[0].food.desc.name
            };
            resolve(food);
        }).catch(function (err) {
            return reject(err);
        });
    });
}
//# sourceMappingURL=searchHelpers.js.map