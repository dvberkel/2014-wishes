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

    context.save();

    context.strokeStyle = 'white';
    context.lineWidth = 1;

    var unit = canvas.width/81;

    context.beginPath();
    context.moveTo(0, 0);
    [
	0, 1, -2, 1, 1, 1, -2, 1, -2, 1, -2, 1, 1, 1, -2, 1,
	1, 1, -2, 1, 1, 1, -2, 1, -2, 1, -2, 1, 1, 1, -2, 1,
	-2, 1, -2, 1, 1, 1, -2, 1, -2, 1, -2, 1, 1, 1, -2, 1,
	1, 1, -2, 1, 1, 1, -2, 1, -2, 1, -2, 1, 1, 1, -2, 1,

	1, 1, -2, 1, 1, 1, -2, 1, -2, 1, -2, 1, 1, 1, -2, 1,
	1, 1, -2, 1, 1, 1, -2, 1, -2, 1, -2, 1, 1, 1, -2, 1,
	-2, 1, -2, 1, 1, 1, -2, 1, -2, 1, -2, 1, 1, 1, -2, 1,
	1, 1, -2, 1, 1, 1, -2, 1, -2, 1, -2, 1, 1, 1, -2, 1,

	-2, 1, -2, 1, 1, 1, -2, 1, -2, 1, -2, 1, 1, 1, -2, 1,
	1, 1, -2, 1, 1, 1, -2, 1, -2, 1, -2, 1, 1, 1, -2, 1,
	-2, 1, -2, 1, 1, 1, -2, 1, -2, 1, -2, 1, 1, 1, -2, 1,
	1, 1, -2, 1, 1, 1, -2, 1, -2, 1, -2, 1, 1, 1, -2, 1,

	1, 1, -2, 1, 1, 1, -2, 1, -2, 1, -2, 1, 1, 1, -2, 1,
	1, 1, -2, 1, 1, 1, -2, 1, -2, 1, -2, 1, 1, 1, -2, 1,
	-2, 1, -2, 1, 1, 1, -2, 1, -2, 1, -2, 1, 1, 1, -2, 1,
	1, 1, -2, 1, 1, 1, -2, 1, -2, 1, -2, 1, 1, 1, -2, 1,
    ].forEach(function(angle){
	angle *= Math.PI/3;
	context.rotate(angle)
	context.translate(unit, 0);
	context.lineTo(0, 0);
    });

    context.stroke();

    context.restore();

    context.translate(0, canvas.height/2);

    context.save();

    context.strokeStyle = 'white';
    context.lineWidth = 1;

    var n = 4;
    var unit = canvas.width/ Math.pow(3, n);

    context.beginPath();
    context.moveTo(0, 0);
    var proto = [0, 1, -2, 1];
    for (index = 0; index < Math.pow(4, n); index++) {
	var m = index;
	while (m > 0 && m % 4 == 0) {
	    m = m / 4;
	}
	var i = proto[m % 4];
	var angle = i * Math.PI/3;
	context.rotate(angle)
	context.translate(unit, 0);
	context.lineTo(0, 0);
    }

    context.stroke();

    context.restore();

    context.restore();

    context.restore();
})();
