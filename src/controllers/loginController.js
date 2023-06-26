const { async } = require('regenerator-runtime')
const Login = require('../models/loginSchema')

exports.index = (req, res) => { 
    if(!req.session.user){ //pagina de login só vai ser mostrada se o user n tiver logado
        res.render('login')
        return
    }
    res.render('logado')
}

exports.login = async (req, res) => {
    const login = new Login(req.body)

    try{
        await login.login()
        
        if(login.errors.length > 0){
            req.flash('errors', login.errors)
            req.session.save(() => {
                res.redirect('/login')
            })
            return
        }

        req.flash('success', 'Sessão iniciada com sucesso')
        req.session.user = login.user
        req.session.save(() => {
            res.redirect('/login')
        })
    }
    catch(e){
        console.log(e)
        res.render('404')
    }
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

exports.logout = (req, res) => {
    req.session.destroy()
    res.redirect('/')
} 