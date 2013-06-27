;(function ( $, window, document, undefined ) {
  var pluginName = 'backToTop',
  		that,
      defaults = {
        min_scroll: 200,
        scroll_speed: 300,
        content: 'Top'
      };
      

  // The actual plugin constructor
  function BackToTop( el, options ){
    that = this;
    
    this.el = el;
    this.$el = $(el);
    this.options = $.extend( {}, defaults, options) ;
    this.$window = $(window)
    this.$button = $('<span id="back-to-top"><a href="#">'+this.options.content+'</a></span>');
    this.interval;
    this.init();
  }
  
  $.extend(BackToTop.prototype, {
	  init: function(){
		  this.$el.append(this.$button);
		  this.monitorScroll();
		  
		  that.$el.bind('button:show', function(){
			  that.$button.addClass('active');
		  });
		  
		  that.$el.bind('button:hide', function(){
			  that.$button.removeClass('active');
		  });
		  
		  this.$button.find('a').bind('click', function(e){
			  $('html, body').animate({'scrollTop': 0}, that.options.scroll_speed);
			  e.preventDefault();
		  });
	  },
		
		monitorScroll: function(){
			var scrolled = false,
					showing_button = false;
			
	  	this.$window.bind('scroll', function(){
		  	scrolled = true;
	  	});
	  	
	  	this.interval = setInterval(function(){
				var above_threshhold;
				
				if(!scrolled) return;
				
			  above_threshhold = that.$window.scrollTop() >= that.options.min_scroll;
			  scrolled = false;
			 
				if(above_threshhold && !showing_button){
					showing_button = true;
					that.$el.trigger('button:show');
				
				}else if(!above_threshhold && showing_button){
					showing_button = false;
					that.$el.trigger('button:hide');
				}
			}, 50);
		}	  
  });
  
  //Instantiate the plugin for every match of the originating selector.
  //This prevents collisions from the plugin being run from more than one return of the selector
  $.fn[pluginName] = function ( options ) {
    return this.each(function () {
      if (!$.data(this, 'plugin_' + pluginName)) {
          $.data(this, 'plugin_' + pluginName, 
          new BackToTop( this, options ));
      }
    });
  }

})( jQuery, window, document );