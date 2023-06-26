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

    async login(){
        this.validate()
        if(this.errors.length > 0) return

        this.user = await this.isUserExists()

        if(!this.user) {
            this.errors.push('Usuário não encontrado')
            return
        }

        if(!bcrypt.compareSync(this.body.password, this.user.password)){
            this.errors.push('Senha inválida')
            this.user = null
            return
        }
    }

    async register(){
        this.validate()
        await this.isUserCreated()

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

    async isUserExists(){
        const user = await loginModel.findOne({email: this.body.email})
        return user
    }

    async isUserCreated(){
        this.user = await this.isUserExists()
        if(this.user) this.errors.push('Email já cadastrado!')
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