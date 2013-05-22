;(function ( $, window, document, undefined ) {
  var pluginName = 'workitems',
      defaults = {};

  // The actual plugin constructor
  function Workitems( el, options ) {
    this.el = el;
    this.$el = $(el);
    this.options = $.extend({}, defaults, options);
    this.init();
  }

  $.extend(Workitems.prototype, {
    init: function(){
    	this.$infos = this.$el.find('.workitems .workitem');
			this.$images = this.$el.find('.workitem-image');
			this.$parent = this.$el.find('.workitem-images');
			this.$parent.attr({'data-original-classes': this.$parent.attr('class')});
			
			this.$images.bind('click', $.proxy(this.clicked, this));			
			this.changeImage(this.$images.filter(':first'));
			this.changeCaption(this.$images.filter(':first'));

    },
    
    clicked: function(e){
	    var $target = $(e.currentTarget);
	    
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