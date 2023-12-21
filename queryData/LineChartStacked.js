const { count } = require('mongoose/lib/model');
const review = require('../models/review');
async function line(internships) {
    return new Promise((resolve, reject) => {
        try {
            const calculateMonthlyStats = (arrayOfObjects) => {
                const calculateAverage = (arr) => {
                    const sum = arr.reduce((acc, curr) => acc + curr, 0);
                    return sum / arr.length || 0;
                };

                const getMonthName = (date) => {
                    const monthNames = [
                        'January', 'February', 'March', 'April', 'May', 'June',
                        'July', 'August', 'September', 'October', 'November', 'December'
                    ];
                    return monthNames[date.getMonth()];
                };

                const monthlyStats = {};

                arrayOfObjects.forEach(obj => {
                    const month = getMonthName(obj.lastModified);
                    const salary = obj.salary;
                    const reviews = obj.reviews.map(review => review.rating);

                    if (!monthlyStats[month]) {
                        monthlyStats[month] = {
                            numberOfObjects: 1,
                            totalSalary: salary,
                            totalReviews: calculateAverage(reviews),
                            totalObjects: 1
                        };
                    } else {
                        monthlyStats[month].numberOfObjects++;
                        monthlyStats[month].totalSalary += salary;
                        monthlyStats[month].totalReviews += calculateAverage(reviews);
                        monthlyStats[month].totalObjects++;
                    }
                });

                for (const month in monthlyStats) {
                    monthlyStats[month].averageSalary = monthlyStats[month].totalSalary / monthlyStats[month].numberOfObjects;
                    monthlyStats[month].averageReview = monthlyStats[month].totalReviews / monthlyStats[month].totalObjects;
                    delete monthlyStats[month].totalSalary;
                    delete monthlyStats[month].totalReviews;
                    delete monthlyStats[month].totalObjects;
                }

                return monthlyStats;
            };
            const monthlyStatistics = calculateMonthlyStats(internships);

            resolve(monthlyStatistics);
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = line;
