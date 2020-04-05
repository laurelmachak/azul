
function assert_wall_spots_allowed_colors(expected_colors, row){
    // expect list with allowed colors in order e.g. [D, E, A, B, C]
    // actual wall row then have to iterate over spots for allowed colors and compare against

    let wall_spots = row.spots;

    for (let i=0; i<wall_spots.length; i++){
        let actual_color = wall_spots[i].allowed_color;
        let expected_color = expected_colors[i]; 
        if (actual_color != expected_color){
            throw new Error(`Wall_Spot_Allowed_Color_Error: EXPECTED: ${expected_color} ACTUAL: ${actual_color}, ROW_NUMBER: ${row.row_number}`);
        }
    }

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

console.log("=======START TESTS=========")
// run_test_suite();
// run_test_suite(test_wall_row_creation);

try {
    test_wall_row_creation();
} catch (error) {
    console.log(error);
}