window.renderer = {
	canvas: null,
	backgroundImg:null,
	start: function () {
		this.context = this.canvas.getContext("2d");
		this.context.strokeStyle = this.color;
		this.context.fillStyle = this.color;
		this.context.beginPath();
		this.context.fillRect(0, 0, this.canvas.width + 2, this.canvas.height + 2);
		this.context.stroke();
		this.test=0;
		this.canvas.style.imageRendering = "Pixelated";
	},
	tick: function (sprites) {
		this.context.fillStyle = this.color;
		this.context.strokeStyle = this.color;
		this.context.beginPath();
		this.context.fillRect(0, 0, this.canvas.width + 2, this.canvas.height + 2);
		this.context.stroke();
		this.context.webkitImageSmoothingEnabled = false;
		this.context.mozImageSmoothingEnabled = false;
		this.context.imageSmoothingEnabled = false;
		for (var i in sprites) {
			sprites[i];
			this._drawSprite(sprites[i]);
		}
	},
	_drawSprite: function (json) {
		this.context.save();
		//use the try to not throw an error when renderering failed, so the renderer keeps ticking.
		try{
			var __calculated_x = json.x;
			var __calculated_y = 0 - json.y;
			this.context.translate(this.canvas.width/2+json.x+__calculated_x, this.canvas.height/2+__calculated_y); //this moves the image to the sprite position.
			this.context.rotate((json.direction - 90)*Math.PI/180);
			if (json.flip == "hor") {
				this.context.scale(-1,1);
			} else {
				if (json.flip == "ver") {
					this.context.scale(1,-1);
				}
			}
			this.context.drawImage(json.image, json.width/-2, json.height/-2, json.width, json.height); //draw the image and offset it so it rotates in the center.
		}catch(e){}
		this.context.restore();
	},
	color:"#ffffff"
}