;(function ( $, window, document, undefined ) {
    var pluginName = 'viewer',
        defaults = {};

    // The actual plugin constructor
    function Viewer( el, options ) {
        this.el = el;
        this.$el = $(el);
        this.options = $.extend({}, defaults, options);
        this.init();
    }

    $.extend(Viewer.prototype, {
      init: function(){
       	//console.log('hi');
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