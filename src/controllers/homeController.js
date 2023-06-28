const { async } = require('regenerator-runtime')
const Contact = require('../models/registerSchema')

exports.index = async (req, res, next) => {
    const contatos = await Contact.listContacts()
    res.render('index', { contatos })
}