import db from '../config/dbConfig';
import metaphone from 'metaphone';
import scoring from '../helpers/scoringAlgorthim';
import conversion from '../helpers/conversion';
import { baseSearch, snackSearchNdbno } from '../helpers/searchHelpers';

export function simpleSearch(req, res) {
    //leverging template string to prepare input for query
    const item = (req.query.snack).toLowerCase();
    const portion = req.query.portion ? req.query.portion : false;
    const processed = req.query.processed ? req.query.processed : null;
    const units = req.query.units ? req.query.units : false;

    //extra search params
    var extras = {
        portion,
        processed,
        units
    }
    console.log(extras)

    //metaphone is used for phonetic search
    const advancedItem = `%${metaphone(item)}%`;
    if (item) {
        db.execute(
            "SELECT * FROM snack WHERE  product_search LIKE ? OR brand_name_search LIKE ? OR short_name_search LIKE ?;",
            [advancedItem, advancedItem, advancedItem],
            function (err, results, fields) {
                console.log(err)
                if (results) {
                    //number of results from DB we want the top 10
                    const size = (results.length >= 10) ? 10 : results.length;
                    results = results.slice(0, size);
                }

                baseSearch(item).then((resolute) => {
                    if (resolute) {
                        if (results && resolute) {
                            //add local + usda json if both avilable
                            var final_results = (resolute.slice(0, 5).concat(results.slice(0, 5)))
                                .concat(resolute.slice(5, resolute.length).concat(results.slice(5, results.length)));
                            //adding the extra params 
                            final_results = final_results.map(function (element) {
                                let update = { ...extras, ...element }
                                return update
                            });
                        }
                        else {
                            final_results = final_results.map(function (element) {
                                let update = { ...extras, ...element }
                                return update
                            });
                        }
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        return res.send(final_results);
                    }
                    else {
                        let final_results = results.map(function (element) {
                            let update = { ...extras, ...element }
                            return update
                        });
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        return res.send(final_results);
                    }

                }).catch((err) => {
                    console.log(err);
                    results = results.concat(extras)
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    return res.send(results);
                })
            }
        );
    }
    else {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'text/plain');
        res.end('nothing found');
    }

}

function precisionRound(number, precision) {
    var factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
}

export function localRender(req, res) {
    const item = req.query.id;
    const itemPortion = req.query.portion;
    const units = req.query.units;

    if (units != 'false' && itemPortion != 'false') {
        var newPortion = conversion(units, itemPortion)
    }

    db.execute(
        "SELECT * FROM snack WHERE id = ?",
        [item],
        function (err, result, fields) {
            //reult is an array we only want first instance
            result = result[0];
            if (result) {
                var nutrients =
                    {
                        calories: result.calories,
                        totalfat: result.calories_fat,
                        saturatedfat: result.saturated_fat,
                        transfat: result.trans_fat,
                        sodium: result.sodium,
                        sugar: result.sugar
                    }
                if (newPortion) {
                    console.log(newPortion)
                    var factor = newPortion / result.seving_size;

                    //icremenr nutrients by factor
                    Object.keys(nutrients).forEach(function (key) {
                        nutrients[key] *= factor;
                        nutrients[key] = precisionRound(nutrients[key], 1)
                    });

                    //update result
                    result.calories = nutrients.calories
                    result.calories_fat = nutrients.totalfat
                    result.saturated_fat = nutrients.saturatedfat
                    result.trans_fat = nutrients.transfat
                    result.sodium = nutrients.sodium
                    result.sugar = nutrients.sugar
                    result.seving_size = precisionRound(newPortion, 1);

                }
                const score = scoring(nutrients, result.first_ingredient, result.seving_size, result.processed);
                res.statusCode = 200;

                //merges both the score and db result
                const final = Object.assign(result, score);
                res.setHeader('Content-Type', 'application/json');
                return res.send(final);
            }
            res.send('no results');

        }

    );

}


export function usdaRender(req, res) {
    const item = req.query.ndbno;
    const itemPortion = req.query.portion;
    const units = req.query.units;
    const processed = req.query.processed;

    console.log(itemPortion)
    console.log(units)

    if (units != 'false' && itemPortion != 'false') {
        var newPortion = conversion(units, itemPortion)
    }
    console.log('New Portion' + newPortion)
    snackSearchNdbno(item).then((result) => {
        console.log(result)
        if (result) {
            var nutrients =
                {
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
                    carbs: result.carbs,
                }

            if (newPortion) {

                var factor = newPortion / result.portion;

                result.portion = precisionRound(newPortion, 1);
                console.log('factor' + factor)
                //icremenr nutrients by factor
                Object.keys(nutrients).forEach(function (key) {
                    nutrients[key] *= factor;
                    nutrients[key] = precisionRound(nutrients[key], 1)
                });
                //update result
                result.calories = nutrients.calories
                result.totalFat = nutrients.totalfat
                result.saturatedFat = nutrients.saturatedfat
                result.transFat = nutrients.transfat
                result.sodium = nutrients.sodium
                result.sugar = nutrients.sugar
                result.cholesterol = nutrients.cholesterol
                result.protein = nutrients.protein
                result.fiber = nutrients.fiber
                result.carbs = nutrients.carbs
                result.portion = newPortion;
            }

            // const firstIngredient=ingredients;
            const score = scoring(nutrients, result.ingredients, result.portion, processed);

            res.statusCode = 200;
            //merges both the score and api result
            const final = Object.assign(result, score);
            res.setHeader('Content-Type', 'application/json');
            return res.send(final);
        }
        res.send('no results');

    })




}


