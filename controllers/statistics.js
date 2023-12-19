const Internship = require('../models/internship');
const areaOfWork = require('../queryData/AreaOfWorkDoughnut');
const bar = require('../queryData/LocationBar');
const radar = require('../queryData/CompanyRadar');
module.exports.index = async (req, res) => {
    const internships = await Internship.find({}).populate('popupText').populate('reviews');
    if (internships.length != 0){
    const barChart = await bar(internships);
    const doughnutChart = await areaOfWork(internships);
    const radarChart = await radar(internships);
    res.render('statistics/index', { data: {internships: internships , doughnut: doughnutChart, bar:barChart, radar:radarChart}})
    } else {
        res.render('statistics/index', { data: {internships: internships}})
    }
}