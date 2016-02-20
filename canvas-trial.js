var GL;
var squareVerticesBuffer;
var mvMatrix;
var shaderProgram;
var vertexPositionAttribute;
var perspectiveMatrix;

function start(){
	var canvas = document.getElementById('game-canvas');

	GL = initWebGL(canvas);

	if(GL){
		GL.clearColor(0.0, 0.0, 0.0, 1.0);
		GL.enable(GL.DEPTH_TEST);
		GL.depthFunc(GL.LEQUAL);
		GL.clear(GL.COLOR_BUFFER_BIT, GL.DEPTH_BUFFER_BIT);
		initShaders();
		initBuffers();
		setInterval(drawScene, 15);
	}

}

function initWebGL(canvas){
	gl = null;
	try{
		gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
	}
	catch(e){
		if(!gl){
			console.log("Looks like your browser ran out of keks for WebGL.");
		}
	}
	return gl;
}

function initShaders(){
	var fragmentShader = getShader(GL, 'shader-fs');
	var vertexShader = getShader(GL, 'shader-vs');

	shaderProgram = GL.createProgram();
	GL.attachShader(shaderProgram, vertexShader);
	GL.attachShader(shaderProgram, fragmentShader);
	GL.linkProgram(shaderProgram);

	if(!GL.getProgramParameter(shaderProgram, GL.LINK_STATUS)){
		console.log("Unable to initialize shader program.");
	}

	GL.useProgram(shaderProgram);
	vertexPositionAttribute = GL.getAttribLocation(shaderProgram, 'aVertexPosition');
	GL.enableVertexAttribArray(vertexPositionAttribute);
}

function getShader(gl, id){
	var shaderScript;
	var source;
	var currentChild;
	var shader;
	shaderScript = document.getElementById(id);
	if(!shaderScript){
		return null;
	}
	source = "";
	currentChild = shaderScript.firstChild;
	while(currentChild){
		if(currentChild.nodeType == currentChild.TEXT_NODE){
			source += currentChild.textContent;
			console.log(source);
		}
		currentChild = currentChild.nextSibling;
	}
	if(shaderScript.type == 'x-shader/x-fragment'){
		shader = gl.createShader(gl.FRAGMENT_SHADER);
	}
	else if(shaderScript.type == 'x-shader/x-vertex'){
		shader = gl.createShader(gl.VERTEX_SHADER);
	}
	else{
		console.log("I have no idea what this is, but it is not a shader.");
		return null;
	}
	gl.shaderSource(shader, source);
	gl.compileShader(shader);
	if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)){
		console.log("Error on shader compile: " + gl.getShaderInfoLog(shader));
		return null;
	}
	return shader;
}

var horizAspect = 400.0 / 400.0;

function initBuffers(){
	squareVerticesBuffer = GL.createBuffer();
	GL.bindBuffer(GL.ARRAY_BUFFER, squareVerticesBuffer);
	var vertices = [
		1.0, 1.0, 0.0,
		-1.0, 1.0, 0.0,
		1.0, -1.0, 0.0,
		-1.0, -1.0, 0.0
	];
	GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(vertices), GL.STATIC_DRAW);
}

function drawScene(){
	GL.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT);
	perspectiveMatrix = makePerspective(45, horizAspect, 0.1, 100.0);
	loadIdentity();
	mvTranslate([-0.0, 0.0, -6.0]);
	GL.bindBuffer(gl.ARRAY_BUFFER, squareVerticesBuffer);
	GL.vertexAttribPointer(vertexPositionAttribute, 3, GL.FLOAT, false, 0, 0);
	setMatrixUniforms();
	GL.drawArrays(GL.TRIANGLE_STRIP, 0, 4);
}

function makePerspective(fieldOfViewInRadians, aspectRatio, near, far){
	var f = Math.tan(Math.PI * 0.5 - 0.5 * fieldOfViewInRadians);
	var rangeInv = 1.0 / (near - far);
	return [
		f/aspectRatio, 0, 0, 0,
		0, f, 0, 0,
		0, 0, (near + far) * rangeInv, -1,
		0, 0, near * far * rangeInv * 2, 0
	];
}

function loadIdentity(){
	mvMatrix = Matrix.I(4);
}

function multMatrix(m){
	mvMatrix = mvMatrix.x(m);
}

function mvTranslate(v){
	multMatrix(Matrix.Translation($V([v[0], v[1], v[2]])).ensure4x4());
}

function setMatrixUniforms() {
	var pUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
	gl.uniformMatrix4fv(pUniform, false, new Float32Array(perspectiveMatrix.flatten()));
	var mvUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
	gl.uniformMatrix4fv(mvUniform, false, new Float32Array(mvMatrix.flatten()));
}

start();