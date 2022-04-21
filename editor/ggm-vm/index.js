window.vm = {
	control: {
		start: function (a) {
			if (vm.audioEngine) {
				if (vm.renderer) {
					vm.control.stop();
					vm.control.running = true;
					try{
						eval(vm.code)
					}catch(e){
						vm.console.error("Error in script:"+e);
					}
				} else {
					throw Error("Renderer Must Be Attached");
				}
			} else {
				throw Error("AudioEngine Must Be Attached");
			}
		},
		stop: function () {
			vm.control.running = false;
			vm.project.sprites = [];
			vm.project.events.tick = [];
			vm.project.sprites = [];
			vm.project.keysPressed = [];
			vm.audioEngine.stop();
		},
		runnning:false
	},
	code: "",
	renderer:null,
	attachRenderer:function (a) {
		vm.renderer = a;
		vm.renderer.start();
		return a;
	},
	attachAudioEngine:function (a) {
		vm.audioEngine = a;
		return a;
	},
	project: {
		mouseDown: false,
		mouseX:0,
		mouseY:0,
		keysPressed:[],
		sprites:[],
		events: {
			tick: []
		},
		block:{
			makeSprite:function () {
				var spr = {
					direction:90,
					x:0,
					y:0,
					width:32,
					height:32,
					image:null,
					flip:"none",
					id:Math.round(Math.random()*10000)+Math.round(Math.random()*10000)+Math.round(Math.random()*10000)+Math.round(Math.random()*10000)+Math.round(Math.random()*10000)
				};
				this.showSprite(spr);
				return spr;
			},
			showSprite:function (spr) {
				vm.project.sprites.push(spr);
			},
			hideSprite:function (spr) {
				var i = vm.project.sprites.indexOf(spr);
				if (i > -1) {
					vm.project.sprites.splice(i, 1); // 2nd parameter means remove one item only
				}
			},
			getMoseData:function () {
				return {
					x:vm.project.mouseX,
					y:vm.project.mouseY,
					down:vm.project.mouseDown
				};
			},
			dataToImg:function (dataURI) {
				var img = document.createElement("img");
				img.src = dataURI;
				img.setAttribute("style","image-rendering: pixelated;");
				return img;
			},
			isTouching: function (sprite1,sprite2, mode) {
				/*if (sp1.x > sp2.x) {
					var devideNumX = -2;
				} else {
					var devideNumX = 2;
				}
				sp1.x -= sp1.width/devideNumX;
				var res = (
				sp1.x < sp2.x + (sp2.width/1) &&
				sp1.x + (sp1.width/1) > sp2.x &&
				sp1.y < sp2.y + sp2.height &&
				sp1.height + sp1.y > sp2.y
				);
				sp1.x += sp1.width/devideNumX;
				return res;*/
				return vm.___CHECKCOLLIDE(sprite1,sprite2);
			},
			getKeyPressed: function (keyname) {
				if (vm.project.keysPressed[keyname]) {
					return true;
				} else {
					return false;
				}
			}
		}
	},
	vmTick: function () {
		if (vm.control.running) {
			for (var i in vm.project.events.tick) {
				vm.project.events.tick[i]()
			}
			try{
				vm.renderer.tick(vm.project.sprites);
			}catch(e){}
			this.ticks += 0;
		} else {
			this.ticks = 0;
		}
		window.requestAnimationFrame(vm.vmTick);
	},
	start:function () {
		vm.control.start();
	},
	stop:function () {
		vm.control.stop();
	},
	setMousePos: function (data) {
		this.project.mouseX = data.x;
		this.project.mouseY = data.y;
	},
	setMouseDown: function (data) {
		this.project.mouseDown = data;
	},
	console: {
		log: function (text) {
			console.log("[vm - program]: " + text);
		},
		error: function (text) {
			console.error("[vm - program]: " + text);
		}
	},
	simulateKey: function (data) {
		if (data.down) {
			this.project.keysPressed[data.key] = true;
		} else {
			this.project.keysPressed[data.key] = false;
		}
	},
	collideWidth:0,
	collideHeight:0,
	___CHECKCOLLIDE:function (spr1,spr2){
		return false;
	},
	collideDiv:document.createElement("div")
}
vm.___CHECKCOLLIDE = function isCollide(a, b) {
	var result = !(
        ((a.y + a.height) < (b.y)) ||
        (a.y > (b.y + b.height)) ||
        (((a.x*2) + a.width) < (b.x*2)) ||
        ((2*a.x) > ((b.x*2) + b.width))
    );
    return result;
};
window.requestAnimationFrame(vm.vmTick);
/*
TEST SCRIPTS:
while in devlopment i ran code to check if everything is working.
basic test:
var sprite = vm.project.block.makeSprite();
sprite.image = document.getElementById("testImage");

hide sprite test:

vm.project.block.hideSprite(sprite);

second sprite test:

var sprite2 = vm.project.block.makeSprite();
sprite2.image = document.getElementById("testImage");

rotating sprite test:
var sprite3 = vm.project.block.makeSprite();
sprite3.image = document.getElementById("testImage");
vm.project.events.tick.push(function () {
	sprite3.direction += 1;
});
*/