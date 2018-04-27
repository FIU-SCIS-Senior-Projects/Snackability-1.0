'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var ingredientJSON = require('./ingredients.json');
var scoring = function scoring(nutrients, ingredients, portion, processed) {

    var calories = nutrients.calories;
    var totalFat = nutrients.totalfat;
    var saturatedFat = nutrients.saturatedfat;
    var transFat = nutrients.transfat;
    var sodium = nutrients.sodium;
    var sugar = nutrients.sugar;

    var score = 0;

    var ingScore = processIngredients(ingredients);
    var calScore = processCalories(calories);
    var fatScore = processFat(totalFat, calories);
    var satScore = processSat(saturatedFat, calories);
    var tranScore = processTrans(transFat, calories);
    var sodiumScore = processSodium(sodium);
    var sugarScore = processSugar(sugar, portion);

    var processedScore = 0;
    console.log('this is the processed score' + processed);

    if (processed === 'not set') {
        console.log('1');
        processedScore = 0;
    } else if (processed === 'true') {
        processedScore = -1;
    } else if (processed === 'false') {
        processedScore = 1;
    } else if (processed != 'null' && processed) {
        console.log('4');
        processedScore = 0;
    }

    console.log('ingScore:' + ingScore + '\n                 calScore:' + calScore + '\n                 fatScore:' + fatScore + '\n                 satScore:' + satScore + '\n                 tranScore:' + tranScore + '\n                 sodiumScore:' + sodiumScore + '\n                 sugarScore:' + sugarScore + '\n                 processedScore:' + processedScore + '\n                ');
    score = ingScore + calScore + fatScore + satScore + tranScore + sodiumScore + sugarScore + processedScore;

    var feedback = processFeedBack(score);

    return { score: score, feedback: feedback };
};

var processIngredients = function processIngredients(ingredients) {

    var processFirstIngredient = function processFirstIngredient(ingredient) {
        //regex to break down to first ingredient and set to lower case 
        var regex = ingredient.replace(/\s+/g, '').toLowerCase();
        regex = regex.split(/[^A-Za-z]/);
        //we only want first ingredient 
        regex = regex[0];
        console.log(regex);
        //formating for comparison 

        console.log('formatted first ingredient: ' + regex);
        //grab the value from the json if exists
        if (ingredientJSON[regex]) {
            ingredient = ingredientJSON[regex];
        } else {
            ingredient = 'other';
        }
        switch (ingredient) {
            case 'dairy':
                return 2;
            case 'wholegrains':
                return 2;
            case 'vegtables':
                return 2;
            case 'fruits':
                return 2;
            case 'proteins':
                return 2;
            case 'other':
                return 0;
            case 'They are Secret!':
                return 0;
            default:
                return 0;
        }
    };

    switch (ingredients) {
        case 'dairy':
            return 2;
        case 'whole grain':
            return 2;
        case 'vegetable':
            return 2;
        case 'fruit':
            return 2;
        case 'protein':
            return 2;
        case 'other':
            return 0;
        case 'They are Secret!':
            return 0;
        default:
            var result = processFirstIngredient(ingredients);
            return result;
    }
};

var processCalories = function processCalories(calories) {
    var scoringFactor;
    switch (true) {
        case calories <= 50:
            scoringFactor = 2;
            return scoringFactor;
        case calories > 50 && calories <= 100:
            scoringFactor = 1.5;
            return scoringFactor;
        case calories > 100 && calories <= 150:
            scoringFactor = 1;
            return scoringFactor;

        case calories > 150 && calories <= 220:
            scoringFactor = .5;
            return scoringFactor;

        case calories > 220:
            scoringFactor = 0;
            return scoringFactor;
        default:
            return 0;

    }
};

//takes in fat calories. USDA provide fat grams must be converted to kcals!
var processFat = function processFat(totalFat, calories) {
    var percentOfCaloriesFromFat = totalFat / calories;

    var scoringFactor;

    switch (true) {
        case percentOfCaloriesFromFat <= .2:
            scoringFactor = 1;
            return scoringFactor;

        case percentOfCaloriesFromFat > .2 && percentOfCaloriesFromFat <= .35:
            scoringFactor = .5;
            return scoringFactor;

        default:
            return 0;
    }
};

//takes in fat calories. USDA provides #satfat grams must be converted to kcals!
var processSat = function processSat(satFat, calories) {
    var scoringFactor;
    console.log('calories:' + calories);
    console.log('satFat:' + satFat);
    var percentOfCaloriesFromFat = satFat * 9 / calories;
    console.log('\n percentOfCaloriesFromSatFat: ' + percentOfCaloriesFromFat + '\n');
    switch (true) {
        case percentOfCaloriesFromFat <= .05:
            scoringFactor = 1;
            return scoringFactor;
        case percentOfCaloriesFromFat > .05 && percentOfCaloriesFromFat <= .10:
            scoringFactor = .5;
            return scoringFactor;
        default:
            return 0;
    }
};

//takes in the transfat g and retrns relevant score depending on quantity 
var processTrans = function processTrans(tansFat) {
    console.log('tansFat:' + tansFat);
    var scoringFactor;
    if (tansFat === 0) {
        scoringFactor = 1;
        return scoringFactor;
    } else {
        scoringFactor = 0;
        return scoringFactor;
    }
};

var processSodium = function processSodium(sodium) {
    var scoringFactor;
    switch (true) {
        case sodium <= 140:
            scoringFactor = 1;
            return scoringFactor;
        case sodium > 140 && sodium <= 170:
            scoringFactor = 0.5;
            return scoringFactor;
        case sodium > 170 && sodium <= 200:
            scoringFactor = 0.25;
            return scoringFactor;
        default:
            scoringFactor = 0;
            return scoringFactor;
    }
};
var processSugar = function processSugar(sugar, portion) {
    var sugarByWeight = sugar / portion;
    var scoringFactor;

    switch (true) {
        case sugarByWeight < .15:
            scoringFactor = 2;
            return scoringFactor;
        case .15 >= sugarByWeight && sugarByWeight < .20:
            scoringFactor = 1.5;
            return scoringFactor;
        case sugarByWeight >= .20 && sugarByWeight < .25:
            scoringFactor = 1.0;
            return scoringFactor;
        case sugarByWeight >= .25 && sugarByWeight < .35:
            scoringFactor = .5;
            return scoringFactor;
        default:
            scoringFactor = 0;
            return scoringFactor;
    }
};

var processFeedBack = function processFeedBack(score) {
    var result = void 0;
    switch (true) {
        case score <= -2:
            result = '😭 ⚠️ WARNING!! ⚠️ This snack is extremely low in nutrients! Do not consume! ';
            return result;
        case score <= -1:
            result = '😨 This snack is not healthy at all. Ditch this snack';
            return result;
        case score > -1 && score < 6:
            result = '😩 This snack is not healthy, try choosing a healthier option.';
            return result;
        case score >= 6 && score < 8:
            result = '😏 This snack is somewhat healthy, but could be better.';
            return result;
        case score >= 8 && score < 10:
            result = '🙂 Good job! This snack is healthy!!';
            return result;
        default:
            result = '😄 PERFECT score! This snack is very healthy!!';
            return result;
    }
};

exports.default = scoring;
//# sourceMappingURL=scoringAlgorthim.js.map