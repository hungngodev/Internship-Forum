async function areaOfWork(internships) {
  return new Promise((resolve, reject) => {
    try {
      let areaClass = {};
      for (let internship of internships) {
        if (internship.area in areaClass) {
          areaClass[internship.area] += 1;
        } else {
          areaClass[internship.area] = 1;
        }
      }
      const labels1 = Object.keys(areaClass);
      const data1 = labels1.map(label => areaClass[label]);
      const result= {labels1: labels1, data1: data1};
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
}

export default areaOfWork;





      // const chart = new QuickChart();
      // chart.setWidth(1600);
      // chart.setHeight(700);
      // chart.setVersion('2');
      // numberOfData = 20;
      // chart.setConfig({
      //   type: 'doughnut',
      //   data: {
      //     datasets: [
      //       {
      //         data: data1.slice(0, numberOfData),
      //         backgroundColor: backgroundColor1,
      //         label: 'Area Of Work Doughnut Chart',
      //       },
      //     ],
      //     labels: labels1.slice(0, numberOfData)
      //   },
      //   options: {
      //     title: {
      //       display: true,
      //       text: 'Area of Work Distribution Doughnut Chart of this Forum',
      //       fontSize: 50,
      //       fontFamily: 'Serif',
      //       fontColor: '#000',
      //     },
      //     legend: {
      //       labels: {
      //         fontSize: 20,
      //       }
      //     },
      //     plugins: {
      //       doughnutlabel: {
      //         labels: [{ text: data1.slice(0, numberOfData).reduce((accumulator, currentValue) => accumulator + currentValue, 0).toString(), font: { size: 60 } }, { text: 'total', font: { size: 40 } }],

      //       },
      //       datalabels: {
      //         color: "white",
      //         fontSize: 50,
      //       },
      //     },
      //   },
      // });

      // const chartUrl = chart.getUrl();
      // resolve(chartUrl);