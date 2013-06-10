(function($){

	WindowListener = function(params){
		this.callerContext = params.context;
		this.resizeHandlers = [];
		this.frequency = params.frequncy;
		this.resized = true;
		this.interval;
		this.status = 'stopped';
	};
	
	$.extend(WindowListener.prototype, {
		_monitor: function(){
			var resizeInterval = 50, i;
			
			if(this.resized){		
				var len = this.resizeHandlers.length;
				
				console.log(len);
				this.resized = false;
				for(i=0; i< len; i++){
					this.resizeHandlers[i].call(this.callerContext);
				}
			}
		},
		
		addHandler: function(handler){
			this.resizeHandlers.push(handler);
		},
		
		setResized: function(){
			console.log(this);
			this.resized = true;
		},
		
		start: function(){
			var that = this;
			
			try{
				if(this.resizeHandlers.length > 0){
					this.interval = setInterval(function(){
						that._monitor.call(that);
					},this.frequency);
				
					$(window).on('resize', that.setResized);
				
					this.status = 'started';
				
				}else{
					throw({
						message: 'No handlers to call. Listener not started',
						status:'stopped'
					});
				}
			}
		
			catch(err){
				console.log(err.message);
				this.status = err.status;
			}
		},
	
		stop: function(){
			var that = this;
			
			$(window).off('resize', that.setResized);
			clearInterval(this.interval);
			this.status = 'stopped';
		}
	});
	
	AspectRatioComparer = function(){
	 this.objects = {};
	 this.cache = {};
	 this.status = 'notReady';
	}
	
	$.extend(AspectRatioComparer.prototype, {
		addObj:function($obj, id, cache){
			try{
				
				if( !($obj.height() && $obj.width()) ){
					$obj.height($obj[0].height);
					$obj.width($obj[0].width);
				}

				if( !($obj.height() && $obj.width()) ) throw({
					message: 'Object must have a height and width',
					status: 'notReady',
					object: $obj
				});
				
				if(this.status === 'notReady'){
					this.objects[id] = $obj;
					if(cache) this.cache[id] = this.getRatio(this.objects[id]);
					
					if(Object.keys(this.objects).length == 2){
						this.status = 'ready';
					}
				}else{
					throw({
						message: 'AspectRatioCompare can only accept two arguments',
						status: 'ready'
					});
				}
			}
			
			catch(err){
				console.log(err.message);
				if(err.object) console.log(err.object);
				this.status = err.status
			}
		},
	
		getRatio:function($obj){
			return $obj.width()/$obj.height();
		},
	
		theWiderOne:function(){
			var key,
			ratios = [],
			prev = 0,
			winner = null;
			
			try{
				if(this.status !== 'ready') throw({
					message: 'not ready to compare',
					status: 'notReady'
				});
				
				for ( key in this.objects ){
					ratio = this.cache[key] || this.getRatio(this.objects[key]);
					
					if(ratio > prev){
						winner = key;
						prev = ratio;
					}
				}
				
				return winner;
			}
			
			catch(err){
				console.log(err.message);
			} 
		},
	
		get:function(key){
			return this.cache[key] || this.getRatio(this.objects[key]);
		}
	});
	
}(jQuery));