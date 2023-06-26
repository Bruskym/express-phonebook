const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const {Schema} = mongoose


const loginSchema = new Schema({
    email : {type: String, required: true},
    password : {type: String, required: true}
})

const loginModel = mongoose.model('login', loginSchema)

class Login {
    constructor(body){
        this.body = body
        this.errors = []
        this.user = null
    }

    async register(){
        this.validate()
        await this.userExists()

        if(this.errors.length === 0){
            const salt = bcrypt.genSaltSync()
            this.body.password = bcrypt.hashSync(this.body.password, salt)
            try{
                this.user = await loginModel.create(this.body)
            }
            catch(e){
                console.log(e)
            }
        }
    }

    async userExists(){
        const user = await loginModel.findOne({email: this.body.email})
        if(user) this.errors.push('Email já cadastrado!')
    }

    validate(){
        this.cleanData()
        if(!validator.isEmail(this.body.email)) this.errors.push('Email inválido')
        
        if(this.body.password.length < 3 || this.body.password.length > 50 ) this.errors.push('A senha precisa ter entre 3 e 50 caracteres')
        
    }

    cleanData(){
        for (let key in this.body){
            if (typeof(this.body[key]) !== 'string'){
                this.body[key] = ''
            }
        }

        this.body = {
            email: this.body.email,
            password: this.body.password
        }
    }

}

module.exports = Login