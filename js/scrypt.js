
var Sapper = Sapper || {};

Sapper.constants ={};
// [y,x]
Sapper.constants.neighbors = [ [-1,0],[-1,1],[0,1],[1,1],[1,0],[1,-1],[0,-1],[-1,-1] ];

Sapper.Board = {};
Sapper.constructors ={};
Sapper.Board.Cells = [];



Sapper.Board.init_board = function(){
    Sapper.Board.create_cells()
    Sapper.Board.mines_set()
    Sapper.Board.set_numbers()
    Sapper.Board.render()
};
Sapper.Board.create_cells = function(){
var x,y;
    for(y = 0; y<10; y++){
        Sapper.Board.Cells[y] = [];
        for(x = 0; x<10; x++){
            Sapper.Board.Cells[y][x] = new Sapper.constructors.Cell(x,y,""); 
        }
    } 
}
Sapper.Board.mines_set = function(){
    var x,y,i;
    for(i=1; i<=10; i++ ){
       x = Math.floor(Math.random()*9); 
       y = Math.floor(Math.random()*9);
       if ((Sapper.Board.Cells[y][x]).content != "mine"){
           (Sapper.Board.Cells[y][x]).content = "mine";
       } else {i--}
    }
};
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
            if ((Sapper.Board.Cells[y][x]).content == "mine"){
                mine_count++;
            }
        }
    })
     return mine_count;
}
Sapper.Board.render = function(){
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
        $('.board').on( "click", ".cell", function() {
        //alert( $(event.target).attr("mine") )
        //alert( $(event.target).attr("id") ) ; 
        $(this).addClass("open");
        //alert( $(this).text() ) ; 
    });
})




