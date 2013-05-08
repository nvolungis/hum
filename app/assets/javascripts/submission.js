$(document).ready(function(){
  
  (function(){
    var max_submissions = 3,
        index = 0,
        word_of = ['zero', 'one', 'two', 'three'];
        
    $('form.new_submission').on('click', '.add_fields', function(e){
      e.preventDefault();
      
      index += 1;
      
      if(index === 1){
        $(this).text('Add Another');
      }
      
      if(index === max_submissions){
        $(this).addClass('inactive');
      }
      
      if(index > max_submissions) {
        return;
      }
      
      var time = new Date().getTime(),
          regexp = new RegExp($(this).data('id'), 'g'),
          container = $(this).data('container'),
          $new_form = $($(this).data('fields').replace(regexp, time));
          
      $new_form
        .addClass(word_of[index])
        .find('.submission-label')
        .html('Piece  ' + word_of[index]);
      
      if(container !== ''){
        $(container).append($new_form.hide().fadeIn());
      }else{
        $(this).before($new_form).hide().fadeIn();
      }
    });
    
  }());
});