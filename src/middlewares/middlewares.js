exports.varGrabber = (req, res, next) =>{
    res.locals.errors = req.flash('errors')
    res.locals.success = req.flash('success')
    next()
}

exports.sessionUserFetcher = (req, res, next) =>{
    res.locals.user = req.session.user
    next()
}

exports.checkError = (err, req, res, next) => {
    if(err) res.render('404')
}

exports.captureCsrfToken = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken()
    next()
}

exports.loginRequired = (req, res, next) => {
    if(!req.session.user){
        req.flash('errors', 'Você precisa estar logado para adicionar um novo contato')
        req.session.save(() => { return res.redirect('/') }) 
        return
    }
    next()
}