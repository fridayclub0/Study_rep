$(function(){
	talk_fetch_data();
});

function talk_fetch_data(){
	var formdata = new FormData();
	formdata.append('table','fetch_talk_title');
	$.ajax({
		url:'/database',
		type:"POST",
		contentType: false,
		processData: false,
		cache: false,
		data: formdata,
		dataType: "json",
		success: function(data){
			$.each(data,function(){
				var title = this['talk_title'];
				var file_id = this['file_id'];
				var author = this['contributor'];
				var time = this['datetime'];
				var dom_ul = $('#talk_title_lists');
				$('<li>').html('<small style="padding-right:10px">author : '+author+'</small><small>'+time+'</small><br><h1 style="margin:10px 0;">'+title+'</h1>').attr('value',file_id).attr('onclick',"show_talk('"+title+"','"+file_id+"');").appendTo(dom_ul);
			});
		},
		error: function(XMLHttpRequest,textStatus,errorThrown){
			alert('Error1:' + errorThrown);
		}
	});
}

function show_talk(title,file_id){
	open_page(5);
	var formdata = new FormData();
	formdata.append('table','get_talk_data');
	formdata.append('file_id',file_id);
	$.ajax({
		url:'/database',
		type:"POST",
		contentType: false,
		processData: false,
		cache: false,
		data: formdata,
		dataType: "json",
		success: function(data){
			var content = data[0]['content'];
			var time = data[0]['datetime'];
			var author = data[0]['contributor'];
			
			$('#talk_title').text(title);
			mark_down(content,'#talk_content');
			$('#talk_contributor').text(author);
			$('#talk_time').text(time);
			$('#fileid_data').text(file_id);
			$('#markdown_data').text(content);
		},
		error: function(XMLHttpRequest,textStatus,errorThrown){
			alert('Error:' + errorThrown);
		}
	});
}

function talk_submit_comment(){
	var comment_text = $('#talk_comment_pad').val();
	$('#edit_mode').text('talk_comment');
	create_data();
}
