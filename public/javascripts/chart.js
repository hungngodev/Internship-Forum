
const labels = ChartData.keys;
const salary = ChartData.averagesalary;
const rating = ChartData.averageReview;
const counts = ChartData.counts;

const data = {
    labels: labels,
    datasets: [
        {
            label: "Average Salary ($/h)",
            data: salary,
    
        },
        {
            label: 'Number of Internships',
            data: counts,


        },
        {
            label: 'Average Rating on scale of 25',
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
        scales: {
            x: {
              grid: {
                tickColor: '#FF79C6'
              },
              ticks: {
                color: '#8BE9FD',
                font :{
                    size: 20,
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
                  font :{
                      size: 20,
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
                        size: 30,
                        family: 'Georgia, serif'    
                    }
                }
            },
            title: {
                display: true,
                color: '#00ff9f',
                text: 'Combo Bar Line Chart of this Forum',
                font: {
                    size: 50,
                    weight: 'bold',
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
            onProgress: function(animation) {
                progress.value = animation.currentStep / animation.numSteps;
            }
        },
    }
};

const ctx = document.getElementById('BarLineChart');
new Chart(ctx, config);
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

const  centerText=  {
    id: 'centerText',
    afterDatasetsDraw(chart, args, options) {
        const {ctx, chartArea: {left, right, top, bottom, width, height}} = chart;
        ctx.save();
        const number = doughnutdata.length;
        ctx.textAlign = 'center';
        ctx.fillStyle = '#00ff9f';
        ctx.font= 'bold 15px Arial';
        ctx.fillText('#Internships: '+number, width/2, height/2+top);
        ctx.restore();

    }
}
const config1 = {
    type: 'doughnut',
    data: doughnutdatachart,
    options: {
        aspectRatio: 2,
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                align:' end',
                padding: 100,
                labels: {
                    color: '#F8F8F2',
                    font: {
                        size: 15,
                        family: 'Georgia, serif'    
                    }
                }
            },
            title: {
                display: true,
                text: 'Doughnut Chart of this Forum',
                color: '#00ff9f',
                font: {
                    size: 50,
                    weight: 'bold',
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
const canvas = ctx.getContext('2d');
let percentage=0;
let diff;
function progressBar(){
    const {canvas: {width, height}} = canvas;
    const angle= Math.PI/180;
    diff= ((percentage/100)*angle*360*10).toFixed(2);
    canvas.clearRect(0,0,width,height);
    canvas.fillStyle='#00ff9f';
    canvas.font='bold 50px Arial';
    canvas.fillText(`${percentage} %`,width/2, height/2) ;
    canvas.beginPath();
    const radius= height*0.4;
    canvas.strokeStyle = '#00ff9f';
    canvas.lineWidth = 10;
    canvas.arc(width/2,height/2,angle *270, diff/10+angle*270,false);
    canvas.stroke();
    if(percentage>=100){
        clearTimeout(sim);
        drawChart();
    }
    percentage++;
    }
const sim = setInterval(progressBar, 10);
function drawChart(){
    const myChart = new Chart(document.getElementById('DoughnutChart'), config1);
}
progressBar();

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const resultData = ChartData.radar.result;
function createRadar(company1="Apple",company2= "Microsoft"){
    company1 = company1 in resultData ? company1 : "Apple";
    company2 = company2 in resultData ? company2 : "Microsoft";
    const radardata = {
        labels: [
          'Number of Internships ',
            'Average Rating (scale of 50)',
            'Average Salary',
        ],
        datasets: [{
          label: company1,
          data: [resultData[company1].count*10, resultData[company1].averageRating*10, resultData[company1].averageSalary],
          fill: true,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgb(255, 99, 132)',
          pointBackgroundColor: 'rgb(255, 99, 132)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(255, 99, 132)'
        }, {
          label: company2,
          data: [resultData[company2].count*10, resultData[company2].averageRating*10, resultData[company2].averageSalary],
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
                font: {
                    size: 25,
                    family: 'Georgia, serif'
                }
              },
              angleLines: {
                color: '#50FA7B'
              }
            }
          },
          aspectRatio: 1.5,
          responsive: true,
          plugins: {
              legend: {
                  position: 'top',
                  align:' end',
                  padding: 100,
                  labels: {
                      color: '#F8F8F2',
                      font: {
                          size: 35
                      }
                  }
              },
              title: {
                  display: true,
                  text: 'Comparison of two Companies',
                  color: '#00ff9f',
                  font: {
                      size: 50,
                      weight: 'bold',
                  }
              },
              deferred: {
                  xOffset: 150,   // defer until 150px of the canvas width are inside the viewport
                  yOffset: '50%', // defer until 50% of the canvas height are inside the viewport
                  delay: 2000,   // delay of 500 ms after the canvas is considered inside the viewport
                },
          },
        },
    
      };
    return new Chart(document.getElementById('RadarChart'), radarconfig);
}
let radarChart = createRadar('Apple','Microsoft');
function changeRadar(company1,company2){
    radarChart.destroy();
    radarChart = createRadar(company1,company2);
}