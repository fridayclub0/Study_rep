// セッションの格納
//window.sessionStorage.setItem(['キー名'],['値']);
// セッションの数の取得
//window.sessionStorage.length
// セッションの値の取得
//window.sessionStorage.getItem(['キー名']);
//console.log(a);    // => value1
// 指定したセッションの削除
//window.sessionStorage.removeItem(['キー名']);
// 全てのセッションの削除
//window.sessionStorage.clear();

$(function(){
	talk_fetch_data();
	window.sessionStorage.setItem(['mode'],'nomal');
	window.sessionStorage.setItem(['file_id'],'none');
	
	window.sessionStorage.setItem(['sysid'],'0000000000');
	window.sessionStorage.setItem(['img'],'no_image.png');
	window.sessionStorage.setItem(['ID'],'guest');
	
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
				$('<li>').html('<small style="padding-right:10px">author : '+author+'</small><small>'+time+'</small><br><h1 style="margin:10px 0;">'+title+'</h1>').attr('value',file_id).attr('onclick',"show_talk('"+title+"','"+file_id+"');talk_comment_timer('"+title+"','"+file_id+"');").appendTo(dom_ul);
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
			console.log(data);
			var content = data[0]['content'];
			var time = data[0]['datetime'];
			var author = data[0]['contributor'];
			var comments = data[0]['comments'];
			
			$('#talk_title').text(title);
			mark_down(content,'#talk_content');
			$('#talk_contributor').text(author);
			$('#talk_time').text(time);
			
			$('#fileid_data').text(file_id);
			$('#markdown_data').text(content);
			
			var comment_list_ul = $('#talk_comment_list');
			comment_list_ul.empty();
			$.each(comments,function(){
				$('<li>').html('<small style="padding-right:10px">author : '+this['author']+'</small><small>'+this['time']+'</small><br><p style="margin:10px 0;">'+this['comment']+'</p>').appendTo(comment_list_ul);
			});
		},
		error: function(XMLHttpRequest,textStatus,errorThrown){
			alert('Error:' + errorThrown);
		}
	});
}

function talk_comment_timer(title,file_id){
	var talk_time = setInterval(function() {
		show_talk(title,file_id);	
	},1000);
	$('#global_nav').click(function() {
		clearInterval(talk_time);
	});
}

function talk_submit_comment(){
	var formdata = new FormData();
	var file_id = $('#fileid_data').text();
	var comment = $('#talk_comment_pad textarea').val();
	
	formdata.append('file_id',file_id);
	formdata.append('comment',comment);
	
	send_data('talk_comment',formdata);
}


