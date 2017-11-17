function sound_start(){
	var sound_id = $('#sound_request').val();
	path = "/sound_swf/"+sound_id+".mp3";
	$('#jukebox').attr('src',path);
	var juke_button = $('#juke_button');
	
	if (juke_button.text()=='play') {
		document.getElementById("jukebox").play();
		juke_button.text('pause');
	} else {
		document.getElementById("jukebox").pause();
		juke_button.text('play');
	}
}