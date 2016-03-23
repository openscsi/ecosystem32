import Viewer from './viewer';
import AnimalForm from './lib/form';

window.viewerMain = function(){
	Viewer.main();
}

window.previewAnimal = function(){
	return AnimalForm.previewAnimal();
}

window.formMain = function(){
	$('a').click(function(){
		$('html, body').animate({
			scrollTop: $( $.attr(this, 'href') ).offset().top
		}, 500);
		return false;
	});

	$('#submit-animal').click(function(){
		var json = previewAnimal();
		document.getElementById('preview-json').value = JSON.stringify(json);
	});

	$('.form-watch').change(function(){
		var json = previewAnimal();
		document.getElementById('preview-json').value = JSON.stringify(json);
	});

	var editor = ace.edit('editor');
	editor.setTheme('ace/theme/monokai');
	editor.getSession().setMode('ace/mode/javascript');

	editor.on('change', function(e){
		var json = previewAnimal();
		document.getElementById('preview-json').value = JSON.stringify(json);
	});
}

window.roomMain = function(){
	$('a').click(function(){
		$('html, body').animate({
			scrollTop: $( $.attr(this, 'href') ).offset().top
		}, 500);
		return false;
	});

	$('#create-room').click(function(){
		var output = document.getElementById('response');
		var roomID = document.getElementById('room').value;
		var promise = createRoom(roomID);
		promise.then(function(success){
			if(success){
				output.innerHTML = 'Your room was created!';
			}
			else{
				output.innerHTML = 'Sorry, that code is taken. Please choose another one.';
			}
		});
	});
}
