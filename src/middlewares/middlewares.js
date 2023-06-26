exports.varGrabber = (req, res, next) =>{
    res.locals.errors = req.flash('errors')
    res.locals.success = req.flash('success')
    next()
}


exports.checkError = (err, req, res, next) => {
    if(err) res.render('404')
}

exports.captureCsrfToken = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken()
    next()
}