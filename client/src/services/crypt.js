export default class Crypt {
    generateHash(data){
        return new Buffer(JSON.stringify(data)).toString('base64')
    }
    
    getHashData(hash){
        return JSON.parse(hash)
    }
}