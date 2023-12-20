const User = require('../models/user');
const Internship = require('../models/internship');

module.exports.renderRegister = (req, res) => {
    res.render('users/register');
}

module.exports.register = async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'Welcome to Internship Forum!');
            res.redirect('/internships');
        })
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('register');
    }
}



module.exports.renderLogin = (req, res) => {
    res.render('users/login');
}

module.exports.login = (req, res) => {
    req.flash('success', `Welcome back ${req.user.username}!!!`);
    const redirectUrl = req.session.returnTo || '/internships';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
}

module.exports.logout = (req, res) => {
    req.logout();
    // req.session.destroy();
    req.flash('success', "Goodbye!");
    res.redirect('/internships');
}

module.exports.index = async (req, res) => {
    const {id} = req.params;
    const author = await User.findById(id);
    const internships = await Internship.find({author: id}).populate('popupText');
    res.render('users/profile', { data: {internships: internships, author: author, profile: true, id: id}})
}

module.exports.search = async (req, res) => {
    const {id} = req.params;
    const author = await User.findById(id);
    const query = req.query.q;
    console.log(req.protocol + '://' + req.get('host') + req.originalUrl)
    const internships = await Internship.find({ $text: { $search: query },author:id })
        .populate('popupText').populate('reviews');
    let message = internships.length>0?`Search results for "${query}" of ${author.username}`:`No results for "${query}"`;
    res.render('internships/index', { data: { internships: internships ,message:message} })

}