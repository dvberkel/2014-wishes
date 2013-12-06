(function(){
    var Curve = function(stage, multipliers, baseAngle, growth){
	this.stage = stage;
	this.multipliers = multipliers;
	this.baseAngle = baseAngle;
	this.growth = growth;
	this.m = multipliers.length;
    }
    Curve.prototype.drawOn = function(context, options) {
	context.save();

	for(var key in (options || {})) {
	    context[key] = options[key];
	}

	context.beginPath();
	context.moveTo(0, 0);
	var unit = context.canvas.width/ Math.pow(this.growth, this.stage);
	for (var index = 0, total = Math.pow(this.m, this.stage); index < total; index++) {
	    var phase = index;
	    while (phase > 0 && phase % this.m == 0) {
		phase = phase / this.m;
	    }
	    var multiplier = this.multipliers[phase % this.m];
	    var angle = multiplier * this.baseAngle;
	    context.rotate(angle)
	    context.translate(unit, 0);
	    context.lineTo(0, 0);
	}

	context.stroke();

	context.restore();
    }

    var body = document.getElementsByTagName('body')[0];

    var canvas = document.createElement('canvas');
    canvas.width = 640;
    canvas.height= 640;
    body.appendChild(canvas);

    context = canvas.getContext('2d');
    context.translate(0, canvas.height);
    context.scale(1, -1);

    context.fillRect(0, 0, canvas.width, canvas.height);

    context.save();
    context.translate(0, 10);

    var koch = new Curve(7, [0, 1, -2, 1], Math.PI/3, 3);
    koch.drawOn(context, { strokeStyle: 'white', lineWidth: 1 });

    context.restore();
})();
