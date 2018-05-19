function getGeoCode(latitude, longitude){
    var lat = latitude;
    var long = longitude;
    var responseJSON;

    var uri = 'https://developers.zomato.com/api/v2.1/geocode?lat=' + lat + '&lon=' + long;

    var xhr = new XMLHttpRequest();
    xhr.open("GET", uri, true);
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.setRequestHeader('user-key', 'a5d7d8b6e3bcbabee209e2b105999150');
    
    xhr.onload = function () {
        responseJSON = JSON.parse(xhr.responseText);
        console.log(responseJSON);
        setInfo(responseJSON);
    }
    xhr.send(null);

}

function getMenu(id){

    var menuJSON;
    menu_uri = 'https://developers.zomato.com/api/v2.1/dailymenu?res_id=' + id;
    var xhr2 = new XMLHttpRequest();
    xhr2.open("GET", menu_uri, true);
    xhr2.setRequestHeader('Accept', 'application/json');
    xhr2.setRequestHeader('user-key', 'a5d7d8b6e3bcbabee209e2b105999150');
    xhr2.onload = function (){
        menuJSON = JSON.parse(xhr2.responseText);
    }
    xhr2.send(null);
    return menuJSON;
}

function setInfo(responseJSON){
    for(var i = 0; i <responseJSON.nearby_restaurants.length; i++){

        console.log('name:', responseJSON.nearby_restaurants[i].restaurant.name);
        console.log('address:', responseJSON.nearby_restaurants[i].restaurant.location.address);
        console.log('cuisine:', responseJSON.nearby_restaurants[i].restaurant.cuisines);
        console.log('average cost:', '$' + responseJSON.nearby_restaurants[i].restaurant.average_cost_for_two);
        console.log('rating:', responseJSON.nearby_restaurants[i].restaurant.user_rating.aggregate_rating);
        console.log('photo url:', responseJSON.nearby_restaurants[i].restaurant.featured_image);
        console.log('menu:', getMenu(responseJSON.nearby_restaurants[i].restaurant.id));
        console.log('-------------------------')
        
    }
}

window.onload = function () {
    getGeoCode(-36.852515, 174.768618);
}