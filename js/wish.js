(function(){
    var body = document.getElementsByTagName('body')[0];

    var canvas = document.createElement('canvas');
    canvas.width = 640;
    canvas.height= 640;
    body.appendChild(canvas);

    context = canvas.getContext('2d');

    context.save();
    context.translate(0, canvas.height);
    context.scale(1, -1);

    context.fillRect(0, 0, canvas.width, canvas.height);

    context.save();
    context.translate(0, 10);


    var stage = 3;
    var multipliers = [0, 1, -2, 1];
    var baseAngle = Math.PI/3;
    var unit = canvas.width/ Math.pow(3, stage);
    var m = multipliers.length;

    context.save();

    context.strokeStyle = 'white';
    context.lineWidth = 1;

    context.beginPath();
    context.moveTo(0, 0);
    for (var index = 0, total = Math.pow(m, stage); index < total; index++) {
	var phase = index;
	while (phase > 0 && phase % m == 0) {
	    phase = phase / m;
	}
	var multiplier = multipliers[phase % m];
	var angle = multiplier * baseAngle;
	context.rotate(angle)
	context.translate(unit, 0);
	context.lineTo(0, 0);
    }

    context.stroke();

    context.restore();

    context.restore();

    context.restore();
})();
