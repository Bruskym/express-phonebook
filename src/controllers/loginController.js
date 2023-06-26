const Login = require('../models/loginSchema')

exports.index = (req, res) => { 
    res.render('login')
}

exports.register = async (req, res) => {
    const login = new Login(req.body)
    try{
        await login.register()
        
        if(login.errors.length > 0){
            req.flash('errors', login.errors)
            req.session.save(() => {
                res.redirect('/login')
            })
            return
        }

        req.flash('success', 'Usuário criado com sucesso!')
        req.session.save(() => {
            res.redirect('/login')
        })
    }
    catch(e){
        console.log(e)
        res.render('404')
    }
   

}