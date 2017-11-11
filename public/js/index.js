function open_page(num){
	selecter = '#page'+num;
	console.log(selecter);
	var page = $(selecter);
	$('#page1').removeClass('looking');
	$('#page2').removeClass('looking');
	$('#page3').removeClass('looking');
	page.addClass('looking');
}

function gen_ran(mode,len){
	var charset = '';
	if ( mode.match('A') ){charset = charset + 'ABCDEFGHIJKLNMOPQRSTUVWXYZ';}
	if ( mode.match('a') ){charset = charset + 'abcdefghijklmnopqrstuvwxyz';}
	if ( mode.match('d') ){charset = charset + '0123456789';}
	if ( mode.match('j') ){charset = charset + 'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわおん';}

	var cs_len = charset.length;
	var ran = "";
	
	for(var i=0; i<len; i++){ran += charset[Math.floor(Math.random()*cs_len)];}
	return ran;
}

function create_data(){
	var formdata = new FormData();
	
	var file_id = gen_ran('a',10);
	var text = $('#test_input').val();
	
	formdata.append('file_id',file_id);
	formdata.append('file_text',text);
	
	send_data('Test',formdata);
}

function send_data(table,formdata){
	formdata.append('table',table);
	$.ajax({
		url:'/database',
		type:"POST",
		contentType: false,
		processData: false,
		cache: false,
		data: formdata,
		success: function(data){
			console.log(data);
		},
		error: function(XMLHttpRequest,textStatus,errorThrown){
			alert('Error:' + errorThrown);
		}
	});
}


