//Interne voorstelling van de puzzel als een tweedimensionale lijst
let my_time = 0;
let puzzle_rows_total = 3;
let puzzle_cols_total = 3;
let my_puzzle = undefined;
let timer_html = "";

//Wanneer de volledige HTML-pagina geladen is wordt onderstaande functie uitgevoerd
window.onload = start_game;

function start_game(){
    my_time = 0;
    my_puzzle = generate_puzzle(puzzle_rows_total, puzzle_cols_total);
    draw_puzzle(my_puzzle);
    draw_timer(my_time);
    timer = setInterval('draw_timer(my_time)',1000);
}

//Deze functie neemt als invoer de lijstrepresentatie van onze puzzel
//
function draw_puzzle(puzzle){
    let puzzle_html = generate_puzzle_html(puzzle);
    document.getElementById("puzzle_container").innerHTML = puzzle_html;
}
function draw_timer(time){
    timer_html = update_time(time);
    document.getElementById("timer_container").innerHTML = timer_html;
}

function generate_puzzle_html(puzzle){
    //TODO: Implementeer deze functie!
    //puzzle bevat een tweedimensionale lijst die de sliding puzzle voorstelt
    //Kijk naar de functie generate_board_html in voorbeeld 7 uit het hoorcollege voor inspiratie
    let html_string = "<table><tbody>";
    let rows = puzzle.length;
    let cols = puzzle[0].length;
    for(let row=0; row < rows; row++){
        html_string += "<tr>"
        for(let col = 0; col < cols; col++){
            let innervalue = puzzle[row][col]
            let css_class = "my_class "
            if(innervalue == 0){
                innervalue = "";
                css_class = "my_class zero_square"
            }

            html_string += `<td onclick="square_click_handler(this)" class=\"${css_class}\">${innervalue}</td>`
        }
        html_string += "</tr>"
    }
    html_string += "</tbody></table>";
    return html_string;
}

function check_game_complete(puzzle){
    let i = 1;
    for(let row=0; row < puzzle_rows_total; row++){
        for(let col = 0; col < puzzle_cols_total; col++){
            if(puzzle[row][col] != (i % (puzzle_rows_total * puzzle_cols_total)))
                return false;
            i++;
        }
    }
    return true;
}

function swap_empty_square(puzzle, given_row, given_col){
    let done = false;
    let empty_row = 0;
    let empty_col = 0;
    for(let row=0; (row < puzzle_rows_total) && (done == false); row++){
        for(let col = 0; (col < puzzle_cols_total) && (done == false); col++){
            if(puzzle[row][col] == 0){
                done = true;
                empty_row = row;
                empty_col = col;
            }
        }
    }
    if(Math.abs(empty_row - given_row) +  Math.abs(empty_col - given_col) == 1){
        puzzle[empty_row][empty_col] = puzzle[given_row][given_col];
        puzzle[given_row][given_col] = 0;
        return true;
    }
    else{
        return false;
    }
}

function generate_puzzle(rows, cols){
    let squares = rows * cols;
    let squares_list = new Array(squares);
    //Initialize the list with all needed values
    for(let i = 0; i < squares; i++){
        squares_list[i] = i;
    }
    //Shuffling the array 
    //source: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    for(let i = squares - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [squares_list[i], squares_list[j]] = [squares_list[j], squares_list[i]];
    }


    let puzzle = new Array(rows);
    for(let row = 0; row < rows; row++){
        puzzle[row] = new Array(cols);
        for(let col = 0; col < cols; col++){
            puzzle[row][col] = squares_list[row * cols + col];
        }
    }
    return puzzle;
}


function square_click_handler(cell){
    let col = cell.cellIndex;
    let row = cell.parentNode.rowIndex;
    if(swap_empty_square(my_puzzle, row, col)){
        draw_puzzle(my_puzzle);
        if(check_game_complete(my_puzzle)){
            clearInterval(timer);
            alert(`Proficiat, uw tijd: ${timer_html}.`);
            start_game()
        }
    }
}

function update_time(time){
    let seconds = time;
    hours = Math.floor(seconds / 3600);
    seconds %= 3600;
    minutes = Math.floor(seconds / 60);
    seconds %= 60;
    my_time += 1;
    return `${hours}:${minutes}:${seconds}`;
}

function solve(){
    let puzzle = new Array(puzzle_rows_total);
    let i = 1;
    for(let row = 0; row < puzzle_rows_total; row++){
        puzzle[row] = new Array(puzzle_cols_total);
        for(let col = 0; col < puzzle_cols_total; col++){
            puzzle[row][col] = (i % (puzzle_rows_total * puzzle_cols_total));
            i++;
        }
    }
    my_puzzle = puzzle;
    draw_puzzle(my_puzzle);
    
}

function change_puzzle_size(){
    let rows = document.getElementById("rows").value;
    let cols = document.getElementById("cols").value;

    puzzle_rows_total = rows;
    puzzle_cols_total = cols;
    clearInterval(timer);
    start_game();
}

