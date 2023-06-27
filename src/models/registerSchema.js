const mongoose = require('mongoose')
const {Schema} = mongoose

const contactSchema = new Schema({
    nome: {type: String, required: true},
    sobrenome: {type: String, required: false, default: ''},
    telefone: {type: String, required: true},
    criadoEm: {type: Date, default: Date.now},
})

const contactModel = mongoose.model('contact', contactSchema)

class Contact{
    constructor(body){
        this.body = body
        this.errors = []
        this.contact = null
    }

    static async findbyID(id){
        if(typeof(id) !== 'string') return 
        const user = await contactModel.findById(id)
        return user
    }

    async register(){
        this.validate()
        if (this.errors.length > 0) return
    
        try{
            this.contact = await contactModel.create(this.body)
        }
        catch(e){
            console.log(e)
        }
    }

    async edit(id){
        if(typeof(id) !== 'string') return
        this.validate()
        if (this.errors.length > 0) return
    
        this.contact = await contactModel.findByIdAndUpdate(id, this.body, {new : true})
    }

    validate(){
        this.cleanData()

        if(!this.body.nome) this.errors.push('Você precisa informar um nome para seu contato')
        if(!this.body.telefone) this.errors.push('Você precisa informar um telefone para seu contato')

    }

    cleanData(){
        for(let key in this.body){
            if(typeof(this.body[key]) !== 'string'){
                this.body[key] = ''
            }
        }

        this.body = {
            nome : this.body.nome,
            sobrenome : this.body.sobrenome,
            telefone : this.body.telefone,
        }

    }
}

module.exports = Contact