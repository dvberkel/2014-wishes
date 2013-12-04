(function(){
    var body = document.getElementsByTagName('body')[0];

    var canvas = document.createElement('canvas');
    canvas.width = 640;
    canvas.height= 640;
    body.appendChild(canvas);

    context = canvas.getContext('2d');
    context.fillRect(0, 0, canvas.width, canvas.height);
})();
