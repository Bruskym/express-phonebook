const { async } = require('regenerator-runtime')
const Contact = require('../models/registerSchema')

exports.index = (req, res) => {
    res.render('contato', {contato: {}})
}

exports.register = async (req, res) => {
    const contato = new Contact(req.body)
    
    try{
        await contato.register()

        if(contato.errors.length > 0){
            req.flash('errors', contato.errors)
            req.session.save(() => {
                res.redirect('/contato')
            })
            return
        }

        req.flash('success', 'Contato adicionado com sucesso!')
        req.session.save(() => {
            res.redirect(`${contato.contact._id}`)
        })

    }
    catch(e){
        console.log(e)
    }
}

exports.editIndex = async (req, res) => {
    if(!req.params.id) return res.render('404')
    const contato = await Contact.findbyID(req.params.id)
    if(!contato) return res.render('404')
    res.render('contato', {contato})
}

exports.edit = async (req, res) => {
    if(!req.params.id) return res.render('404')

    const contato = new Contact(req.body)
    try{
        await contato.edit(req.params.id)

        if(contato.errors.length > 0){
            req.flash('errors', contato.errors)
            req.session.save(() => {
                res.redirect(`/contato/${req.params.id}`)
            })
            return
        }

        req.flash('success', 'Contato atualizado com sucesso!')
        req.session.save(() => {
            res.redirect(`/contato/${contato.contact._id}`)
        })

    }
    catch(e){
        console.log(e)
    }
}

exports.delete = async (req, res) => {
    if(!req.params.id) return res.render('404')
    const contato = await Contact.removebyID(req.params.id)
    if(!contato) return res.render('404')
    
    req.flash('success', 'Contato excluido com sucesso!')
        req.session.save(() => {
            res.redirect(`/`)
        })

}