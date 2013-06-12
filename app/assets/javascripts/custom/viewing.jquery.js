/* Dependencies */


;(function ( $, window, document, undefined ) {
  var pluginName = 'viewer',
  		$window = $(window),
  		$viewer = $("<div id='viewer'> " +
  									"<span id='close'>X</span>" +
  									"<div class='table-wrapper'>" +
  										"<div class='table-cell'></div>" +
  									"</div>" +
  								"</div>");
  								
      defaults = {
	      padding: 30
      };
      
      
  function Viewer( el, options ){
    this.el = el;
    this.$el = $(el);
    this.$target = this.$el.find('a');
    this.options = $.extend({}, defaults, options);
    this.init();
  }    
  
  $.extend(Viewer.prototype, {
    init: function(){
    	this.buildViewer();
    	this.setHandlers();
    },
    
    buildViewer: function(){
	    this.$img = $("<img />").attr({src: this.$target.attr('href')});
	    this.$viewer = $viewer.clone();
	    this.$viewer.find('.table-cell').append(this.$img);
    },
    
    setHandlers: function(){
    	var that = this;
			
	    this.$target.on('click', function(e){
	    	e.preventDefault();
	    	that.hide();
	    	that.show();
	    });
	    
	    $(window).bind('resize', $.proxy(this.sizePhoto, this));
    },
    
    setCloseHandler:function(){
    	var that = this;
    	
	    this.$viewer.find('#close').on('click', function(e){
				e.preventDefault();
				that.hide();
			});
    },
    
    sizePhoto: function(){
			if(!this.loaded) return;
			
			var wider = this.comparer.compare(),
					width = $window.width() - this.options.padding,
					height = $window.height() - this.options.padding;

	    if(wider.obj === 'image'){
		    this.$img.css({width:width, height:'auto'});
	    }else{
	    	this.$img.css({width:'auto', height:height});
	    }
    }, 
    
    show: function(){
    	var that = this;
    	this.load(this.$img, function(){
		    $('body').append(that.$viewer);
		    that.comparer = new Comparer($(window), that.$img);
	    	that.setCloseHandler()
	    	that.loaded = true;
	    	that.sizePhoto();
    	});
    },
    
    load: function($obj, callback){
	    var src = $obj.attr('src'),
	    		img = new Image;

  		img.onload = function(){
  			console.log('calling');
    		callback();	
  		}
  		img.src = src;
    },
    
    hide: function(){
	    $('#viewer').remove();
    }
  });    
      
   
  $.fn[pluginName] = function ( options ) {
    return this.each(function () {
      if (!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName, 
        new Viewer( this, options ));
      }
    });
  }
  
})( jQuery, window, document );