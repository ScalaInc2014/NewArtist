var sinon = require('sinon');
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
var expect = chai.expect;
var models = require('../../Models');
var configurations = require("../../Configurations");

configurations.dataBase();

var users = {
    
    firstFanUser : {
        fanId: '55cd1f6f12f6fc142002499d',
        info:{
            name: 'Nicolás Fernández',
            password: 'n1colas',
            email: 'fercholas2012@gmail.com',
            birthday: '1987-09-28T00:00:00Z',
            gender: 'masculino',
            avatarPath: 'http://www.nocturnar.com/forum/attachments/fondos-de-pantalla/28575d1338158805-paisajes-hermosos-fondo-de-pantalla-paisajes_hermosos_del_mundo2.jpg',
            location: 'Bogotá, Colombia'
        },
        registerDate: '2015-08-13T00:00:00Z',
        registerMode: 'manual',
        token: '55cd1f6f12f6fc142002499d',
    },
    
    firstArtistUser : {
        
        artistId: '55cd1f6f12f6fc142002499e',
        info:{
         
            name: 'Mike el Artista',
            password: 'm1guel',
            email: 'miguel9ramos@gmail.com',
            avatarPath: 'http://www.nocturnar.com/forum/attachments/fondos-de-pantalla/28575d1338158805-paisajes-hermosos-fondo-de-pantalla-paisajes_hermosos_del_mundo2.jpg',
            location: 'Belo Horizonte, Brasil'
            
        },
        artType: 'Teatro',
        registerDate: '2015-08-13T00:00:00Z',
        registerMode: 'manual',
        token: '55cd1f6f12f6fc142002499e',
    }
};

console.log("Estamos en tests file");
describe('user_components', function(){
    
    describe('registerUser()', function(){
        
        it('should register a fan user', function(){
            console.log("Estamos en tests");
            var fan = models['fan'];
            var result = fan.registerUser(users.firstFanUser);
            return expect(result).to.eventually.have.property('newUser').and.be.ok;
        });
    });
});