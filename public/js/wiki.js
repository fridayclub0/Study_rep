$(function(){
	fetch_data();
	show_wiki('README','rvjmrqtmig');
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
			$('#wiki_fileid_data').text(file_id);
			$('#wiki_markdown_data').text(data);
		},
		error: function(XMLHttpRequest,textStatus,errorThrown){
			alert('Error:' + errorThrown);
		}
	});
}


function fetch_data(){
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


function wiki_mode(mode){
	if(mode=='new'){
		$('#wiki_edit_mode').text('new');
		$('#wiki_workdesk input').empty();
		$('#wiki_workdesk textarea').empty();
	}else{
		$('#wiki_edit_mode').text('edit');
		$('#wiki_workdesk input').val($('#wiki_title').text());
		$('#wiki_workdesk textarea').val($('#wiki_markdown_data').text());
	}
}


function show_preview(textarea_selecter,previewer_selecter,button_selecter){ //back_workdeskと対になっている
	var text_area = $(textarea_selecter);
	text = text_area.val();
	mark_down(text,previewer_selecter);
	text_area.addClass('hide');
	$(previewer_selecter).removeClass('hide');
	$(button_selecter).attr('onclick',"back_workdesk('"+textarea_selecter+"','"+previewer_selecter+"','"+button_selecter+"');").text('back');
}


function back_workdesk(textarea_selecter,previewer_selecter,button_selecter){
	$(textarea_selecter).removeClass('hide');
	$(previewer_selecter).empty().addClass('hide');
	$(button_selecter).attr('onclick',"show_preview('"+textarea_selecter+"','"+previewer_selecter+"','"+button_selecter+"');").text('preview');
}


function wiki_create_data(){
	var mode = $('#wiki_edit_mode').text();
	var formdata = new FormData();
	var file_id = gen_ran('a',10);
	var title = $('#wiki_workdesk input').val();
	var text = $('#wiki_workdesk textarea').val();
	
	if (mode=='edit'){
		console.log('edit');
		formdata.append('file_id',$('#wiki_fileid_data').text());
	} else {
		console.log('new');
		formdata.append('file_id',file_id);
	}
	formdata.append('title',title);
	formdata.append('file_text',text);
	formdata.append('mode',mode);	
	send_data('Test',formdata);
}