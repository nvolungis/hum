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
  								
      defaults = {};
      
      
  function Viewer( el, options ){
    this.el = el;
    this.$el = $(el);
    this.$target = this.$el.find('a');
    this.options = $.extend({}, defaults, options);
    this.comparer = new AspectRatioComparer();
		this.listener = new WindowListener({context:this, frequency: 1});
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
	    
	    this.listener.addHandler(this.sizePhoto);
    },
    
    setCloseHandler:function(){
    	var that = this;
    	
	    this.$viewer.find('#close').on('click', function(e){
				e.preventDefault();
				that.hide();
			});
    },
    
    sizePhoto: function(){
	    if(this.comparer.theWiderOne() === 'img'){
		    this.$img.css({width:'auto', height:$window.height()});
	    }else{
		    this.$img.css({heignt:'auto', width:$window.width()});
	    }
    }, 
    
    show: function(){
    	var that = this;
    	this.load(this.$img, function(){
		    if(!that.setup){
	    		that.comparer.addObj(that.$img, 'img', true);
					that.comparer.addObj($window, 'window');
					that.setup = true;
				}
				
	    	that.listener.start();
	    	that.setCloseHandler();
		    $('body').append(that.$viewer);
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
    	this.listener.stop();
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