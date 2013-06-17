;(function ( $, window, document, undefined ) {
  var plugin_name = 'slideto',
      defaults = {
        speed: 400,
        class_name: '.slideto',
        callback: null
      };

  // The actual plugin constructor
  function Slideto( el, options ) {
    var self = this,
        options = $.extend({}, defaults, options),
        
        $links = $(options.class_name),
        $body = $('html, body'),   
        $window = $(window);
    
    
    var initialize = function(){
      registerHandlers();
    };

    var registerHandlers = (function(){
      var 
      onClick = function(e){
        e.preventDefault();
        
        if(typeof options.callback == 'function'){
          return options.callback(e);
        }
        
        var $target = $(e.currentTarget),
            el = $target.attr('href'),
            top_offset = $(el).offset().top;

        $body.animate({'scrollTop': top_offset+'px'});
      };
      
      return function(){
        $links.on('click', onClick);
      }
    }());

    initialize();
  }

  
  $.fn[plugin_name] = function ( options ) {
    return this.each(function () {
      if (!$.data(this, 'plugin_' + plugin_name)) {
          $.data(this, 'plugin_' + plugin_name, 
          new Slideto( this, options ));
      }
    });
}
})( jQuery, window, document );
