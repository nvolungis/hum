(function($){
	$(document).ready(function(){
	
	  $('.workitem-image').viewer();
	  $('#artists .artist').workitems();
	  $('#header').fixbar({ spacer_element: '#strip' });
	  $('body').slideto();
	  $('body').backToTop();
	});
}(jQuery));
