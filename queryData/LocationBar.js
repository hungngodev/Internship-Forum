const { count } = require('mongoose/lib/model');
const QuickChart = require('quickchart-js');

async function bar(internships) {
    return new Promise((resolve, reject) => {
        try {
            const statesAbbreviations = [
                'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL',
                'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT',
                'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI',
                'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
            ];

            function containsStateAbbreviation(str) {
                for (let i = 0; i < statesAbbreviations.length; i++) {
                    const abbreviation = statesAbbreviations[i];
                    if (str.includes(abbreviation)) {
                        return statesAbbreviations[i];
                    }
                }
                return "";
            }

            let locations = {};

            for (let internship of internships.reverse()) {
                let states = containsStateAbbreviation(internship.location);
                let salary = internship.salary !== 0 ? internship.salary : 35;

                function calculateAverageRatings(data) {
                    const totalRatings = data.reduce((sum, obj) => sum + obj.rating, 0);
                    return data.length > 0 ? totalRatings / data.length : 0;
                }

                const review = calculateAverageRatings(internship.reviews);

                if (states !== "" && !(states in locations)) {
                    locations[states] = { salary: salary, count: 1, review: review };
                } else if (states in locations) {
                    locations[states].salary += salary;
                    locations[states].count += 1;
                    locations[states].review += review;
                }
            }
            let keys = Object.keys(locations);
            keys.sort();
            function swapFirstWithMiddle(arr) {
                const length = arr.length;
                const middleIndex = Math.floor(length / 2);
                const temp = arr[0];
                arr[0] = arr[middleIndex];
                arr[middleIndex] = temp;
                return arr;
              }
            keys = swapFirstWithMiddle(keys);
            const averagesalary = keys.map(key => locations[key].salary / locations[key].count);
            const averageReview = keys.map(key => locations[key].review * 5 / locations[key].count);
            const counts = keys.map(key => locations[key].count);
            const result ={ averageReview: averageReview, counts: counts, averagesalary: averagesalary, keys: keys };
            // const QuickChart = require('quickchart-js');
            // const chart = new QuickChart();
            // chart.setWidth(1600)
            // chart.setHeight(700);
            // chart.setVersion('2');
            // chart.setConfig({
            //     "type": "bar",
            //     "data": {
            //         "labels": Object.keys(locations),
            //         "datasets": [
            //             {
            //                 "type": "line",
            //                 "label": "Average Rating on scale of 25",
            //                 "borderColor": "rgb(54, 162, 235)",
            //                 "borderWidth": 2,
            //                 "fill": false,
            //                 "data": averageReview,
            //             },
            //             {
            //                 "type": "bar",
            //                 "label": "Number of Internships of this location",
            //                 "backgroundColor": "rgb(255, 99, 132)",
            //                 "data": counts,
            //                 "borderColor": "white",
            //                 "borderWidth": 2
            //             },
            //             {
            //                 "type": "bar",
            //                 "label": "Average Salary of this location ($/h)",
            //                 "backgroundColor": "rgb(75, 192, 192)",
            //                 "data": averagesalary,
            //             }
            //         ]
            //     },
            //     "options": {
            //         "responsive": true,
            //         "title": {
            //             fontSize: 50,
            //             fontFamily: 'Serif',
            //             fontColor: '#000',
            //             "display": true,
            //             "text": "Internships based on Location Combo Bar Line Chart of this Forum",
            //         },
            //         legend: {
            //             labels: {
            //                 fontSize: 20,
            //             }
            //         },

            //         datalabels: {
            //             color: "white",
            //             fontSize: 50,
            //         },
            //         "tooltips": {
            //             "mode": "index",
            //             "intersect": true
            //         }
            //     }
            // });
            // const chartUrl = chart.getUrl();
            resolve(result);
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = bar;
