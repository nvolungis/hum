$(document).ready(function(){
  $('form.edit_artist').on('click', '.add_fields', function(e){
    e.preventDefault();
    
    var time = new Date().getTime(),
        regexp = new RegExp($(this).data('id'), 'g');
        
    $(this).before($(this).data('fields').replace(regexp, time));
  });
});