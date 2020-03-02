


class Playing_Area{
    constructor(){
        this.rows = [];
        this.populate();

    }

    populate(){
        for (let i=0; i<5; i++){
            this.rows.push(new Row(i + 1));
        }
    }
}

class Row{
    constructor(max_number){
        this.max_number = max_number;
        // this.spots = [[], []]; // might change to obj with staging & wall keys...or move to other objects..
        this.spots = {};
        this.populate_staging();
        // this.populate_wall();
        
    }

    populate_staging(){

        this.spots['staging'] = new Staging_Row(this.max_number);

        // for (let i=0; i<this.max_number; i++){
        //     // pop with Staging_Spots instead of null
        //     this.spots[0].push(new Staging_Spot());
        // }
        

    }

    // populate_wall(){
    //     for (let i=0; i<5; i++){
    //         // will populate with Wall_Spots instead of null
    //         this.spots[1].push(null);
    //     }
    // }
}

class Staging_Row{
    constructor(max_number){
        this.max_number = max_number;
        this.spots = [];
        this.populate();
    }

    populate(){
        for (let i=0; i<this.max_number; i++){
            this.spots.push(new Staging_Spot());
        }
    }

    is_empty(){
        for (let i=0; i<this.max_number; i++){
            if (this.spots[i].placed_tile != null){
                return false;
            }
        }

        return true;
    }
}

class Staging_Spot{
    constructor(){
        this.allowed_colors = colors; // list of all colors at first
        this.placed_tile = null;
        
    }

    
}

class Tile{
    constructor(color){
        this.color = color;
    }
}






// TESTING:
let colors = ['A', 'B', 'C', 'D', 'E'];


let test_playing_area = new Playing_Area();
console.log(test_playing_area.rows);