export default {
	previewAnimal: function(){

		var name = document.getElementById('name').value;
		var room = document.getElementById('room').value;
		var color = document.getElementById('color').value;
		var typeForm = document.querySelector('input[name="type"]:checked');
		var type = typeForm ? typeForm.value : null;
		var move = document.getElementById('editor').innerText;
		var genes = {};
		var GENE_LIST = ['size1', 'size2', 'speed1', 'speed2', 'markings1', 'markings2', 'fertility'];
		GENE_LIST.forEach(gene => {
			genes[gene] = {
				init: document.getElementById(`${gene}-init`).value,
				sdev: document.getElementById(`${gene}-sdev`).value
			}
		});

		return {
			name: name,
			room: room,
			color: color,
			type: type,
			move: move,
			genes: genes
		}

	}
}