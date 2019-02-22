const request = require('request-promise');

module.exports = {
    getCities: async () => {
        const response = await request('http://geoapi.sanalonyedi.net/v1/cities?fields=name,geolocation.lat,geolocation.lon').then((body) => {
            return JSON.parse(body);
        });
        
        return response;
    },
    getTowns: async (id) => {
        const response = await request('http://geoapi.sanalonyedi.net/v1/cities/'+id+'/towns?fields=name,geolocation.lat,geolocation.lon').then((body) => {
            return JSON.parse(body);
        });
        
        return response;
    },
    getDistricts: async (id) => {
        const response = await request('http://geoapi.sanalonyedi.net/v1/towns/'+id+'/districts').then((body) => {
            return JSON.parse(body);
        });
        
        return response;
    },
    getNeighborhoods: async (id) => {
        const response = await request('http://geoapi.sanalonyedi.net/v1/towns/'+id+'/neighborhoods').then((body) => {
            return JSON.parse(body);
        });
        
        return response;
    }
   
 
    

}