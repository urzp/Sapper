
var Sapper = Sapper || {};

Sapper.constants ={};
// [y,x]
Sapper.constants.neighbors = [ [-1,0],[-1,1],[0,1],[1,1],[1,0],[1,-1],[0,-1],[-1,-1] ];

Sapper.Board = {};
Sapper.constructors ={};
Sapper.Board.Cells = [];

Sapper.Board.init_board = function(){
    Sapper.Board.create_cells()
    Sapper.Board.set_numbers()
    Sapper.Board.render()
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
            if (cell.content != "mine"){
                cell.content = Sapper.Board.count_near_mines(cell); 
            }
            
        }) 
    });

}
Sapper.Board.count_near_mines = function(cell){
    var x,y,mine_count=0;
    Sapper.constants.neighbors.forEach(function(der,i){
        y = der[0]+cell.position[0];
        x = der[1]+cell.position[1];
        if ((y >= 0)&&(x >= 0)&&(x < 10)&&(y < 10)){
            //alert( (Sapper.Board.Cells[y][x]).content == "mine" )
            if ((Sapper.Board.Cells[y][x]).content == "mine"){
                mine_count++;
            }
        }
    })
     return mine_count;
}
Sapper.Board.render = function(){
    //$("#cell00").append("<p>1</p>");
    //alert($("#cell01"));
    Sapper.Board.Cells.forEach(function(row,i){
        row.forEach(function(cell,x){
            id_cell = '#cell'+(cell.position[0]).toString(16)+(cell.position[1]).toString(16);
            if (cell.content != "mine"){
                $(id_cell).append("<p>"+(cell.content).toString(16)+"</p>");
            }else{
               $(id_cell).append('<img src="img/mine.png" alt="">');
            }
            
        }) 
    }); 
}

Sapper.constructors.Cell = function(x,y,content){
  this.position = [y,x];
  this.open = false;
  this.content = content;
};



$('document').ready( function(){
    Sapper.Board.init_board();
})

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


