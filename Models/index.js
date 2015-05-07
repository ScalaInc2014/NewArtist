var users = require('./Users');

/** 
 *  <h3>Description: Contains the Schemas's declarations and all the components associated to them.</h3>
    <ul> 
        <li> Users: Schemas and components related to Users.
            <ul>
                <li> artists.js: Artist Schema and own components.
                <li> fan.js: Fan Schema and own components.
                <li> user_components.js: User's shared components.
                <li> index.js: User's Schemas exportation.
            </ul>
            <br>
        <li>  mongoose.js: Configuration and connection to Data Base.    
        <li>  index.js: Exports the New Artists Schemas.       
    </ul> 
 * @module Models
*/



module.exports = {
    fan: users.fan,
    artist: users.artist
};