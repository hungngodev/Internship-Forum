const QuickChart = require('quickchart-js');

async function areaOfWork(internships) {
  return new Promise((resolve, reject) => {
    try {
      let areaClass = {};
      for (let internship of internships) {
        if (internship.area in areaClass) {
          areaClass[internship.area] += 1;
        } else {
          area1 = (typeof internship.area === 'string') ? internship.area : internship.area.toString();
          areaClass[internship.area] = 1;
        }
      }
      const chart = new QuickChart();
      chart.setWidth(1600);
      chart.setHeight(700);
      chart.setVersion('2');
      const labels1 = Object.keys(areaClass);
      const data1 = labels1.map(label => areaClass[label]);
      const backgroundColor1 = [
        'rgb(75, 0, 130)',        // Indigo
        'rgb(255, 0, 0)',         // Red
        'rgb(255, 165, 0)',       // Orange
        'rgb(255, 255, 0)',       // Yellow
        'rgb(0, 128, 0)',         // Green
        'rgb(0, 0, 255)',         // Blue
        'rgb(238, 130, 238)',     // Violet
        'rgb(255, 192, 203)',     // Pink
        'rgb(255, 20, 147)',      // Deep Pink
        'rgb(65, 105, 225)',      // Royal Blue
        'rgb(128, 0, 128)',       // Purple
        'rgb(218, 112, 214)',     // Orchid
        'rgb(70, 130, 180)',      // Steel Blue
        'rgb(0, 128, 128)',       // Teal
        'rgb(255, 69, 0)',        // Red-Orange
        'rgb(255, 99, 71)',       // Tomato
        'rgb(0, 255, 0)',         // Lime
        'rgb(0, 255, 255)',       // Cyan
        'rgb(30, 144, 255)',      // Dodger Blue
        'rgb(255, 20, 147)',      // Deep Pink
        'rgb(255, 105, 180)',     // Hot Pink
        'rgb(255, 215, 0)',       // Gold
        'rgb(0, 255, 127)',       // Spring Green
        'rgb(128, 0, 0)',         // Maroon
        'rgb(255, 140, 0)',       // Dark Orange
        'rgb(0, 0, 128)',         // Navy
        'rgb(255, 192, 203)',     // Pink
        'rgb(255, 0, 255)',       // Magenta
        'rgb(0, 255, 255)',       // Aqua
        'rgb(64, 224, 208)',      // Turquoise
        'rgb(240, 128, 128)',     // Light Coral
        'rgb(32, 178, 170)',      // Light Sea Green
        'rgb(210, 105, 30)',      // Chocolates
        'rgb(238, 232, 170)',     // Pale Goldenrod
        'rgb(128, 128, 0)',       // Olive
        'rgb(255, 99, 71)',       // Tomato
        'rgb(0, 128, 0)',         // Green
        'rgb(255, 255, 0)',       // Yellow
        'rgb(0, 255, 0)',         // Lime
        'rgb(255, 20, 147)',      // Deep Pink
        'rgb(65, 105, 225)',      // Royal Blue
        'rgb(128, 0, 128)',       // Purple
        'rgb(0, 128, 128)',       // Teal
        'rgb(255, 69, 0)',        // Red-Orange
        'rgb(255, 140, 0)',       // Dark Orange
        'rgb(0, 0, 128)',
      ];
      numberOfData = 20;
      chart.setConfig({
        type: 'doughnut',
        data: {
          datasets: [
            {
              data: data1.slice(0, numberOfData),
              backgroundColor: backgroundColor1,
              label: 'Area Of Work Doughnut Chart',
            },
          ],
          labels: labels1.slice(0, numberOfData)
        },
        options: {
          title: {
            display: true,
            text: 'Area of Work Distribution Doughnut Chart of this Forum',
            fontSize: 50,
            fontFamily: 'Serif',
            fontColor: '#000',
          },
          legend: {
            labels: {
              fontSize: 20,
            }
          },
          plugins: {
            doughnutlabel: {
              labels: [{ text: data1.slice(0, numberOfData).reduce((accumulator, currentValue) => accumulator + currentValue, 0).toString(), font: { size: 60 } }, { text: 'total', font: { size: 40 } }],

            },
            datalabels: {
              color: "white",
              fontSize: 50,
            },
          },
        },
      });

      const chartUrl = chart.getUrl();
      resolve(chartUrl);
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = areaOfWork;
