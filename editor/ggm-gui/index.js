window.gui = {
	loadScript: function (src,callback) {
		var tmpscript = document.createElement("script");
		tmpscript.src = window.getDirectory().gui + "/" + src;
		document.body.appendChild(tmpscript);
		tmpscript.onload = callback;
		return tmpscript;
	},
	blocks: {
		addExtension: function (json) {
			Blockly.defineBlocksWithJsonArray(json.blocks);
			toolboxHTML += "<category name='"+json.title+"' colour='"+json.color+"'>"+json.contents+"</category>";
			workspace.updateToolbox("<xml>"+toolboxHTML+"</xml>")
		}
	},
	editorToJsonText:function () {
		return JSON.stringify({
			blocklyXML:Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(workspace)),
			files:fileResourcesArray,
			title:document.getElementById("gameTitle").value
		});
	},
	jsonTextToEditor:function (JsonText) {
		clearResources();
		var JsonTextParsed = JSON.parse(JsonText);
		var i = 0;
		while (JsonTextParsed.files.length > i) {
			readFileAsResource(JsonTextParsed.files[i].data,JsonTextParsed.files[i].name,JsonTextParsed.files[i].type);
			i += 1;
		}
		workspace.clear();
		document.getElementById("gameTitle").value = JsonTextParsed.title
		Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(JsonTextParsed.blocklyXML),workspace);
	}
}
console.log("[gui]:starting up.");
var loadingScreen = document.getElementById("loadingscreen");
loadingScreen.hidden = true;
var toolbox = document.getElementById('toolbox');
var toolboxHTML = document.getElementById('toolbox').innerHTML;
//blockly injection starts
var blocklyArea = document.getElementById('blocklyArea');
var blocklyDiv = document.getElementById('blocklyDiv');
window.workspace = Blockly.inject(blocklyDiv,{
	toolbox: toolbox,
	move:{
		scrollbars: {
			horizontal: true,
			vertical: true
		},
		drag: true,
		wheel: false
	},
	trashcan:false,
	grid:{
		spacing: 20,
		length: 3,
		colour: '#bac8ff',
		snap: true
	},
	theme: Blockly.Themes.GGM,
	renderer:"custom_renderer"
});
console.log("[gui]:injected blockly.");
var onresize = function(e) {
	// Compute the absolute coordinates and dimensions of blocklyArea.
	var element = blocklyArea;
	var x = 0;
	var y = 0;
	do {
		x += element.offsetLeft;
		y += element.offsetTop;
		element = element.offsetParent;
	} while (element);
	// Position blocklyDiv over blocklyArea.
	blocklyDiv.style.left = x + 'px';
	blocklyDiv.style.top = y + 'px';
	blocklyDiv.style.width = blocklyArea.offsetWidth + 'px';
	blocklyDiv.style.height = blocklyArea.offsetHeight + 'px';
	Blockly.svgResize(workspace);
};
window.addEventListener('resize', onresize, false);
onresize();
Blockly.svgResize(workspace);
console.log("[gui]:loading blocks...");
gui.loadScript("blocks/index.js");
renderer.canvas = document.getElementById("gameScreen");
vm.code = "";
vm.attachRenderer(renderer);
vm.attachAudioEngine(audioEngine);
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: ((evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width)/2,
        y: (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
    };
}
document.getElementById("gameScreen").onmousemove = function (event) {
	var pos = getMousePos(document.getElementById("gameScreen"), event);// get adjusted coordinates as above
    var x = Math.round(pos.x/1)-(document.getElementById("gameScreen").width/2)/2;
    var y = Math.round(pos.y*-1)+(document.getElementById("gameScreen").height/2);
	
	vm.setMousePos({
		x:x,
		y:y
	});
}
document.getElementById("gameScreen").onmousedown = function (event) {
	event.preventDefault();
	vm.setMouseDown(true);
}
document.getElementById("gameScreen").onmouseup = function (event) {
	event.preventDefault();
	vm.setMouseDown(false);
}
setInterval(function () {
	document.getElementById("testPos").innerHTML = vm.project.mouseX+","+vm.project.mouseY+", down:"+ vm.project.mouseDown;
},1);
document.body.onkeydown = function (event) {
	vm.simulateKey({
		key:event.key,
		down:true
	});
}
document.body.onkeyup = function (event) {
	vm.simulateKey({
		key:event.key,
		down:false
	});
}
/*
some test to test if the mouse on center:
var sprite = vm.project.block.makeSprite();
sprite.image = document.getElementById("testImage");
function test(){sprite.x=vm.project.mouseX*1;sprite.y=vm.project.mouseY*1;}vm.project.events.tick.push(test);*/

/*overide the console with the html one*/
vm.console.log = function (text) {
	document.getElementById('console').innerHTML += text+"<br>";
}
vm.console.error = function (text) {
	document.getElementById('console').innerHTML += "Error:"+text+"<br>";
}
/*resources*/
var resoureupload = document.getElementById('resourceupload');
var files = document.getElementById('files');
window.fileResources = [];
window.fileResourcesArray = [];
resoureupload.accept = "audio/*,image/*";
function clearResources() {
	files.innerHTML = "";
	window.fileResources = [];
	window.fileResourcesArray = [];
}
function readFileAsResource(data,name,type) {
	var div = document.createElement("div");
	div.innerHTML = name+`:
	`;
	resourceupload.files[0]
	if (type == "image") {
		var image = document.createElement("img");
		image.src = data;
		div.appendChild(image);
		image.width = "200";
	}
	if (type == "audio") {
		var audio = document.createElement("audio");
		audio.src = data;
		audio.controls = true;
		div.appendChild(audio);
	}
	div.innerHTML += "<br>";
	files.appendChild(div);
	window.fileResources[name] = ({data:data,name:name,type:type});
	window.fileResourcesArray.push({data:data,name:name,type:type});
}
resoureupload.onchange = function () {
	var reader = new FileReader();
	reader.onload = function () {
		readFileAsResource(reader.result,resourceupload.files[0].name,resourceupload.files[0].type.split('/')[0]);
		resourceupload.value = "";
	}
	if (resourceupload.files[0]) {
		reader.readAsDataURL(resourceupload.files[0]);
	}
};

function save() {
	var a = document.createElement("a");
	const contents = gui.editorToJsonText();
	const blob = new Blob([contents], {type : 'ggm2g'});
	a.href = URL.createObjectURL(blob);
	a.download = document.getElementById("gameTitle").value+".ggm2g";
	a.click();
}
function load() {
	document.getElementById("gameFileUpload").click();
}
document.getElementById("gameFileUpload").onchange = function () {
	var reader = new FileReader();
	reader.onload = function () {
		gui.jsonTextToEditor(reader.result);
		document.getElementById("gameFileUpload").value = "";
	};
	if (document.getElementById("gameFileUpload").files[0]) {
		reader.readAsText(document.getElementById("gameFileUpload").files[0]);
	}
}
//dialogs
var dialogBox = document.getElementById("dialogBox");
var dialogBackground = document.getElementById("dialogBackground");
var dialogOptions = {
	inputs:{
		txt:document.getElementById("dialogInput")
	},
	
	buttons:{
		ok:document.getElementById("dialogButtonOk"),
		
		cancel:document.getElementById("dialogButtonCancel")
		
	},
	name:document.getElementById("dialogName"),
	
	txt:document.getElementById("dialogText"),
	
	hideAll: function () {
		document.getElementById("dialogInput").hidden = true;
		document.getElementById("dialogText").hidden = true;
		document.getElementById("dialogButtonOk").hidden = false;
		document.getElementById("dialogButtonCancel").hidden = false;
	}
};
var app = document.getElementById("app");
dialogBackground.style.display = "none";
Blockly.alert = (function(message, callback) {
	dialogBackground.style.display = "block";
	
	dialogBox.style.display = "block";
	
	dialogOptions.hideAll();
	
	dialogOptions.name.innerHTML = message;
	
	document.getElementById("dialogButtonCancel").hidden = true;
	
	dialogOptions.buttons.ok.onclick = function () {
		app.hidden = false;
		try {callback();} catch(e) {}
		dialogBackground.style.display = "none";
		dialogBox.style.display = "none";
	};
	
	dialogOptions.buttons.cancel.onclick = function () {
		try {callback();} catch(e) {}
		dialogBackground.style.display = "none";
		dialogBox.style.display = "none";
	};
});

Blockly.confirm = (function(message, callback) {
	dialogBackground.style.display = "block";
	
	dialogBox.style.display = "block";
	
	dialogOptions.hideAll();
	
	dialogOptions.name.innerHTML = message;
	
	dialogOptions.buttons.ok.onclick = function () {
		app.hidden = false;
		try {callback(true);} catch(e) {}
		dialogBackground.style.display = "none";
		dialogBox.style.display = "none";
	};
	
	dialogOptions.buttons.cancel.onclick = function () {
		try {callback(false);} catch(e) {}
		dialogBackground.style.display = "none";
		dialogBox.style.display = "none";
	};
});

Blockly.prompt = (function(message, defaultValue, callback) {
	dialogBackground.style.display = "block";
	
	
	dialogBox.style.display = "block";
	
	
	dialogOptions.hideAll();
	
	
	dialogOptions.name.innerHTML = message;
	
	dialogOptions.inputs.txt.value = defaultValue;
	
	
	dialogOptions.inputs.txt.hidden = false;
	
	
	let dialogInput = dialogOptions.inputs.txt;
	
	
	dialogOptions.buttons.ok.onclick = function () {
		try {callback(dialogInput.value);} catch(e) {}
		dialogBackground.style.display = "none";
		dialogBox.style.display = "none";
	};
	
	
	dialogOptions.buttons.cancel.onclick = function () {
		try {callback(null);} catch(e) {}
		dialogBackground.style.display = "none";
		dialogBox.style.display = "none";
	};
});