
;(function ( $, window, document, undefined ) {
  var plugin_name = 'touchslide',
      defaults = {
      	autoslide: true,
      	parent_selector: null,
	      ul_selector: 'ul',
	      li_selector: 'li',
	      duration: 500,
	      threshold: .2
      };

  // The actual plugin constructor
  function TouchSlide( el, options ) {
    this.el = el;
    this.$el = $(el);
    this.options = $.extend({}, defaults, options);
    this.init();
  }

  $.extend(TouchSlide.prototype, {
    init: function(){
    	this.getElements();
    	this.style();
    	this.position();
    	this.setHandlers();
    	this.display(this.active);
    },
    
    getElements: function(){
    	this.$overflow = (this.options.parent_selector) ? this.$el.find(this.options.parent_selector) : this.$el;
	    this.$panel = this.$el.find(this.options.ul_selector);
    	this.$slides = this.$panel.find('li');
    	this.$infos = this.$el.find('.workitems .workitem');
    	this.len = this.$slides.length;
    	this.percent = 100/this.len;
    	this.active = 0;
    },
    
    style: function(){
	    this.$overflow.css({
		    'position': 'relative',
				'overflow': 'hidden'
	    });
	    
	    this.$panel.css({
		    'position':'relative',
				'width':this.len*100 + '%',
				'overflow':'hidden'
	    });
	    
	    this.$slides.css({
		    'float':'left',
		    'width':(this.percent) + '%'
	    });
	    
	    this.$slides.each(function(i, slide){
		   	$(slide).attr({'data-index':i});
	    });
    },
    
    position: function(){
	    this.updateOffset(this.getOffset());
    },
    
    getOffset: function(){
	    return -this.active*this.percent;
    },
    
    getSlide: function(){
	    return this.$slides.filter('[data-index='+this.active+']');
		},
    
    updateOffset:function(offset){
    	var offset = offset + '%';
	    this.$panel.css({
	    	'-webkit-transform':'translate3d('+ offset +',0,0)',
				'transform':'translate3d('+ offset +',0,0)',
	    });
    },
    
    
    setHandlers: function(){
    	var that = this,
    			current_width = this.$el.width(),
    			viewing_percentage = 100/this.len,
    			moved, new_offset, current_offset, dir;
    			
    	
	    this.$el = this.$el.hammer();
	    
	    this.$el.on('dragstart', function(e){
		    e.preventDefault();

		    current_offset = that.getOffset();
		    that.$panel.css({
			    'transition':0 + 'ms',
		    });
	    })
	    
	   .on('dragend', function(e){
		    e.preventDefault();
		    that.$panel.css({
			    'transition':that.options.duration + 'ms'
		    });
				
				var above_threshold = Math.abs(moved) > that.options.threshold;

		    if(new_offset > 0){
			    that.updateOffset(0);
		    }else if(new_offset < (that.percent - 100)){
					that.updateOffset(that.percent -100);
		    }else{
		    	if(new_offset > current_offset && above_threshold){
			    	that.active = that.active -= 1;
			    	that.position();
			    	that.$el.trigger('new:active');
		    	}else if(above_threshold){
			    	that.active = that.active += 1;
			    	that.position();
			    	that.$el.trigger('new:active');
		    	}else{
			    	that.updateOffset(current_offset);
		    	}
		    }
	    })
	    
	    .on('drag', function(e){
	    	e.preventDefault();
				var total;
				
		    moved = e.gesture.deltaX/current_width;
		    total = viewing_percentage * moved;
		    new_offset = current_offset + total;
				
				that.updateOffset(new_offset);
	    })
	    
	    .on('new:active', function(){
	    	that.display(that.active);
			});	    
    },
    
    display: function(index){
			$target = this.getSlide(index);
			this.$slides.find('.active').removeClass('active');
    	$target.find('a').addClass('active');
    	
    	this.changeCaption($target);
		},
		
		changeCaption: function($target){
   		var id = $target.attr('data-id'),
   				$info = this.$infos.filter('[id='+ id +']');
   				
   		this.$infos.filter('.active').removeClass('active');
   		$info.addClass('active');
   	} 
  });
  

  $.fn[plugin_name] = function ( options ) {
    return this.each(function () {
      if ($.data(this, 'plugin_' + plugin_name)){
      	var old_instance = $.data(this, 'plugin_' + plugin_name);
      	old_instance.$el.off('dragstart');
      	old_instance.$el.off('dragend');
				old_instance.$el.off('drag');
      }
      $.data(this, 'plugin_' + plugin_name, new TouchSlide( this, options ));

    });
  }

})( jQuery, window, document );
