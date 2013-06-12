
function Comparer($container, $image){
	var self = this;
	
	self.$container = $container;
	self.$image = $image;
	self.image_ratio = this.getRatio($image);	
};

$.extend(Comparer.prototype, {
	getRatio: function($obj){
		return $obj.width() / $obj.height();
	},

	compare: function(){
		var container_ratio = this.getRatio(this.$container),
				obj,
				image_ratio = this.image_ratio;		
		
		if(image_ratio > container_ratio){
			obj = 'image';
		}else{
			obj = 'window';
		}
	
		return {
			ratio: image_ratio,
			obj: obj
		}
	}
});
