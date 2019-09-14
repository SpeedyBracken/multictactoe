import Crypt from '../services/crypt'

class Auth extends Crypt{
    set userData(data){
        const hashData = this.generateHash(data)
        localStorage.setItem('userData', hashData)
    }

    set userId(id){
        const hash = localStorage.getItem('userData')
        
        let data = this.getHashData(hash)
        data = {
            ...data,
            id: id.push(id)
        }

        this.userData = data
    }

    get userData(){
        const hash = localStorage.getItem('userData')
        return this.getHashData(hash)
    }

    logout(){
        localStorage.removeItem('userData')
    }
}

export default new Auth