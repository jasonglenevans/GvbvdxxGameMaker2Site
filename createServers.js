let params = (new URL(document.location)).searchParams;
let id = Number(params.get('id'));
var ogSaveOnlineText = document.getElementById("saveOnlineButton").innerHTML
var projectId = 0

if (id) {
projectId = id
setTimeout(() => {
	document.getElementById("loadingscreen").hidden = false
	servers.readFile("ggm-community-accountid-project-"+projectId+".ggm2gserver",function (data) {
		gui.jsonTextToEditor(data);
		document.getElementById("loadingscreen").hidden = true
	});
},30)
} else {
servers.readFile("ggm-community-accountid-latest-id.txt",function (data) {
	projectId = Number(data)+1
	document.getElementById("loadingscreen").hidden = false
	servers.saveFile("ggm-community-accountid-latest-id.txt",projectId,function () {
		console.log("saved new id.");
		document.getElementById("loadingscreen").hidden = false
		servers.saveFile("ggm-community-accountid-project-"+projectId+".ggm2gserver",gui.editorToJsonText(),function () {
			console.log("saved new project data.");
			window.location.replace(window.location.href+"?id="+projectId);
			document.getElementById("loadingscreen").hidden = true
		});
	});
});
}
function saveOnline() {
	document.getElementById("saveOnlineButton").innerHTML = "Saving Online..."
	servers.saveFile("ggm-community-accountid-project-"+projectId+".ggm2gserver",gui.editorToJsonText(),function () {
		console.log("saved new project data.");
		document.getElementById("saveOnlineButton").innerHTML = ogSaveOnlineText
	});
}