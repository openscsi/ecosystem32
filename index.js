import Module from './module';
import Viewer from './viewer';
import AnimalForm from './form';

console.log('I am a', Module);

window.viewerMain = function(){
	Viewer.main();
}

window.previewAnimal = function(){
	return AnimalForm.previewAnimal();
}
