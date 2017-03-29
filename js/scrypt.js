
var Sapper = Sapper || {};

Sapper.constants ={};
// cell position [y,x]
Sapper.constants.neighbors = [ [-1,0],[-1,1],[0,1],[1,1],[1,0],[1,-1],[0,-1],[-1,-1] ];


Sapper.Board = {};
Sapper.constructors ={};
Sapper.Board.Cells = [];
Sapper.Panel = {};
Sapper.clock ={};

Sapper.constructors.Cell = function(x,y,content){
  this.position = [y,x];
  this.open = false;
  this.content = content;
};

Sapper.int = function(){
    Sapper.clock.time = 0;
    Sapper.Board.init_board();
    Sapper.Panel.init();
}

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
                $(id_cell).addClass('mine');
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

Sapper.controls = function(){
    $('.board').on( "click", ".cell", function() {
        
            Sapper.controls.tools(this);
            Sapper.controls.flags_count();  
        if ( ($(this).text() == "")&&(Sapper.Panel.use == "shovel") ){
            
            $(this).html('');
            $(this).append('<img src="img/afterboom.png" alt="">');
            $(".boom").show("scale",100);
            $(".boom").hide("pulsate",500); 
            $( "body" ).hide("shake",200);
            $( "body" ).show("shake",200); 
            $( ".mine").addClass("open");
            $(".flag.mine").html('');
            $(".solder").html('');
            $(".general").html('');
            $(".flag.mine").append('<img src="img/ok.png" alt="">');
            $(".solder").append('<img src="img/solder_2.png" alt="solder">');
            $(".general").append('<img src="img/General_2.png" alt="general">');
            clearInterval(timerId);
        }

    });
    $(".panel").on("click", ".cell", function(){
        Sapper.Panel.use = $(this).attr("name")
        Sapper.Panel.render(); 
    })
} 
Sapper.controls.tools = function(cell){
    switch(Sapper.Panel.use){
        case "shovel":
            $(cell).removeClass("question");
            $(cell).removeClass("flag");
            $(cell).addClass("open"); 
        break
        case "question":
            $(cell).removeClass("flag");
            $(cell).toggleClass("question"); 
        break
        case "flag":
            $(cell).removeClass("question");
            $(cell).toggleClass("flag"); 
        break 
    }
}
Sapper.controls.flags_count = function(){
    var summ = $('.flags ul li').length + $('.flag').length 
    if ( summ > 10){
        $('.flags ul li:last-child').remove();
    }
    if ( summ < 10){
       $('<li><img src="img/flag.png" alt="flag"></li>').appendTo('.flags ul');
    }
    if ($('.flag').length > 10) {
        $(this).removeClass("flag");
    } 
}


Sapper.clock.formatTime = function(time) {
    
    var min = parseInt(time / 6000),
        sec = parseInt(time / 100) - (min * 60),
        hundredths = pad(time - (sec * 100) - (min * 6000), 2);
    
    return (min > 0 ? pad(min, 2) : "00") + ":" + pad(sec, 2) + ":" + hundredths;
    
    function pad(number, length) {
        var str = '' + number;
        while (str.length < length) {str = '0' + str;}
        return str;
    }
    
}




Sapper.clock.update = function(){
    Sapper.clock.time++;
    var clock_time = Sapper.clock.formatTime(Sapper.clock.time)
    $(".clock p").text(clock_time);
 }


/*
var timer = $.timer(function() {
    //alert(timer);
});


timer.set({ time : 5000, autostart : true });
*/

$('document').ready( function(){
    Sapper.int();
    Sapper.controls();
    
    $("#Start").click(function() {
        
       timerId = setInterval(Sapper.clock.update ,10);
        //clearInterval(timerId);
    });


})




