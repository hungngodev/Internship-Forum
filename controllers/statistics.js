import Internship from '../models/internship.js';
import areaOfWork from '../queryData/AreaOfWorkDoughnut.js';
import bar from '../queryData/LocationBar.js';
import radar from '../queryData/CompanyRadar.js';
import line from '../queryData/LineChartStacked.js';

const index = async (req, res) => {
    const internships = await Internship.find({}).populate('popupText').populate('reviews');
    if (internships.length != 0){
    const barChart = await bar(internships);
    const doughnutChart = await areaOfWork(internships);
    const radarChart = await radar(internships);
    const lineChart= await line(internships);
    res.render('statistics/index', { data: {internships: internships , doughnut: doughnutChart, bar:barChart, radar:radarChart, line:lineChart}})
    } else {
        res.render('statistics/index', { data: {internships: internships}})
    }
}
export default index;