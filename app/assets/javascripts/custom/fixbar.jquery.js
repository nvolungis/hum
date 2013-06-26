;(function ( $, window, document, undefined ) {
  var plugin_name = 'fixbar',
      defaults = {
        class_name: 'fixed',
        spacer_element: 'null',
        min_width: 600,
        regulation_interval: 10
      };

  // The actual plugin constructor
  function Fixbar( el, options ) {
    var self = this,
        options = $.extend({}, defaults, options),
        spacer_height = !options.spacer_element ? 0 : $(options.spacer_element).height(),
        
        interval, 
        mobile = true,
        scrolled = false, 
        resized = false,
        
        $el = $(el),
        $body = $('body'),
        $html = $('html'),
        $window = $(window);
    
    console.log('inside fixbar');
    
    var initialize = function(){
      registerHandlers();
      startEnquire();
      startListeners();
      $window.scroll();
    };


    var registerHandlers = (function(){
      var 
      below_spacer = false,
      
      onScroll = function(){
        scrolled = true;
      },
      
      onResize = function(){
        resized = true; 
      },

      setPadding = (function(){
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
          if(mobile) return;
          
          var padding = $el.height();
          
          $el.addClass('fixed');  
          setPadding(padding);
        });
        
        $el.on('bar:unfix', function(){
          $el.removeClass('fixed');
          setPadding(0);
        });
        
        $el.on('regulated:scroll', function(){
          var scrolltop = $body.scrollTop() || $html.scrollTop();
          
          if(scrolltop >= spacer_height){
            if(below_spacer) return;
  
            $el.trigger('bar:fix');
            below_spacer = true;       
            return;
          }  
         
          if(below_spacer){
            $el.trigger('bar:unfix');
            below_spacer = false;
          }
        });
        
        $el.on('regulated:resize', function(){
          if(!below_spacer) return;

          setPadding($el.height());
        });
        
        $el.on('enquire:fired', function(){
          if(mobile){
            $el.trigger('bar:unfix');
            return;
          }
          
          if(!mobile && below_spacer){
            $el.trigger('bar:fix');
          }
        });
      }
    }());
      
      
    var startEnquire = function(){
      enquire.register('screen and (min-width:600px)', {
        match: function(){
          mobile = false;
          $el.trigger('enquire:fired');
        },
        
        unmatch: function(){
          mobile = true;
          $el.trigger('enquire:fired');
        }
      });
    };
      
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
