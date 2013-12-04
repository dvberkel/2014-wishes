(function(){
    var body = document.getElementsByTagName('body')[0];

    var canvas = document.createElement('canvas');
    canvas.width = 640;
    canvas.height= 640;
    body.appendChild(canvas);

    context = canvas.getContext('2d');
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.save();
    context.translate(0, canvas.height);
    context.scale(1, -1);

    context.save();
    context.translate(0, 10);

    context.strokeStyle = 'white';
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(canvas.width/3, 0);
    context.lineTo(canvas.width/2, canvas.width/3 * Math.sqrt(3)/2);
    context.lineTo(2*canvas.width/3, 0);
    context.lineTo(canvas.width, 0);
    context.stroke();

    context.restore();

    context.restore();
})();
