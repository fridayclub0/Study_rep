$(function(){
	
	window.sessionStorage.setItem(['den'],[0]);
	
	$(".number")
		.on('click',function(){
			var mode=window.sessionStorage.getItem(['pm']);
			var n = parseInt($(this).text());
			var ans=0;
			var mid=parseInt(window.sessionStorage.getItem(['den']));
			
			if(mode=="+"){
				ans=mid+n;
			}
			if(mode=="-"){
				ans=mid-n;
			}
			console.log(ans);
			window.sessionStorage.setItem(['den'],[ans]);
			
			$("#calcinput").val(ans);
		});
	
	$(".comand")
		.on('click',function(){
			var mode=$(this).text();
			window.sessionStorage.setItem(['pm'],[mode]);
			//console.log(window.sessionStorage.getItem(['pm']));
			$('#viewmode').text(mode);
		});
});

function upload_comment() {
	var formData = new FormData();
	var up_text = $('#uptext').val();
	formData.append('uptext',up_text);

	$.ajax({
       	url: '/upload_comment',
       	type: "POST",
       	contentType: false,
       	processData: false,
       	cache: false,
       	data: formData,
       	success: function(data){
       		console.log(data);
       	},
       	error: function(XMLHttpRequest,textStatus,errorThrown){
			alert('Error : ' + errorThrown+textStatus+XMLHttpRequest);
		}
   	});
}