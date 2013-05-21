;(function ( $, window, document, undefined ) {
    var pluginName = 'artists',
        defaults = {};

    // The actual plugin constructor
    function Artist( el, options ) {
        this.el = el;
        this.$el = $(el);
        this.options = $.extend({}, defaults, options);
        this.init();
    }

    $.extend(Artist.prototype, {
      init: function(){
        var that = this;
        
        this.$artist_images = this.$el.find('.artist-image');
        this.$artist_content = this.$el.find('.artists .artist');
        
        this.$artist_images.on('click', function(e){
          var $target = $(e.currentTarget);
            
          that.show_artist($target);
        });
        
        this.show_artist(this.$artist_images.filter(':first'));
      },
      
      show_artist: function($target){
        var id = $target.attr('data-name'),
            $details = this.$artist_content.filter('[id=' + id + ']');
        
        this.$artist_images.filter('.active').removeClass('active');
        this.$artist_content.filter('.active').removeClass('active');
        $target.addClass('active');
        $details.addClass('active');
      }
      
      
    });
    

    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, 
                new Artist( this, options ));
            }
        });
    }

})( jQuery, window, document );