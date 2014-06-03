// admataz_blocks.js

(function($) {
 /* var admataz = [
    '00000000000011000000000000',
    '0000000000001100000000000.',
    '001111100011110111111000..',
    '011001101100110110101100..',
    '01100110110011011010110...',
    '01101110110011011010110..0',
    '00110110011111011010110.0.',
    '00000000000000000000000..0',
    '00000000000000000000000..0',
    '.0....000...00....0000....',
    '..0.0....0.........00.....',
    '.............0....0.......',
    '..........................',
    '....0.....................',
    '................0...0.....',
    '..........................',
    '.......0..................',
    '..........................',
    '.............0............',

    ];*/



/*
   var admataz = [
    
    '0000000000011000000000000000000110000000000000000',
    '0000000000011000000000000000000110000000000000000',
    '0111110001111011111100011111011111100111110111111',
    '0110110011111011010110011011000110000110110111111',
    '0000000000000000000000000000000000000000000000000',
    '...00000..00..00..000000...000....000...0.00..0..',
    '.....000..0...00.................................',
    '...............0............0....................',
    '.................................................',
    '........0........................00.......0......',
    '............0....0..........0....................',
    '............................00...................',
    '...0......0............................0.........',
    '.........00....0...0.............................',
    '.................................................',
    '......0..........................................',
    '.................................................',
    '............0....................................',

    ]; 
 */
var admataz = [
  '....................................................',
  '.R.RR00.0.00....RR0....00..R.RR00..000..R.RR0000000.',
  '.000..00RR0...000..00RR0...000..00RR0...000..00RR0..',
  '..R......R............R.....R......R.....R......R...',
  '.............0......................................',
  '....................................................',
  '....R......R.....R......R.....R......R.....R......R.',
  '.R......R.....R......R............R............R....'
];

// var admataz = [
// '....................................................',
// '....................................................',
// '...........11..................11...................',
// '...........11..................11...................',
// '.11111...1111.111111...11111.111111..11111.111111...',
// '11..11.11..11.11.1.11.11..11...11...11..11....11....',
// '11..11.11..11.11.1.11.11..11...11...11..11...11.....',
// '11.111.11..11.11.1.11.11.111...11...11.111..11......',
// '.11.11..11111.11.1.11..11.11...11....11.11.111111...'
// ];

 

  var faces = {
    bottom: "2,4 0,3 2,2 4,3",
    backleft: "2,2 2,0 0,1 0,3",
    backright: "2,2 2,0 4,1 4,3",
    top: "2,2 0,1 2,0 4,1",
    frontleft: "2,2 2,4 0,3 0,1",
    frontright: "2,2 4,1 4,3 2,4"
  };

  var colours = [
    '#E86C4E',
    '#666',
    '#FFE074',
    '#71A166',
    '#667FCC'
  ];

  var setUpTimer = null;


  function SVG(tag) {
    return document.createElementNS('http://www.w3.org/2000/svg', tag);
  }

  var Cube = function(options) {
    var g = $(SVG('g'));
    // if(options.back){
    // var bottom = $(SVG('polygon')).attr('points', faces.bottom).appendTo(g);
    // var backleft = $(SVG('polygon')).attr('points', faces.bottom).appendTo(g);
    // var backright = $(SVG('polygon')).attr('points', faces.bottom).appendTo(g);
    // }
    var top = $(SVG('polygon')).addClass('top').attr('points', faces.top).appendTo(g);
    var frontleft = $(SVG('polygon')).addClass('frontleft').attr('points', faces.frontleft).attr('fill', '#efefef').appendTo(g);
    var frontright = $(SVG('polygon')).addClass('frontright').attr('points', faces.frontright).attr('fill', '#fff').appendTo(g);

    return g;
  };

  var Line = function(start, end){
    var line = $(SVG('line')).attr({x1:start.x, y1:start.y, x2:end.x, y2:end.y, stroke:'#000', 'stroke-width': '1'});
    return line;

  };

          

  var cachedCube=new Cube();


  var buildBlocks = function(el) {

    var piece = null;
    var isspace = true;
    var letter = null;
    var xoffset, yoffset;
    var scale = 10;//container.width() / admataz[0].length / 4;

    var y=0;
    var x=0;

    var dwidth = $(window).width();
    var dheight = $(window).height();

    console.log('height:'+dheight);
    console.log('width:'+dwidth);

    if(dwidth <= 640 ){
      scale = 7;
      if(dheight < dwidth){
          scale = 5;
      } 
    }


    var ylimit = 8; //Math.ceil(dheight/scale);
    var xlimit = Math.ceil(dwidth/scale/2); 



    // viewBox="0 0 '+(xlimit)*4+' '+(ylimit+2)+'" preserveAspectRatio="xMinYMin meet"
    var container = $('<svg version="1.1"  xmlns="http://www.w3.org/2000/svg" id="blocks-svg">');

    container.attr('viewBox', '0 0 '+(xlimit*4)+' '+(ylimit));
    container.attr('preserveAspectRatio', 'xMinYMin meet');

    



    var plantBlock2 = function(){
      var c = colours[Math.floor(Math.random()*colours.length)];
      var randx = 0;
      var randy = 0;

      if(y%2){
        xoffset = scale*2; 
      } else {
        xoffset = 0;
      }

      if(x%2){
        yoffset = scale/2; 
      } else {
        yoffset = scale/2;
      }

      if(y && Math.random() > 0.7){


      piece = cachedCube.clone().appendTo(container);
        piece.attr("transform", "matrix("+scale+" 0 0 "+scale+" "+(4*x*(scale+randx)-xoffset)+ " " + (y*(scale+randy) - scale)+")");
        // piece.attr("transform", "matrix(1 0 0 1 "+(4*x-xoffset)+ " " + (y*(scale) - scale)+")");
        piece.attr('fill',c);
        piece.attr('stroke','#bbb');
        piece.attr('stroke-width',0.05);

      }


        x++;
      
      if(x === xlimit){
        y++;
        x=0;
      }

    };




    var plantBlock = function(){
      
      var c = colours[Math.floor(Math.random()*colours.length)];
      var randx = 0;
      var randy = 0;

      if(y%2){
        xoffset = scale*2; 
      } else {
        xoffset = 0;
      }

      if(x%2){
        yoffset = scale/2; 
      } else {
        yoffset = scale/2;
      }


      if (admataz[y][x] != ".") {
        piece = cachedCube.clone().appendTo(container);
        piece.attr("transform", "matrix("+scale+" 0 0 "+scale+" "+(4*x*(scale+randx)-xoffset)+ " " + (y*(scale+randy) - scale)+")");
        // piece.attr("transform", "matrix(1 0 0 1 "+(4*x-xoffset)+ " " + (y*(scale) - scale)+")");
        piece.attr('fill','#efefef');
        piece.attr('stroke','#bbb');
        piece.attr('stroke-width',0.05);

      }


      
      if (admataz[y][x] === "-") {
        piece.attr('fill', '#ccc');
      }

      if (admataz[y][x] === "1") {
        piece.attr('fill', '#efefef');
      }
      if (admataz[y][x] === "R") {
        piece.attr('fill', c);
        piece.attr('class','switchable');
      }

      x++;
      
      if(x === xlimit){
        y++;
        x=0;
      }
    };



      while(y<ylimit){
        plantBlock2();
      }
      


     

    
      // setUpTimer = setInterval(switchblocks,1);  
      // 
      $(el).css('height',(ylimit*scale+2*scale)+"px");
      $(el).append(container);
      
  };

   function switchblocks(){
        var switchables = $('#blocks g');

        // var itm = switchables[Math.floor(Math.random()*switchables.length)];

        

        switchables.each(function(i,itm){
          var c = colours[Math.floor(Math.random()*colours.length)];
          $(itm).css({'fill': c});

        });


        // console.log(switchables);

        // $('.top',itm).fadeOut(500,function(){
        //       $(this).css({'fill': c});
        //       $(this).fadeIn(100);
        //     });




      }

  function init() {
    buildBlocks('#blocks');
  }

  $(window).on('resize', switchblocks);
  // $(window).on('scroll', switchblocks);

  $(init);

})(jQuery);