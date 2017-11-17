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
	
});

function dom_empty(dom_id){
	$(dom_id).empty();
}

function input_clear(dom_id){
	console.log('input_clear');
	$(dom_id).val('');
}


function open_page(num){
	selecter = '.p'+num;
	console.log(selecter);
	var page = $(selecter);
	$('.p1').removeClass('Looking');
	$('.p2').removeClass('Looking');
	$('.p3').removeClass('Looking');
	$('.p4').removeClass('Looking');
	page.addClass('Looking');
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


function mark_down(text,selecter){	
	marked.setOptions({
 		renderer: new marked.Renderer(),
 	 	gfm: true,
 	 	tables: true,
 	 	breaks: false,
 	 	pedantic: false,
	 	sanitize: false,
  	 	smartLists: true,
  	 	smartypants: false
	});
	console.log(text+selecter);
	$(selecter).html(marked(text));
	$('pre code').each(function(i, block) {
    	hljs.highlightBlock(block);
	});
}



