window.serverId = "spectacular-brave-artichoke"

window.servers = {
	wss:"wss://"+window.serverId+".glitch.me",
	saveFile:function (name,contents,callback) {
		var service = new WebSocket(this.wss);
		service.onopen = function () {
			service.send(JSON.stringify({
				command:"savefile",
				file:"./"+name,
				contents:contents
			}));
			service.onmessage = function (data) {
				callback();
				service.close();
			};
		};
	},
	readFile:function (name,callback) {
		var service = new WebSocket(this.wss);
		service.onopen = function () {
			service.send(JSON.stringify({
				"command":"getfile",
				"file":"./"+name
			}));
			service.onmessage = function (data) {
				callback(JSON.parse(data.data).data);
			};
		};
	}
};