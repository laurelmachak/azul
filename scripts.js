


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

        this.staging = new Staging_Row(this.max_number);

    }


    init_wall(){
        this.wall = new Wall_Row(this.max_number);
    }

    available_wall_colors(){
        let available_colors = [];
        this.wall.spots.forEach(function(spot) {
            if (spot.placed_tile === null) {
                available_colors.push(spot.allowed_color);
            }
        })

        return available_colors;
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

console.log(test_tiles);

function randomly_populate_playing_area(area){


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


let test_playing_area = new Playing_Area();
console.log('TEST PLAYING AREA: ',test_playing_area);
let test_row = test_playing_area.rows[3];
let test_staging_row = test_row.staging;
let test_wall_row = test_row.wall;

console.log(test_playing_area.rows);
console.log(test_staging_row);
console.log(test_staging_row.is_empty());


// console.log(test_playing_area.rows[3].spots.staging);



console.log(test_wall_row.spots);
console.log(test_wall_row.get_allowed_colors());

test_wall_row.place_tile(test_tiles[40]);

// display_playing_area(test_playing_area);

let playing_table = document.getElementById('playing_area');
let table_rows = playing_table.getElementsByClassName("row");
console.log(table_rows);

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
            // td.innerText = staging_spot.placed_tile;
            table_rows[html_tr_index].appendChild(td);
        })



        
    })


}

display_as_html(test_playing_area);
