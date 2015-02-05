(function($) {

    var colours = [
      '#E86C4E',
      '#666',
      '#FFE074',
      '#71A166',
      '#667FCC'
    ];
  
  Ractive.easing.elastic = function ( x ) {
    return -1 * Math.pow(4,-8*x) * Math.sin((x*6-1)*(2*Math.PI)/2) + 1;
  };

   var blocksRactive = new Ractive(
     {
       el:'#blocks',
       template: '#blocks-template',
       data:{
         ylimit: 12,
         scale: 12,
         blocks: [],
         containerWidth: 640,
         containerHeight: 200,
         xoffset:0,
         yoffset:0,
         scrollTop:0
       },
       computed:{

        

       xlimit: function(){
         var limit = Math.ceil( this.get('containerWidth') / this.get('scale'));
         return limit*4;
       },
       //  ylimit: function(){
       //   var limit = Math.ceil(this.get('containerHeight') / this.get('scale'));
       //   return limit;
       // }
       },

       
       oninit: function(){
  
        var self = this; 
        var scrolling=false;
        var startHeight = $(self.el).height();
        var startWidth = $(self.el).width();
        var startScroll = 0;
        var animating = false;

         $(window).on('scroll', function(){
           self.set('yoffset', $(window).scrollTop() - startScroll);
         });



         // $(window).on('scroll', function(){
         //  if(animating){
         //    animating.stop();
         //  }
         // self.set('scrollTop', $(window).scrollTop());
         //  self.set('yoffset', $(window).scrollTop() - startScroll);
         //  clearTimeout(scrolling);
         //   scrolling = setTimeout(function(){
         //     // self.animate('containerHeight', $(self.el).height(), {duration:500, easing:'easeInOut'});
         //     // self.animate('containerWidth', $(self.el).width(), {duration:500, easing: 'easeInOut'});
         //    // animating = self.animate('yoffset',0, {duration:2000, easing:'easeOut'});
         //    // self.animate('xoffset',0);
         //     startScroll = $(window).scrollTop();
         //     // self.animate('scrollTop',startScroll);
         //     // self.makeBlocks();
         //   },240);

           
         // });





         // $(window).on('resize', function(){

         //  // console.log();
         //  self.set('xoffset', $(self.el).width() - startWidth);
         //  self.set('yoffset', $(self.el).height() - startHeight);
         //  clearTimeout(resizing);
         //   resizing = setTimeout(function(){
         //     self.animate('containerHeight', $(self.el).height(), {duration:500, easing:'easeInOut'});
         //     self.animate('containerWidth', $(self.el).width(), {duration:500, easing: 'easeInOut'});
         //    self.animate('yoffset',0);
         //    self.animate('xoffset',0);
         //     startWidth = $(self.el).width();
         //     // self.makeBlocks();
         //   },200);

           
         // } ); 
       },

       onrender: function(){
            this.set('containerHeight', $(this.el).height());
            this.set('containerWidth', $(this.el).width());
            this.makeBlocks();
       },
       
       makeBlocks: function(){
        var y = 0;
        var x = 0;
        var ylimit = this.get('ylimit'); 
        var xlimit = this.get('xlimit')/this.get('scale'); 
         //noprotect
         this.set('blocks',[]);
        for(y=1; y<ylimit; y++){
          for(x=0; x<xlimit; x++){
            this.makeBlock(x,y);
          }
        }  

       },
       
       makeBlock: function(x,y) {
        var xoffset, yoffset;
        var b = {};
        var scale = this.get('scale');

        if (y && Math.random() < 0.7) {       
          return false;
        }
    
        b.scale=scale;
        b.fillColour = colours[Math.floor(Math.random() * colours.length)];
        b.strokeColour = '#bbb';
        b.strokeWidth = 0.05;
        b.fillColourFrontLeft = '#fff';
        b.fillColourFrontRight = '#efefef';
        b.randomizer = Math.random()*10;
        
        if (y % 2) {
          xoffset = scale * 2;
        } else {
          xoffset = 0;
        }

        b.xpos = 4 * x * scale - xoffset;
        b.ypos = (y * scale - scale);

        this.push('blocks', b);

      }
       
       
     }
   );
  
  

  


 

 
})(jQuery);