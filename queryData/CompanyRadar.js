const { count } = require('mongoose/lib/model');
const review = require('../models/review');
async function radar(internships) {
    return new Promise((resolve, reject) => {
        try {
            function getEquivalenceClasses(arr) {
                const equivalenceMap = {};

                arr.forEach(obj => {
                    let { company, reviews, salary } = obj;
                    salary = salary !== 0 ? salary : 30;
                    const rating = reviews.reduce((acc, review) => acc + review.rating, 0)/reviews.length;
                    
                    const existingKeys = Object.keys(equivalenceMap);

                    let found = false;
                    for (let i = 0; i < existingKeys.length; i++) {
                        const key = existingKeys[i];
                        if (key.includes(company) || company.includes(key)) {
                            equivalenceMap[key].count++;
                            equivalenceMap[key].totalRating += rating;
                            equivalenceMap[key].totalSalary += salary;
                            found = true;
                            break;
                        }
                    }

                    if (!found) {
                        equivalenceMap[company] = {
                            count: 1,
                            totalRating: rating,
                            totalSalary: salary,
                        };
                    }
             
                });

                // Calculate the average rating and average salary
                for (const company in equivalenceMap) {
                    equivalenceMap[company].averageRating =
                        equivalenceMap[company].totalRating / equivalenceMap[company].count;
                    equivalenceMap[company].averageSalary =
                        equivalenceMap[company].totalSalary / equivalenceMap[company].count;
                    delete equivalenceMap[company].totalRating;
                    delete equivalenceMap[company].totalSalary;
                }

                const result = Object.entries(equivalenceMap).map(([key, value]) => ({
                    [key]: value
                }));
                
                return equivalenceMap;
            }
            let result = getEquivalenceClasses(internships);
            const keys = Object.keys(result);
            resolve({result: result, keys: keys});
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = radar;
