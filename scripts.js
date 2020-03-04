
class Game_Controller {
    constructor(){
        this.tile_colors = ['A', 'B', 'C', 'D', 'E'];
        this.tiles = [];
    }
}



class Playing_Area {
    constructor() {
        this.rows = [];
        this.populate();

    }

    populate() {
        for (let i = 0; i < 5; i++) {
            this.rows.push(new Row(i + 1));
        }
    }
}

class Row {
    constructor(max_number) {
        this.row_number = max_number;
        this.max_number = max_number;
        this.staging;
        this.wall;
        this.init_staging();
        this.init_wall();

    }

    init_staging() {

        this.staging = new Staging_Row(this.row_number);

    }


    init_wall(){
        this.wall = new Wall_Row(this.row_number);
    }

    available_wall_colors(){
        let available_colors = [];
        this.wall.spots.forEach(function(spot) {
            if (spot.placed_tile === null) {
                available_colors.push(spot.allowed_color);
            }
        })

        console.log(available_colors);
        // this.staging.allowed_colors = available_colors;
        return available_colors;
    }

    available_staging_colors(){
        if (this.staging.is_empty()){
            this.staging.allowed_colors = this.available_wall_colors();
            return this.available_wall_colors();

        } else if (this.staging.is_full()) {

            this.staging.allowed_colors = [];
            return [];

        } else if (this.staging.has_tiles()){

            this.staging.allowed_colors = this.staging.get_current_color();
            return this.staging.get_current_color();
        }
    }

    next_empty_staging_spot(){
        
        for (let i=0; i<this.staging.spots.length; i++){
            if (this.staging.spots[i].placed_tile === null){
                return this.staging.spots[i];
            }
        }
    }

    place_staging_tile(tile){

        // if (this.staging.has_tiles()){
        //     if (this.staging.is_full()){
        //         return tile;
        //     } else {
        //         this.staging.get_current_color();
        //     }
        // } else {

        // }

        this.available_staging_colors();
        if (this.staging.is_full()){
            return tile;
        } else if (this.staging.allowed_colors.includes(tile.color)){ //FIXX

            let empty_space = this.next_empty_staging_spot();

            empty_space.place_tile(tile);

            // this.staging.spots.forEach(function(spot){
            //     if (spot.placed_tile === null){
            //         spot.place_tile(tile);
            //         return;
            //     } 
            // })


        } else {

            return tile;

        }
    }

}

class Staging_Row {
    constructor(max_number) {
        this.max_number = max_number;
        this.spots = [];
        this.allowed_colors = colors;
        this.initialize();
    }

    initialize() {
        for (let i = 0; i < this.max_number; i++) {
            this.spots.push(new Staging_Spot());
        }
    }

    is_empty() {
        for (let i = 0; i < this.max_number; i++) {
            if (this.spots[i].placed_tile != null) {
                return false;
            }
        }

        console.log(true);
        return true;
    }

    is_full() {
        for (let i = 0; i < this.max_number; i++) {
            if (this.spots[i].placed_tile === null) {
                return false;
            }
        }

        return true;
    }

    has_tiles(){
        for (let i=0; i<this.max_number; i++) {
            if (this.spots[i].placed_tile != null){
                return true;
            } 
        }

        return false;
    }

    get_current_color(){
        if (this.spots[0].placed_tile != null) {
            this.allowed_colors = [this.spots[0].placed_tile.color];
            console.log(this.allowed_colors);
            return this.spots[0].placed_tile.color;
        }
    }




}


class Wall_Row {

    constructor(row_number) {
        this.row_number = row_number;
        this.spots = [];
        this.initialize();
    }

    initialize() {
        for (let i=0; i<5; i++){
            this.spots.push(new Wall_Spot(colors[(this.row_number + i) % 5]));
        }
    }

    get_allowed_colors(){
        let allowed_colors = [];
        console.log(this.spots);
        this.spots.forEach(function(spot){
            if (spot.placed_tile === null){
                allowed_colors.push(spot.allowed_color);
            }
        })

        return allowed_colors;


    }

    place_tile(tile){
        // let tile_color = tile.color;

        this.spots.forEach(function(spot){
            if (spot.allowed_color === tile.color){

                // JUST FOR TESTING :
                if (!(spot.placed_tile === null)){
                    console.log('already placed!');
                    return tile;
                }
                // END TESTING IF

                spot.placed_tile = tile;
                console.log("placed: ", spot);
                return true;
            }
        })

        // first make sure has allowed colors
    }

}



class Wall_Spot {
    
    constructor(allowed_color){
        this.allowed_color = allowed_color;
        this.placed_tile = null;
    }

}


class Staging_Spot {
    constructor() {
        
        this.placed_tile = null;

    }

    place_tile(tile){
        this.placed_tile = tile;
    }


}

class Tile {
    constructor(color) {
        this.color = color;
    }
}








// TESTING:





let colors = ['A', 'B', 'C', 'D', 'E'];
let test_tiles = [];

colors.forEach(function(color){
    for (let i=0; i<20; i++){
        test_tiles.push(new Tile(color));
    }
})



function pick_random_tiles() {
    let shuffled = test_tiles.sort(() => 0.5 - Math.random());

    // Get sub-array of first n elements after shuffled
    let selected = shuffled.slice(0, 8);

    return selected;
}


function random_playing_area() {

    let random_tiles = pick_random_tiles();

    let area = new Playing_Area();


    // place random tiles on random wall spaces
    // Note: can only place valid tiles 
    for (let i=0; i<random_tiles.length; i++){
        let row = Math.ceil(Math.random() * 4);
        area.rows[row].wall.place_tile(random_tiles[i]);
    }

    return area;


}

function display_playing_area(area){
    area.rows.forEach(function(row){
        console.log('Row Number: ', row.row_number);

        let placed_staging_spots = [];
        row.staging.spots.forEach(function(staging_spot){
            placed_staging_spots.push(staging_spot.placed_tile);
        })

        console.log('Staging: ', placed_staging_spots);
    })
}


// let test_playing_area = new Playing_Area();
// console.log('TEST PLAYING AREA: ',test_playing_area);
// let test_row = test_playing_area.rows[3];
// let test_staging_row = test_row.staging;
// let test_wall_row = test_row.wall;

// console.log(test_playing_area.rows);
// console.log(test_staging_row);
// console.log(test_staging_row.is_empty());


// // console.log(test_playing_area.rows[3].spots.staging);



// console.log(test_wall_row.spots);
// console.log(test_wall_row.get_allowed_colors());

// test_wall_row.place_tile(test_tiles[40]);
// test_wall_row.place_tile(test_tiles[12]);
// test_row.place_staging_tile(test_tiles[92]);
// test_row.place_staging_tile(test_tiles[93]);


//Playing Area
let playing_table = document.getElementById('playing_area');
let table_rows = playing_table.getElementsByClassName("row");

// Test Interactive tiles
let tester_tile_color_picker = document.getElementById("testing_tiles");
let testing_tiles = tester_tile_color_picker.getElementsByClassName('tile');

let selected_color = 'A';

let placing_tile = new Tile('A'); // Testing placing tile

function select_tile(e){
    for (let i=0; i<testing_tiles.length; i++){
        testing_tiles[i].classList.remove('placed');
    }


    // darken selected
    this.classList.add('placed');

    selected_color = this.classList[1];

    placing_tile.color = selected_color;
    console.log(selected_color);
    
}

for (let i=0; i<testing_tiles.length; i++){
    testing_tiles[i].addEventListener('click', select_tile);
}

function place_on_staging(e){

}


function display_as_html(area){
    area.rows.forEach(function(row){

        let html_tr_index = row.row_number - 1;

        row.wall.spots.forEach(function(wall_spot){
            let td = document.createElement('td');
            td.classList.add('wall_spot');
            td.classList.add(wall_spot.allowed_color);

            if (wall_spot.placed_tile != null){
                td.classList.add('placed');
            }

            td.innerText = wall_spot.allowed_color;
            table_rows[html_tr_index].appendChild(td);

        })

        
        row.staging.spots.forEach(function(staging_spot){
            
            let td = document.createElement('td');
            td.classList.add('staging_spot');
            
            if (staging_spot.placed_tile != null){
                td.classList.add(staging_spot.placed_tile.color);
                td.classList.add('placed');
            }

            td.addEventListener('click', function(){
                row.place_staging_tile(placing_tile);
                
                if (staging_spot.placed_tile === placing_tile){
                    td.classList.add(staging_spot.placed_tile.color);
                    td.classList.add('placed');
                }

                
            })

            // td.innerText = staging_spot.placed_tile;
            table_rows[html_tr_index].appendChild(td);

        })



        
    })


}

// display_as_html(test_playing_area);

let test_area = random_playing_area();
display_as_html(test_area);


// Testing visual placing in staging




