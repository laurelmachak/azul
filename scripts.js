
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
        this.negatives = new Negative_Row();

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

        if (this.staging.has_tiles()){
            this.staging.allowed_colors = [this.staging.spots[0].placed_tile.color];
            console.log('this.staging.spots', this.staging.spots);
            if (this.staging.is_full()){
                return tile;
            } else {
                if (!(this.staging.allowed_colors.includes(tile.color))){
                    return tile;
                }
            }
        } else {

            this.staging.allowed_colors = this.available_wall_colors();
            console.log(this.staging.av)
            if (!(this.staging.allowed_colors.includes(tile.color))){
                return tile;
            }

        }

        console.log('allowed colors', this.staging.allowed_colors);
        let empty_space = this.next_empty_staging_spot();
        empty_space.place_tile(tile);
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
            console.log('staging_row.allowed_colors', this.allowed_colors);
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

class Negative_Row {

    constructor(){
        this.values = [-1, -1, -2, -2, -2, -3, -3];
        this.spots = [];
        this.initialize();
    }

    initialize(){
        for (let i=0; i<this.values.length; i++){
            this.spots.push(new Negative_Spot(this.values[i]));
        }
    }

}

class Negative_Spot {

    constructor(value) {
        this.value = value;
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

