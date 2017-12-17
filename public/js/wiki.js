$(function(){
	wiki_fetch_data();
});

function show_wiki(title,file_id){
	var formdata = new FormData();
	formdata.append('table','get_wiki_data');
	formdata.append('file_id',file_id);
	$.ajax({
		url:'/database',
		type:"POST",
		contentType: false,
		processData: false,
		cache: false,
		data: formdata,
		success: function(data){
			$('#wiki_title').text(title);
			mark_down(data,'#wiki_content');
			$('#fileid_data').text(file_id);
			$('#markdown_data').text(data);
		},
		error: function(XMLHttpRequest,textStatus,errorThrown){
			alert('Error:' + errorThrown);
		}
	});
}


function wiki_fetch_data(){
	var formdata = new FormData();
	formdata.append('table','fetch_wiki_title');
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
				var title = this['wiki_title'];
				var file_id = this['file_id'];
				var dom_ul = $('#wiki_title_lists');
				var dom_li = $('<li>').text(title).attr('value',file_id).attr('onclick',"show_wiki('"+title+"','"+file_id+"');").appendTo(dom_ul);
			});
		},
		error: function(XMLHttpRequest,textStatus,errorThrown){
			alert('Error1:' + errorThrown);
		}
	});
}


