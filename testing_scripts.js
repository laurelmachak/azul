
let colors = ['A', 'B', 'C', 'D', 'E'];
let test_tiles = [];

//Playing Area
let playing_table = document.getElementById('playing_area');
let table_rows = playing_table.getElementsByClassName("row");

colors.forEach(function (color) {
    for (let i = 0; i < 20; i++) {
        test_tiles.push(new Tile(color));
    }
})






function assert_spots_equal(expected_spot, actual_spot) {

    // if no placed_tile then spot_val is null, otherwise spot_val is color of placed_tile
    let expected_val = (expected_spot.placed_tile === null) ? null : expected_spot.placed_tile.color;
    let actual_val = (actual_spot.placed_tile === null) ? null : actual_spot.placed_tile.color;


    if (actual_val != expected_val) {
        throw new Error(`SPOTS DO NOT MATCH: EXPECTED: ${expected_val} TESTED: ${actual_val}`);

    }


}

function assert_wall_spots_allowed_colors(expected_colors, row){
    // expect list with allowed colors in order e.g. [D, E, A, B, C]
    // actual wall row then have to iterate over spots for allowed colors and compare against
}



function run_wall_row_creation_test(row_number, expected_colors) {
    // create a row and place a tile
    let row = new Wall_Row(row_number);
    // row should have row_number spots
    // assert row.spots.length = row_number; make assertion method
    // assert_equals(5, row.spots.length);
    // assert_equals(row_number, row.row_number);

    assert_wall_spots_allowed_colors(expected_colors, row);

    // ['A', 'B', 'C', 'D', 'E']
}

function test_wall_row_creation(){
    run_wall_row_creation_test(1, ['A', 'B', 'C', 'D', 'E']);
    run_wall_row_creation_test(2, ['E', 'A', 'B', 'C', 'D']); 
    run_wall_row_creation_test(3, ['D', 'E','A', 'B', 'C']);
    run_wall_row_creation_test(4, ['C', 'D', 'E', 'A', 'B']);
    run_wall_row_creation_test(5, ['B', 'C', 'D', 'E', 'A']);
}

function run_test_suite(){
    run_test_suite(test_wall_row_creation);
     // add new lines for each tests;

    
}

function run_test_case(test_function){

    try {
        test_function(); // invoke test_function
    } catch (error) {
        console.log(error);
    }
}









function compare_staging_rows(expected_row, test_row) {
    let expected_staging_spots = expected_row.staging.spots;
    let test_staging_spots = test_row.staging.spots;

    // compare staging

    for (let i = 0; i < expected_staging_spots.length; i++) {
        console.log(`expected_staging_spot: ${expected_staging_spots[i]}`, `test_staging_spot: ${test_staging_spots[i]}`);

        if (expected_staging_spots[i].placed_tile === null) {

            if (test_staging_spots[i].placed_tile != null) {
                console.log(`expected: ${expected_staging_spots[i].placed_tile}, but got ${test_staging_spots[i].placed_tile}`);
                return false;
            }



        } else if (expected_staging_spots[i].placed_tile.color != test_staging_spots[i].placed_tile.color) {

            console.log(`expected: ${expected_staging_spots[i].placed_tile.color}, but got ${test_staging_spots[i].placed_tile.color}`);
            return false;
        }
    }

}

function generate_blank_board_html() {

    for (let r = 0; r < 5; r++) {
        for (let i = 0; i < 5; i++) {
            let td = document.createElement('td');
            td.classList.add('wall_spot');
            table_rows[r].appendChild(td);
        }

    }

    for (let r = 0; r < 5; r++) {
        for (let i = 0; i < r + 1; i++) {
            let td = document.createElement('td');
            td.classList.add('staging_spot');
            table_rows[r].appendChild(td);
        }
    }

}



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
    for (let i = 0; i < random_tiles.length; i++) {
        let row = Math.ceil(Math.random() * 4);
        area.rows[row].wall.place_tile(random_tiles[i]);
    }

    random_tiles = pick_random_tiles();

    for (let i = 0; i < random_tiles.length; i++) {
        let row = Math.ceil(Math.random() * 4);
        area.rows[row].place_staging_tile(random_tiles[i]);
    }

    return area;


}

function display_playing_area(area) {

    area.rows.forEach(function (row) {

        let wall_spots = table_rows[row.row_number - 1].getElementsByClassName('wall_spot');

        for (let i = 0; i < 5; i++) {
            let td = wall_spots[i];
            td.classList.add(row.wall.spots[i].allowed_color);

            if (row.wall.spots[i].placed_tile != null) {
                td.classList.add('placed');
            }
        }

        let staging_spots = table_rows[row.row_number - 1].getElementsByClassName('staging_spot');

        for (let i = 0; i < staging_spots.length; i++) {
            let td = staging_spots[i];

            if (row.staging.spots[i].placed_tile != null) {
                td.classList.add(row.staging.spots[i].placed_tile.color);
                td.classList.add('placed');
            }
        }

    })

}




// Test Interactive tiles
let tester_tile_color_picker = document.getElementById("testing_tiles");
let testing_tiles = tester_tile_color_picker.getElementsByClassName('tile');

let selected_color = 'A';

let placing_tile = new Tile('A'); // Testing placing tile

function select_tile(e) {
    for (let i = 0; i < testing_tiles.length; i++) {
        testing_tiles[i].classList.remove('placed');
    }


    // darken selected
    this.classList.add('placed');

    selected_color = this.classList[1];

    placing_tile.color = selected_color;
    console.log(selected_color);

}

for (let i = 0; i < testing_tiles.length; i++) {
    testing_tiles[i].addEventListener('click', select_tile);
}

function place_on_staging(e) {

}


function display_as_html(area) {
    area.rows.forEach(function (row) {

        let html_tr_index = row.row_number - 1;

        row.wall.spots.forEach(function (wall_spot) {
            let td = document.createElement('td');
            td.classList.add('wall_spot');
            td.classList.add(wall_spot.allowed_color);

            if (wall_spot.placed_tile != null) {
                td.classList.add('placed');
            }

            td.innerText = wall_spot.allowed_color;
            table_rows[html_tr_index].appendChild(td);

        })


        row.staging.spots.forEach(function (staging_spot) {

            let td = document.createElement('td');
            td.classList.add('staging_spot');

            if (staging_spot.placed_tile != null) {
                td.classList.add(staging_spot.placed_tile.color);
                td.classList.add('placed');
            }

            // td.innerText = staging_spot.placed_tile;
            table_rows[html_tr_index].appendChild(td);

        })

    })


}

// display_as_html(test_playing_area);

// let test_area = random_playing_area();
// display_as_html(test_area);
generate_blank_board_html();
let test_area = random_playing_area();
display_playing_area(test_area);
// console.log(table_rows);

compare_staging_rows(test_area.rows[2], test_area.rows[2]);

// Testing visual placing in staging




