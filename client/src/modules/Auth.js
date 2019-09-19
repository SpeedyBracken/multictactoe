import Crypt from '../services/crypt'

class Auth extends Crypt{
    set userData(data){
        data = {
            ...data,
            id: []
        }
        const hashData = this.generateHash(data)
        localStorage.setItem('userData', hashData)
    }

    set userId(id){
        const hash = localStorage.getItem('userData')
        
        let data = JSON.parse(this.getHashData(hash))
        console.log('data', data)
        data.id.push(id)

        const hashData = this.generateHash(data)
        localStorage.setItem('userData', hashData)
    }

    get userData(){
        const hash = localStorage.getItem('userData')
        if (!hash) return false

        const data = this.getHashData(hash)
        return JSON.parse(data)
    }

    logout(){
        localStorage.removeItem('userData')
    }
}

export default new Auth