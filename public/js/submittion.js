function submittion_float(mode){
	var dom = $('#content_submittion_wrap');
	if (mode=='float'){
		dom.css('zIndex',1);
		dom.animate({
			'opacity' : 1
		},600);
	}
	if (mode=='back'){
		dom.animate({
			'opacity' : 0
		},300);
		dom.css('zIndex',-1);
	}
	
}
