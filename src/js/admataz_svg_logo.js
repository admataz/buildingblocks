(function($){
        function makeLogo(container){
          var admataz=[
          '0000000000011000000000000000000110000000000000000',
          '0000000000011000000000000000000110000000000000000',
          '0111110001111011111100011111011111100111110111111',
          '1100110110011011010110110011000110001100110000110',
          '1100110110011011010110110011000110001100110001100',
          '1101110110011011010110110111000110001101110011000',
          '0110110011111011010110011011000110000110110111111'];
          var row=null;
          var piece = null;
          var width = admataz[0].length;
          var height = admataz.length;
          var containerWidth = container.width();
          var containerHeight = container.height();
          var bitwidth = 6;//Math.floor(containerWidth/width);
          var bitheight = 5;//Math.floor(containerWidth/width);
          var yspace = 1;//(containerWidth/width/4);
          var xspace = 0;
          var svg = $('<svg version="1.1" viewBox="0 0 '+((bitwidth+xspace)*admataz[0].length)+' '+((bitheight+yspace)*admataz.length)+'" xmlns="http://www.w3.org/2000/svg" id="admataz-svg">');
          function SVG(tag)
          {
            return document.createElementNS('http://www.w3.org/2000/svg', tag);
          }
      // for (var y = 0; y < admataz.length; y++) {
        //  row = admataz[y];
      //
        //  for (var x = 0; x < row.length; x++) {
          //    if(row[x]==="1"){
            //      piece = $(SVG('rect')).attr('x',x*bitwidth+x*xspace).attr('y',y*bitheight+y*yspace).attr('height',bitheight).attr('width',bitwidth).attr('fill','black').attr('data-x',x).attr('data-y',y).attr('class','svgbit')
              //        .appendTo(svg);
          //    }
        //  };
      //
      // };
      var isspace=true;
      var letter = null;
      for (var x = 0; x < admataz[0].length; x++) {
        col = x;
        
        if(isspace){
          if(letter){
            letter.appendTo(svg);
          }
          letter = $(SVG('g')).attr('class','letter');
        }
        isspace=true;
        for (var y = 0; y < admataz.length; y++) {
          if(admataz[y][x]==="1"){
            isspace=false;
            piece = $(SVG('rect')).attr('x',x*bitwidth+x*xspace).attr('y',y*bitheight+y*yspace).attr('height',bitheight).attr('width',bitwidth).attr('fill','black').attr('data-x',x).attr('data-y',y).attr('class','svgbit')
            .appendTo(letter);
          }
        }
      }
      letter.appendTo(svg);
      container.empty().append(svg);
    }
    makeLogo($('.svg-logo'));
    // $(window).resize(function(){makeLogo($('.logo'));});
    $('g').hover(function(evt){
      // console.log(this);
      // $('.svgbit',this).css('fill','#fc3');
    });
  })(jQuery);