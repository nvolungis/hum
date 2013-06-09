/* Handles the navigation / toggling through artist work
 * 
 * Dependencies:
 *	Modernizr
 *  Enquire
 */

;(function ( $, window, document, undefined ) {
  var pluginName = 'workitems',
  		touch = Modernizr.touch,
  		narrow_view = true,
  		$window = $(window),
      defaults = {};
	
	enquire.register('screen and (min-width:600px)',{
		match: function(){
			narrow_view = false;
			$window.trigger('screen-change');
		},
		
		unmatch: function(){
			narrow_view = true;
			$window.trigger('screen-change');
		}
	});


  // The actual plugin constructor
  function Workitems( el, options ){
    var that = this;
    
    this.el = el;
    this.$el = $(el);
    this.options = $.extend({}, defaults, options);
   
    $window.bind('screen-change', function(){
	    that.start();
    });
    
    this.init();
  }

  $.extend(Workitems.prototype, {
    init: function(){
    	this.$workitems = this.$el.find('section.workitems');
    	this.$infos = this.$el.find('.workitems .workitem');
			this.$images = this.$el.find('.workitem-image');
			this.$parent = this.$el.find('.workitem-images');
			this.$parent.attr({'data-original-classes': this.$parent.attr('class')});
			this.start();
    },
    
    start: function(){
    	this.$images.unbind();
			
			if(narrow_view){
				this.$parent.attr({'class': this.$parent.attr('data-original-classes')});
				this.$parent.addClass('narrow');
				this.$workitems.touchslide({
					ul_selector: '.workitem-images',
					parent_selector: '.container-fluid'
				});
			}else{
				this.$parent.removeClass('narrow').attr({'style':''});
				this.$workitems.attr({'style':''});
				this.$images.attr({'style':''});
				this.$images.bind('click', $.proxy(this.clicked, this));			
				this.display(this.$images.filter(':first'));
			}
    },
    
    clicked: function(e){
	    var $target = $(e.currentTarget);
			
			if(!narrow_view) this.display($target);
    },
    
    display: function($target){
	    this.changeImage($target);
	    this.changeCaption($target);
    },
    
    changeImage: function($target){
    	var classes = $target.attr('class').split(' '),
    			active_class = classes[classes.length-1];
	    
			this.$images.find('.active').removeClass('active');
			$target.find('a').addClass('active');
	    this.$parent.attr({'class': this.$parent.attr('data-original-classes') + ' ' + active_class});
    },
    
   	changeCaption: function($target){
   		var id = $target.attr('data-id'),
   				$info = this.$infos.filter('[id='+ id +']');
   				
   		this.$infos.filter('.active').removeClass('active');
   		$info.addClass('active');
   	} 
   
  });
  

  $.fn[pluginName] = function ( options ) {
    return this.each(function () {
      if (!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName, 
        new Workitems( this, options ));
      }
    });
  }
  
})( jQuery, window, document );

