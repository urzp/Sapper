
var Sapper = Sapper || {};

Sapper.constants ={};
// [y,x]
Sapper.constants.neighbors = [ [-1,0],[-1,1],[0,1],[1,1],[1,0],[1,-1],[0,-1],[-1,-1] ];

Sapper.Board = {};
Sapper.constructors ={};
Sapper.Board.Cells = [];
Sapper.Panel = {};

Sapper.constructors.Cell = function(x,y,content){
  this.position = [y,x];
  this.open = false;
  this.content = content;
};

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

Sapper.Panel.init = function(){
    this.use = "shovel";
    Sapper.Panel.render();
};

Sapper.Panel.render =function(){
    $(".panel_shovel").removeClass("in_use");
    $(".panel_question").removeClass("in_use");
    $(".panel_flag").removeClass("in_use");
    $(".panel_"+this.use).addClass("in_use");
    
    $(".board .row .cell").removeClass("use_shovel");
    $(".board .row .cell").removeClass("use_question");
    $(".board .row .cell").removeClass("use_flag");
    $(".board .row .cell").addClass("use_"+Sapper.Panel.use);
}



$('document').ready( function(){
    Sapper.Board.init_board();
    Sapper.Panel.init();
    $('.board').on( "click", ".cell", function() {
        switch(Sapper.Panel.use){
            case "shovel":
                $(this).removeClass("question");
                $(this).removeClass("flag");
                $(this).addClass("open"); 
            break
            case "question":
                $(this).removeClass("flag");
                $(this).toggleClass("question"); 
            break
            case "flag":
                $(this).removeClass("question");
                $(this).toggleClass("flag"); 
            break 
        }
           
        
        
    });
    $(".panel").on("click", ".cell", function(){
        Sapper.Panel.use = $(this).attr("name")
        Sapper.Panel.render();
        
    })
})




