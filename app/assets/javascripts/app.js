(function($){
	$(document).ready(function(){
	
	  $('.workitem-image').viewer();
	  $('#artists .artist').workitems();
	  $('#header').fixbar({ spacer_element: '#strip' });
	  $('body').slideto();
	  $('body').backToTop({
  	  content: '<video loop="loop" autoplay="autoplay"><source src="/videos/hum-fur.mp4"></source><source src="/videos/hum-fur.webm"></source></video><span>TOP</span>'
	  });
	});
}(jQuery));
