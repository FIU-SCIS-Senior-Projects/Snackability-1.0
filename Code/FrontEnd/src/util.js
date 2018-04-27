import axios from 'axios';

export const search = (snack, portion, processed, units) => {
  return new Promise((resolve, reject) => {


    const SEARCH_URL = `https://damp-shore-83468.herokuapp.com/api/snack/search?snack=` +
      `${snack}&portion=${portion}` +
      `&units=${units}&processed=${processed}`;

    if (!snack) {
      reject();
    }

    axios.get(SEARCH_URL)
      .then(response => {
       const data=response.data;

        resolve(data);
      }).catch(err => {
        reject(err);
      })
  });
}

export const searchNbdno = (ndbno, portion, processed, units) => {
  return new Promise((resolve, reject) => {


    const SEARCH_URL = 
    `https://damp-shore-83468.herokuapp.com/api/snack/usda?ndbno=${ndbno}&portion=${portion}&units=${units}&processed=${processed}`;

    if (!ndbno) {
      reject();
    }

    axios.get(SEARCH_URL)
      .then(response => {
       const data=response.data;

        resolve(data);
      }).catch(err => {
        reject(err);
      })
  });
}
export const searchLocal = (id, portion, processed, units) => {
  return new Promise((resolve, reject) => {


    const SEARCH_URL = 
    `https://damp-shore-83468.herokuapp.com/api/snack/local?id=${id}&portion=${portion}&units=${units}&processed=${processed}`;

    if (!id) {
      reject();
    }

    axios.get(SEARCH_URL)
      .then(response => {
       const data=response.data;

        resolve(data);
      }).catch(err => {
        reject(err);
      })
  });
}

export const searchOld = (snack, quantity) => {

  return new Promise((resolve, reject) => {

    const key = 'uzjbjZNFbAkQCtmitGtNGO7xR2O5or032fyxUMzF';
    const SEARCH_URL = `https://api.nal.usda.gov/ndb/search/?format=json&DS=SR&q=${snack}&
    sort=n&max=10&offset=0&api_key=${key}`;

    nutriSearch = (nutrients, nutrient) => {
      for (x = 0; x < nutrients.length; x++) {
        if (nutrients[x].name == nutrient) {
          return (nutrients[x].measures[0].value);
        }
      }
    };

    if (snack == '') {
      return reject('too small')
    }

    axios.get(SEARCH_URL)
      .then(response => {
        let data = response.data.list.item[0].ndbno;
        let url2 = `https://api.nal.usda.gov/ndb/V2/reports?ndbno=${data}&type=b&format=JSON&api_key=${key}`

        axios.get(url2).then(response2 => {
          const nutrients = response2.data.foods[0].food.nutrients;

          const ingredients = response2.data.foods[0].food.ing;

          const food = {
            ingredients: ingredients,
            calories: this.nutriSearch(nutrients, 'Energy'),
            sodium: this.nutriSearch(nutrients, 'Sodium, Na'),
            totalFat: this.nutriSearch(nutrients, 'Total lipid (fat)'),
            transFat: this.nutriSearch(nutrients, 'Fatty acids, total trans'),
            saturatedFat: this.nutriSearch(nutrients, 'Fatty acids, total saturated'),
            sugar: this.nutriSearch(nutrients, 'Sugars, total'),
            cholesterol: this.nutriSearch(nutrients, 'Cholesterol'),
            protein: this.nutriSearch(nutrients, 'Protein'),
            fiber: this.nutriSearch(nutrients, 'Fiber, total dietary'),
            carbs: this.nutriSearch(nutrients, 'Carbohydrate, by difference'),
          }
          resolve(food);
        });
      })
      .catch(err =>
        reject(err)
      );
  });
};