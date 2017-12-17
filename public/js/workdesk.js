
function end_submit(){
	mode = $('#edit_mode').text();
	input_clear("#workdesk input");
	input_clear("#workdesk textarea");
	if (mode=='new_talk'||mode=='edit_talk'){
		dom_empty("#wiki_title_lists");
		dom_empty("#wiki_title");
		dom_empty("#wiki_content");
		wiki_fetch_data();
	}
	if (mode=='new_talk'||mode=='edit_talk'){
		dom_empty("#talk_title_lists");
		talk_fetch_data();
	}
}


function edit_mode(mode){
	if(mode=='new_wiki'){
		$('#edit_mode').text('new_wiki');
		$('#workdesk input').empty();
		$('#workdesk textarea').empty();
	}else if(mode=='edit_wiki'){
		$('#edit_mode').text('edit_wiki');
		$('#workdesk input').val($('#wiki_title').text());
		$('#workdesk textarea').val($('#markdown_data').text());
	}else if(mode='new_talk'){
		$('#edit_mode').text('new_talk');
		$('#workdesk input').empty();
		$('#workdesk textarea').empty();
	}else if(mode='edit_talk'){
		$('#edit_mode').text('edit_talk');
		$('#workdesk input').val($('#wiki_title').text());
		$('#workdesk textarea').val($('#markdown_data').text());
	}else{
		
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

function create_data(){
	var mode = $('#edit_mode').text();
	var formdata = new FormData();
	var file_id = gen_ran('a',10);
	
	if (mode=='edit_wiki'){
		var title = $('#workdesk input').val();
		var text = $('#workdesk textarea').val();
		console.log('edit_wiki');
		formdata.append('file_id',$('#fileid_data').text());
	} else if(mode=='new_wiki') {
		var title = $('#workdesk input').val();
		var text = $('#workdesk textarea').val();
		console.log('new_wiki');
		formdata.append('file_id',file_id);
	} else if(mode=='new_talk'){
		var title = $('#workdesk input').val();
		var text = $('#workdesk textarea').val();
		console.log('new_talk');
		formdata.append('file_id',file_id);
	} else if(mode=='edit_talk'){
		var title = $('#workdesk input').val();
		var text = $('#workdesk textarea').val();
		console.log('edit_talk');
		formdata.append('file_id',$('#fileid_data').text());
	} else if(mode=='talk_comment') {
		var title = $('#talk_comment_pad input').val();
		var text = $('#talk_comment_pad textarea').val();
	}
	formdata.append('title',title);
	formdata.append('file_text',text);
	formdata.append('mode',mode);	
	send_data('Test',formdata);
}

function back_workdesk(textarea_selecter,previewer_selecter,button_selecter){
	$(textarea_selecter).removeClass('hide');
	$(previewer_selecter).empty().addClass('hide');
	$(button_selecter).attr('onclick',"show_preview('"+textarea_selecter+"','"+previewer_selecter+"','"+button_selecter+"');").text('preview');
}
