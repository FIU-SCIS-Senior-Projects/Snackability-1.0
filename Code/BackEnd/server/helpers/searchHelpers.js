import axios from 'axios';
import key from '../config/key.js';

const api_key = key.key;

export function baseSearch(snack) {
    return new Promise((resolve, reject) => {

        //first targets branded food products
        const SEARCH_URL =
            `https://api.nal.usda.gov/ndb/search/?format=json&DS=SR&q=${snack}&sort=n&max=10&offset=0&api_key=${api_key}`;
        //targets the standard reffernce api
        const SEARCH_URL_SR =
            `https://api.nal.usda.gov/ndb/search/?format=json&ds=Standard%20Reference&q=${snack}&max=5&offset=0&api_key=${api_key}`;

        if (!snack) {
            reject();
        }

        axios.get(SEARCH_URL)
            .then(response => {
                let data = response.data.list.item;
                axios.get(SEARCH_URL_SR).then(response2 => {
                    if (response2.data.list) {
                        const final_data = (response2.data.list.item).concat(data);
                        console.log(final_data)
                        resolve(final_data);
                    }
                    resolve(data);
                }).catch((err) => {
                    reject(err);
                })

            }).catch(err => {
                reject(err);
            })
    });
}

export function snackSearchNdbno(ndbno) {

    return new Promise((resolve, reject) => {

        const key = 'uzjbjZNFbAkQCtmitGtNGO7xR2O5or032fyxUMzF';
        const url2 = `https://api.nal.usda.gov/ndb/V2/reports?ndbno=${ndbno}&type=b&format=JSON&api_key=${api_key}`

        const nutriSearch = (nutrients, nutrient) => {
            for (let x = 0; x < nutrients.length; x++) {
                if (nutrients[x].name == nutrient) {
                    return (nutrients[x].measures[0].value);
                }
            }
        };
        function getGrams(nutrients) {
            return nutrients[0].measures[0].eqv;
        }

        if (!ndbno) {
            reject('too small')
        }

        axios.get(url2).then(response2 => {

            const nutrients = response2.data.foods[0].food.nutrients;

            if (response2.data.foods[0].food.ing) {
                var ingredients = response2.data.foods[0].food.ing.desc;
            }
            else {
                var ingredients = 'They are Secret!';
            }

            const food = {
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
            }
            resolve(food);
        }).catch(err =>
            reject(err)
        );
    });
}
