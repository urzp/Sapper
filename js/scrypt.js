var Sapper = Sapper || {};

Sapper.Board = {};
Sapper.constructors ={};
Sapper.Board.Cells = [];

Sapper.Board.init_board = function(){
    Sapper.Board.create_cells()
    Sapper.Board.set_numbers()
};
Sapper.Board.create_cells = function(){
var i,x,y,count_mines=0, mine;
    i=0;
    for(y = 0; y<10; y++){
        Sapper.Board.Cells[y] = [];
        for(x = 0; x<10; x++){
            if ((Math.floor(Math.random()*10) > 5) && (count_mines<=10) ){
                count_mines++;
                mine = "mine";
            } else { mine = ""; }
            Sapper.Board.Cells[y][x] = new Sapper.constructors.Cell(x,y,mine);
            i++;
        }
    } 
}
Sapper.Board.set_numbers = function(){
    Sapper.Board.Cells.forEach(function(row,i){
        row.forEach(function(cell,x){
           cell.content = Sapper.Board.count_mines(); 
        }) 
    });

}

Sapper.Board.count_mines = function(cell){

    
}

Sapper.constructors.Cell = function(x,y,content){
  this.position = [x,y];
  this.open = false;
  this.content = content;
};





Sapper.Board.init_board();

/*
Sapper.define = function(namespace){
    var parts = namespace.split("."),
        parent = Sapper,
        i;

    if (parts[0] == "Sapper") {
        parts = parts.slice(1);
    }

    for(i = 0; i < parts.length; i++){

        if (typeof parent[parts[i]] == "undefind") {
           parent[parts[i]] = {}; 
        }

        parent = parent[parts[i]];
    }
      return    parent;
};

*/


