;(function ( $, window, document, undefined ) {
  var plugin_name = 'fixbar',
      defaults = {
        class_name: 'fixed',
        spacer_element: 'null',
        regulation_interval: 3
      };

  // The actual plugin constructor
  function Fixbar( el, options ) {
    var self = this,
        options = $.extend({}, defaults, options),
        spacer_height = !options.spacer_element ? 0 : $(options.spacer_element).height(),
        
        interval, 
        scrolled = false, 
        resized = false,
        
        $el = $(el),
        $body = $('html, body'),   
        $window = $(window);
    
    
    var initialize = function(){
      registerHandlers();
      startListeners();
      $window.scroll();
    };


    var registerHandlers = (function(){
      var fixed = false;
      
      
      var onScroll = function(){
        scrolled = true;
      };
      
      var onResize = function(){
        resized = true; 
      };
      
      var setPadding = (function(){
        var $parent = $el.parent();
      
        return function(height){
          $parent.css({
            'padding-top': height + 'px'
          });
        }
      }());
      
      
      return function(){
        $window.on('scroll', onScroll);        
        $window.on('resize', onResize);
      
      
        $el.on('bar:fix', function(){
          var padding = $el.height();
          
          $el.addClass('fixed');  
          setPadding(padding);
        });
        
        $el.on('bar:unfix', function(){
          $el.removeClass('fixed');
          setPadding(0);
        });
        
        $el.on('regulated:scroll', function(){
          var scrolltop = $body.scrollTop();
      
          if(scrolltop >= spacer_height){
            if(fixed) return;
            
            $el.trigger('bar:fix');
            fixed = true;       
            return;
          }  
         
          if(fixed){
            $el.trigger('bar:unfix');
            fixed = false;
          }
        });
        
        $el.on('regulated:resize', function(){
          if(!fixed) return;
          
          var padding = $el.height();
          setPadding(padding);
        });
      }
    }());
      
      
    var startListeners = function(){
      interval = setInterval(function(){
        if (scrolled){
          scrolled = false;
          $el.trigger('regulated:scroll');
        }
        
        if(resized){
          resized = false;
          $el.trigger('regulated:resize');
        }
        
      }, options.regulation_interval);     
    };


    var stop = function(){
      $window.off('scroll');
      
      clearInterval(interval);
    };

    initialize();
  }

  
  $.fn[plugin_name] = function ( options ) {
    return this.each(function () {
      if (!$.data(this, 'plugin_' + plugin_name)) {
          $.data(this, 'plugin_' + plugin_name, 
          new Fixbar( this, options ));
      }
    });
}
})( jQuery, window, document );
