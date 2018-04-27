var ingredientJSON = require('./ingredients.json');
const scoring = (nutrients, ingredients, portion, processed) => {

    const calories = nutrients.calories;
    const totalFat = nutrients.totalfat;
    const saturatedFat = nutrients.saturatedfat;
    const transFat = nutrients.transfat;
    const sodium = nutrients.sodium;
    const sugar = nutrients.sugar;

    let score = 0;

    const ingScore = processIngredients(ingredients);
    const calScore = processCalories(calories);
    const fatScore = processFat(totalFat, calories);
    const satScore = processSat(saturatedFat, calories);
    const tranScore = processTrans(transFat, calories);
    const sodiumScore = processSodium(sodium);
    const sugarScore = processSugar(sugar, portion);

    let processedScore = 0;
    console.log('this is the processed score'  + processed)

    if (processed === 'not set') {
        console.log('1')
        processedScore = 0;
    }
    else if (processed === 'true') {
        processedScore = -1;
    }
    else if (processed==='false') {
        processedScore = 1;
    }
    else if (processed != 'null' && processed) {
        console.log('4')
        processedScore = 0;
    }


    console.log(`ingScore:${ingScore}
                 calScore:${calScore}
                 fatScore:${fatScore}
                 satScore:${satScore}
                 tranScore:${tranScore}
                 sodiumScore:${sodiumScore}
                 sugarScore:${sugarScore}
                 processedScore:${processedScore}
                `)
    score =
        ingScore +
        calScore +
        fatScore +
        satScore +
        tranScore +
        sodiumScore +
        sugarScore +
        processedScore;

    const feedback = processFeedBack(score);

    return { score, feedback, };

}


const processIngredients = (ingredients) => {


    const processFirstIngredient = (ingredient) => {
        //regex to break down to first ingredient and set to lower case 
        var regex = ingredient.replace(/\s+/g, '').toLowerCase();
        regex = regex.split(/[^A-Za-z]/)
        //we only want first ingredient 
        regex = regex[0];
        console.log(regex);
        //formating for comparison 
        
        console.log('formatted first ingredient: ' + regex);
        //grab the value from the json if exists
        if (ingredientJSON[regex]) {
            ingredient = ingredientJSON[regex];
        } else {
            ingredient = 'other'
        }
        switch (ingredient) {
            case 'dairy':
                return 2
            case 'wholegrains':
                return 2
            case 'vegtables':
                return 2
            case 'fruits':
                return 2
            case 'proteins':
                return 2
            case 'other':
                return 0
            case 'They are Secret!':
                return 0
            default:
                return 0
        }
    }


    switch (ingredients) {
        case 'dairy':
            return 2
        case 'whole grain':
            return 2
        case 'vegetable':
            return 2
        case 'fruit':
            return 2
        case 'protein':
            return 2
        case 'other':
            return 0
        case 'They are Secret!':
            return 0
        default:
            const result = processFirstIngredient(ingredients)
            return result
    }


}

const processCalories = (calories) => {
    var scoringFactor;
    switch (true) {
        case calories <= 50:
            scoringFactor = 2;
            return scoringFactor
        case calories > 50 && calories <= 100:
            scoringFactor = 1.5;
            return scoringFactor
        case calories > 100 && calories <= 150:
            scoringFactor = 1;
            return scoringFactor

        case calories > 150 && calories <= 220:
            scoringFactor = .5;
            return scoringFactor

        case calories > 220:
            scoringFactor = 0;
            return scoringFactor
        default:
            return 0

    }

}

//takes in fat calories. USDA provide fat grams must be converted to kcals!
const processFat = (totalFat, calories) => {
    const percentOfCaloriesFromFat = totalFat / calories;

    var scoringFactor;

    switch (true) {
        case percentOfCaloriesFromFat <= .2:
            scoringFactor = 1;
            return scoringFactor

        case percentOfCaloriesFromFat > .2 && percentOfCaloriesFromFat <= .35:
            scoringFactor = .5;
            return scoringFactor

        default:
            return 0;
    }

}

//takes in fat calories. USDA provides #satfat grams must be converted to kcals!
const processSat = (satFat, calories) => {
    var scoringFactor;
    console.log(`calories:${calories}`);
    console.log(`satFat:${satFat}`);
    const percentOfCaloriesFromFat = satFat * 9 / calories;
    console.log(`\n percentOfCaloriesFromSatFat: ${percentOfCaloriesFromFat}\n`)
    switch (true) {
        case percentOfCaloriesFromFat <= .05:
            scoringFactor = 1;
            return scoringFactor
        case percentOfCaloriesFromFat > .05 && percentOfCaloriesFromFat <= .10:
            scoringFactor = .5;
            return scoringFactor
        default:
            return 0;
    }
}

//takes in the transfat g and retrns relevant score depending on quantity 
const processTrans = (tansFat) => {
    console.log(`tansFat:${tansFat}`)
    var scoringFactor;
    if (tansFat === 0) {
        scoringFactor = 1;
        return scoringFactor;
    }
    else {
        scoringFactor = 0;
        return scoringFactor;
    }
}

const processSodium = (sodium) => {
    var scoringFactor;
    switch (true) {
        case (sodium <= 140):
            scoringFactor = 1;
            return scoringFactor;
        case (sodium > 140 && sodium <= 170):
            scoringFactor = 0.5;
            return scoringFactor;
        case (sodium > 170 && sodium <= 200):
            scoringFactor = 0.25;
            return scoringFactor;
        default:
            scoringFactor = 0;
            return scoringFactor;
    }

}
const processSugar = (sugar, portion) => {
    const sugarByWeight = sugar / portion;
    var scoringFactor;

    switch (true) {
        case (sugarByWeight < .15):
            scoringFactor = 2;
            return scoringFactor;
        case (.15 >= sugarByWeight && sugarByWeight < .20):
            scoringFactor = 1.5;
            return scoringFactor;
        case (sugarByWeight >= .20 && sugarByWeight < .25):
            scoringFactor = 1.0;
            return scoringFactor;
        case (sugarByWeight >= .25 && sugarByWeight < .35):
            scoringFactor = .5;
            return scoringFactor;
        default:
            scoringFactor = 0;
            return scoringFactor;
    }

}

const processFeedBack = (score) => {
    let result
    switch (true) {
        case score <= -2:
            result = '😭 ⚠️ WARNING!! ⚠️ This snack is extremely low in nutrients! Do not consume! ';
            return result
        case score <= -1:
            result = '😨 This snack is not healthy at all. Ditch this snack';
            return result
        case score > -1 && score < 6:
            result = '😩 This snack is not healthy, try choosing a healthier option.';
            return result
        case score >= 6 && score < 8:
            result = '😏 This snack is somewhat healthy, but could be better.';
            return result
        case score >= 8 && score < 10:
            result = '🙂 Good job! This snack is healthy!!';
            return result
        default:
            result = '😄 PERFECT score! This snack is very healthy!!';
            return result
    }

}


export default scoring;