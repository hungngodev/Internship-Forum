const LargeSize = 18;
const MediumSize = 10;
const SmallSize = 3;
const LargeWidth = 800;
const MediumWidth = 300;
if (window.outerWidth > LargeWidth) {
    Chart.defaults.font.size = LargeSize;
}
if (window.outerWidth < LargeWidth && window.outerWidth > MediumWidth) {
    Chart.defaults.font.size = MediumSize;
}
if (window.outerWidth < MediumWidth) {
    Chart.defaults.font.size = SmallSize;
}
function responsiveFonts() {
    if (window.outerWidth > LargeWidth) {
        Chart.defaults.font.size = LargeSize;
    }
    if (window.outerWidth < LargeWidth && window.outerWidth > MediumWidth) {
        Chart.defaults.font.size = MediumSize;
    }
    if (window.outerWidth < MediumWidth) {
        Chart.defaults.font.size = SmallSize;
    }
    barChart.update();
    doughnutChart.update();
    console.log(Chart.defaults.font.size);
    console.log(window.outerWidth)
}
const TitleSize = 2.5 * Chart.defaults.font.size;
const subtitle = 1.5 * Chart.defaults.font.size;

const labels = ChartData.keys;
const salary = ChartData.averagesalary;
const rating = ChartData.averageReview;
const counts = ChartData.counts;

const data = {
    labels: labels,
    datasets: [
        {
            label: "Average Salary",
            data: salary,

        },
        {
            label: 'Number of Internships',
            data: counts,


        },
        {
            label: 'Average Rating',
            data: rating,
            type: 'line',
            order: 0
        }
    ]
};
const config = {
    type: 'bar',
    data: data,
    options: {
        responsive: true,
        aspectRatio: function (context) {
            var width = context.chart.width;
            if (width > 800) {
                return 2
            }
            if (width <800 && width > 400) {
                return 1.5
            }
            if (width < 400) {
                return 1
            }
        },
        scales: {
            x: {
                grid: {
                    tickColor: '#FF79C6'
                },
                ticks: {
                    color: '#8BE9FD',
                    font: {

                        family: 'Georgia, serif'
                    }
                }
            },
            y: {
                grid: {
                    tickColor: '#FF79C6'
                },
                ticks: {
                    color: '#8BE9FD',
                    font: {

                        family: 'Georgia, serif'
                    }
                }
            }
        },
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: '#F8F8F2',
                    font: {

                        family: 'Georgia, serif'
                    }
                }
            },
            title: {
                display: true,
                color: '#00ff9f',
                text: 'Combo Bar Line Chart of this Forum',
                font: function (context) {
                    var width = context.chart.width;
                    var size = Math.round(width / 32);
                    return {
                        size: size,
                        weight: 'bold'
                    };
                }
            },
            tooltip: {
                callbacks: {
                    label: ((tooltipItem, data) => {
                        if (tooltipItem.datasetIndex === 2) {
                            return tooltipItem.dataset.label + ': ' + (tooltipItem.raw / 5).toFixed(1);
                        }
                        else if (tooltipItem.datasetIndex === 0) {
                            return tooltipItem.dataset.label + ': ' + '$' + tooltipItem.raw.toFixed(1) + '/hr';
                        }
                    })
                }
            }
        },
        animations: {
            tension: {
                duration: 2000,
                easing: 'linear',
                from: 1,
                to: 0,
                loop: true
            },
            onProgress: function (animation) {
                progress.value = animation.currentStep / animation.numSteps;
            }
        },
    }
};

const ctx = document.getElementById('BarLineChart');
const barChart = new Chart(ctx, config);
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const doughtnutlabels = ChartData.labels1;
const doughnutdata = ChartData.data1;
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
const backgroundColor1 = [
    'rgb(255, 0, 0)',         // Red
    'rgb(255, 3, 33)',
    'rgb(255, 101, 0)',
    'rgb(255, 156, 0)',
    'rgb(255, 205, 0)',
    'rgb(237, 251, 12)',
    'rgb(202, 250, 110)',
    'rgb(130, 234, 127)',
    'rgb(31, 214, 146)',
    'rgb(0, 192, 163)',
    'rgb(0, 168, 174)',
    'rgb(0, 143, 175)',
    'rgb(0, 117, 166)',
    'rgb(0, 91, 147)',
    'rgb(8, 66, 120)',
    'rgb(42, 42, 88)',
    'rgb(0, 255, 204)',       // Green-Cyan
    'rgb(0, 255, 255)',       // Cyan
    'rgb(0, 204, 255)',       // Cyan
    'rgb(0, 153, 255)',       // Cyan-Blue
    'rgb(0, 102, 255)',       // Cyan-Blue
    'rgb(0, 51, 255)',        // Blue-Cyan
    'rgb(0, 0, 255)',         // Blue-Cyan
    'rgb(51, 0, 255)',        // Blue-Magenta
    'rgb(102, 0, 255)',       // Blue-Magenta
    'rgb(153, 0, 255)',       // Magenta
    'rgb(204, 0, 255)',       // Magenta
    'rgb(255, 0, 255)',       // Magenta-Red
    'rgb(250, 110, 212)',
    'rgb(216, 112, 212)',
    'rgb(182, 112, 207)',
    'rgb(149, 111, 198)',
    'rgb(119, 107, 185)',
    'rgb(92, 102, 169)',
    'rgb(70, 96, 150)',
    'rgb(54, 88, 130)',
    'rgb(45, 79, 109)',
    'rgb(42, 69, 88)'
];
const doughnutdatachart = {
    labels: doughtnutlabels,
    datasets: [
        {
            label: 'Number of Internships',
            data: doughnutdata,
            backgroundColor: backgroundColor1,
        }
    ]
};

const centerText = {
    id: 'centerText',
    afterDatasetsDraw(chart, args, options) {
        const { ctx, chartArea: { left, right, top, bottom, width, height } } = chart;
        ctx.save();
        const number = doughnutdata.length;
        ctx.textAlign = 'center';
        ctx.fillStyle = '#00ff9f';

        let size = Math.round(width / 32);


        ctx.font = `bold ${0.7 * size + 3}px Arial`;
        ctx.fillText('#Internships: ' + number, width / 2, height / 2 + top);
        ctx.restore();

    }
}
const config1 = {
    type: 'doughnut',
    data: doughnutdatachart,
    options: {
        aspectRatio: function (context) {
            var width = context.chart.width;
            if (width > 800) {
                return 1.5
            }
            if (width <800 && width > 400) {
                return 1.3
            }
            if (width < 400) {
                return 1
            }
        },
        responsive: true,
        plugins: {
            legend: {
                display: function (context) {
                    var width = context.chart.width;
                    if (width > 480) {
                        return true
                    }
                    else return false
                },
                position: 'top',
                align: ' end',
                padding: 100,
                labels: {
                    color: '#F8F8F2',
                    font: function (context) {
                        var width = context.chart.width;
                        var size = Math.round(width / 32);
                        return {
                            size: 0.4* size,

                        };
                    }
                }
            },
            title: {
                display: true,
                text: 'Doughnut Chart of this Forum',
                color: '#00ff9f',
                font: function (context) {
                    var width = context.chart.width;
                    var size = Math.round(width / 32);
                    return {
                        size: size,
                        weight: 'bold'
                    };
                }
            },
            deferred: {
                xOffset: 150,   // defer until 150px of the canvas width are inside the viewport
                yOffset: '50%', // defer until 50% of the canvas height are inside the viewport
                delay: 2000,   // delay of 500 ms after the canvas is considered inside the viewport
            },
        },
    },
    plugins: [centerText],
};
// const canvas = ctx.getContext('2d');
// let percentage = 0;
// let diff;
// function progressBar() {
//     const { canvas: { width, height } } = canvas;
//     const angle = Math.PI / 180;
//     diff = ((percentage / 100) * angle * 360 * 10).toFixed(2);
//     canvas.clearRect(0, 0, width, height);
//     canvas.fillStyle = '#00ff9f';

//     canvas.font = 'bold 50px Arial';
//     canvas.fillText(`${percentage} %`, width / 2, height / 2);
//     canvas.beginPath();
//     const radius = height * 0.4;
//     canvas.strokeStyle = '#00ff9f';
//     canvas.lineWidth = 10;
//     canvas.arc(width / 2, height / 2, angle * 270, diff / 10 + angle * 270, false);
//     canvas.stroke();
//     if (percentage >= 100) {
//         clearTimeout(sim);
//         drawChart();
//     }
//     percentage++;
// }
// const sim = setInterval(progressBar, 10);
// function drawChart() {
//     const myChart = new Chart(document.getElementById('DoughnutChart'), config1);
// }
// progressBar();
const doughnutChart = new Chart(document.getElementById('DoughnutChart'), config1);
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const resultData = ChartData.radar.result;
function createRadar(company1 = "Apple", company2 = "Microsoft") {
    company1 = company1 in resultData ? company1 : "Apple";
    company2 = company2 in resultData ? company2 : "Microsoft";
    const radardata = {
        labels: [
            'Average Salary',
            'Average Rating ',
            'Number Internships ',
        ],
        datasets: [{
            label: company1,
            data: [resultData[company1].averageSalary, resultData[company1].averageRating * 10, resultData[company1].count * 10],
            fill: true,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgb(255, 99, 132)',
            pointBackgroundColor: 'rgb(255, 99, 132)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(255, 99, 132)'
        }, {
            label: company2,
            data: [resultData[company2].averageSalary, resultData[company2].averageRating * 10, resultData[company2].count * 10],
            fill: true,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgb(54, 162, 235)',
            pointBackgroundColor: 'rgb(54, 162, 235)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(54, 162, 235)'
        }]
    };
    const radarconfig = {
        type: 'radar',
        data: radardata,
        options: {
            elements: {
                line: {
                    borderWidth: 3
                }
            },
            scales: {
                r: {
                    pointLabels: {
                        color: '#8BE9FD',
                        font:
                            function (context) {
                                var width = context.chart.width;
                                var size = Math.round(width / 32);
                                return {
                                    size: 0.8 * size,
                                    family: 'Georgia, serif',
                                };
                            }
                    },
                    angleLines: {
                        color: '#50FA7B'
                    },
                    ticks: {
                        color: '#f9da42',
                        backdropColor: '#000',
                    }
                }
            },
            aspectRatio:1.2,
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                    align: ' end',
                    padding: 100,
                    labels: {
                        color: '#F8F8F2',
                        font: function (context) {
                            var width = context.chart.width;
                            var size = Math.round(width / 32);
                            return {
                                size: 0.8 * size,
                                family: 'Georgia, serif',
                            };
                        }
                    }
                },
                title: {
                    display: true,
                    text: 'Comparison of two Companies',
                    color: '#00ff9f',
                    font: function (context) {
                        var width = context.chart.width;
                        var size = Math.round(width / 32);
                        return {
                            size: size,
                            weight: 'bold'
                        };
                    }
                },
                deferred: {
                    xOffset: 150,   // defer until 150px of the canvas width are inside the viewport
                    yOffset: '50%', // defer until 50% of the canvas height are inside the viewport
                    delay: 2000,   // delay of 500 ms after the canvas is considered inside the viewport
                },
                tooltip: {
                    callbacks: {
                        label: ((tooltipItem, data) => {
                            if (tooltipItem.dataIndex === 0) {
                                return tooltipItem.dataset.label + ': ' + '$' + tooltipItem.raw.toFixed(1) + '/hr';
                            } else if (tooltipItem.dataIndex === 1) {
                                return tooltipItem.dataset.label + ':' + (tooltipItem.raw / 10).toFixed(1);
                            } else if (tooltipItem.dataIndex === 2) {
                                return tooltipItem.dataset.label + ':' + (tooltipItem.raw / 10).toFixed(1);
                            }

                        })
                    }
                }
            },
        },

    };
    return new Chart(document.getElementById('RadarChart'), radarconfig);
}
let radarChart = createRadar('Apple', 'Microsoft');
function changeRadar(company1, company2) {
    radarChart.destroy();
    radarChart = createRadar(company1, company2);
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
const line = ChartData.line;

const linelabels =
    ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ]
const number = linelabels.map((month) => line[month].numberOfObjects * 4);
const linesalary = linelabels.map((month) => line[month].averageSalary);
const linerating = linelabels.map((month) => line[month].averageReview * 10);
const basemonthsrating = [12, 9, 4, 3, 2, 1, 0, 6, 7, 11, 8, 5];
const monthsrating = basemonthsrating.map((month) => month * 5);
const linedata = {
    labels: linelabels,
    datasets: [
        {
            label: 'Number of Internships',
            data: number,
            borderColor: '#fff',
            backgroundColor: '#36a2eb',
            fill: true
        },
        {
            label: 'Average Salary',
            data: linesalary,
            borderColor: '#fff',
            backgroundColor: '#ff6484',

            fill: true
        },
        {
            label: 'Average Rating',
            data: linerating,
            borderColor: '#fff',
            backgroundColor: '#4bc0c0 ',
            fill: true
        },
        {
            label: 'Best Month to Apply ranking',
            data: monthsrating,
            borderColor: '#fff',
            backgroundColor: '#ffcd56',
            fill: true
        }
    ]
};

const lineconfig = {
    type: 'line',
    data: linedata,
    options: {
        aspectRatio: function (context) {
            var width = context.chart.width;
            if (width > 800) {
                return 2
            }
            if (width <800 && width > 400) {
                return 1.5
            }
            if (width < 400) {
                return 1
            }
        },
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: '#F8F8F2',
                    font: {

                        family: 'Georgia, serif'
                    }
                }
            },
            title: {
                display: true,
                text: (ctx) => 'Line Chart based on Months of this Forum',
                color: '#00ff9f',
                font: function (context) {
                    var width = context.chart.width;
                    var size = Math.round(width / 32);
                    return {
                        size: size,
                        weight: 'bold'
                    };
                }

            },
            tooltip: {
                mode: 'index',
                callbacks: {
                    label: ((tooltipItem, data) => {
                        console.log(tooltipItem)
                        if (tooltipItem.datsetaIndex === 0) {
                            return tooltipItem.dataset.label + ': ' + (tooltipItem.raw / 4).toFixed(0);
                        } else if (tooltipItem.datasetIndex === 1) {
                            return tooltipItem.dataset.label + ': ' + '$' + tooltipItem.raw.toFixed(1) + '/hr';
                        } else if (tooltipItem.datasetIndex === 2) {
                            return tooltipItem.dataset.label + ': ' + (tooltipItem.raw / 10).toFixed(1);
                        } else if (tooltipItem.datasetIndex === 3) {
                            return tooltipItem.dataset.label + ': ' + (tooltipItem.raw / 5).toFixed(0);
                        }
                    })
                },

            },
        },
        interaction: {
            mode: 'nearest',
            axis: 'x',
            intersect: false
        },
        scales: {

            x: {
                grid: {
                    tickColor: '#FF79C6'
                },
                ticks: {
                    color: '#8BE9FD',
                    font: {

                        family: 'Georgia, serif'
                    }
                },
                title: {
                    display: true,
                    color: '#00ff9f',
                    font: function (context) {
                        var width = context.chart.width;
                        var size = Math.round(width / 32);
                        return {
                            size: 0.8 * size,
                            weight: 'bold'
                        };
                    },
                    text: 'Twelve Months of each year'
                }
            },
            y: {
                stacked: true,
                display: false,
            }
        }
    }
};
const lineChart = new Chart(document.getElementById('LineChart'), lineconfig);