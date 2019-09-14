export default class Crypt {
    generateHash(data){
        return btoa(data)
    }
    
    getHashData(hash){
        return atob(hash)
    }
}