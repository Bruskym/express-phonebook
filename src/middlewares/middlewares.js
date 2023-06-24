exports.checkError = (err, req, res, next) => {
    if(err) res.render('404')
}

exports.captureCsrfToken = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken()
    next()
}