//Interne voorstelling van de puzzel als een tweedimensionale lijst
let my_time = 0
let my_puzzle = [[0, 1, 2],
              [7, 4, 8],
              [3, 5, 6]];

//Wanneer de volledige HTML-pagina geladen is wordt onderstaande functie uitgevoerd
window.onload = function(){
    draw_puzzle(my_puzzle);
    draw_timer(my_time);
}

//Deze functie neemt als invoer de lijstrepresentatie van onze puzzel
//
function draw_puzzle(puzzle){
    let puzzle_html = generate_puzzle_html(puzzle);
    document.getElementById("puzzle_container").innerHTML = puzzle_html;
}
function draw_timer(time){
    let timer_html = timer_string_generator(time);
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
            html_string += `<td onclick="square_click_handler(this)" class='my_class'>${puzzle[row][col]}</td>`
        }
        html_string += "</tr>"
    }
    html_string += "</tbody></table>";
    return html_string;
}

function check_game_complete(puzzle){
    let correct_puzzle = [[1, 2, 3],
                          [4, 5, 6],
                          [7, 8, 0]];
    let rows = 3
    let cols = 3
    
    for(let row=0; row < rows; row++){
        for(let col = 0; col < cols; col++){
            if(puzzle[row][col] != correct_puzzle[row][col])
                return false;
        }
    }
    return true;
}

function swap_empty_square(puzzle, given_row, given_col){
    let done = false;
    let rows = 3;
    let cols = 3;
    let empty_row = 0;
    let empty_col = 0;
    for(let row=0; (row < rows) && (done == false); row++){
        for(let col = 0; (col < cols) && (done == false); col++){
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

function square_click_handler(cell){
    let col = cell.cellIndex;
    let row = cell.parentNode.rowIndex;
    if(swap_empty_square(my_puzzle, row, col)){
        draw_puzzle(my_puzzle);
        if(check_game_complete(my_puzzle))
            alert("Proficiat!");
    }
}
function timer_string_generator(time){
    let seconds = time;
    hours = Math.floor(seconds / 3600)
    seconds %= 3600
    minutes = Math.floor(seconds / 60)
    seconds %= 60
    my_time += 1
    return `${hours}:${minutes}:${seconds}`
}




