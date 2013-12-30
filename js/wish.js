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

    var curves = {
	koch : function(stage){ return new Curve(stage, [0, 1, -2, 1], Math.PI/3, 3); },
	kochLike: function(stage, angle){ return new Curve(stage, [0, 1, -2, 1], angle, 2*(1 + Math.cos(angle))); }
    }

    var Paragraph = function(stage, messages, offsets){
	this.stage = stage;
	this.messages = messages;
	this.offsets = offsets;
    }
    Paragraph.prototype.drawOn = function(context, options){
	context.save();

	context.fillStyle = 'black';
	context.fillRect(0, 0, canvas.width, canvas.height);

	context.restore();
	context.save();

	for(var key in (options || {})) {
	    context[key] = options[key];
	}

	for (var index = 0; index < this.messages.length; index++){
	    context.fillText(this.messages[index], this.offsets.indent, (index + 1) * this.offsets.baseline);
	}

	context.restore();
	context.save();

	context.translate(0, canvas.height);
	context.scale(1, -1);

	context.translate(0, 10);

	var koch = new curves.koch(this.stage);
	koch.drawOn(context, options);

	context.restore();
    };

    var Story = function(paragraphs){
	this.paragraphs = paragraphs;
	this.currentIndex = 0;
    }
    Story.prototype.drawOn = function(context, options){
	this.paragraphs[this.currentIndex].drawOn(context, options);
    };
    Story.prototype.next = function(){
	this.currentIndex = Math.min(this.currentIndex + 1, this.paragraphs.length - 1);
    }
    Story.prototype.previous = function(){
	this.currentIndex = Math.max(0, this.currentIndex - 1);
    }

    var body = document.getElementsByTagName('body')[0];

    var canvas = document.createElement('canvas');
    canvas.width = 640;
    canvas.height= 640;
    body.appendChild(canvas);

    context = canvas.getContext('2d');

    var paragraphOptions = { 'indent': 10, 'baseline': 60 };
    var story = new Story([
	new Paragraph(1, ['Life...'], paragraphOptions),
	new Paragraph(2, ['like the undulations', 'of a river'], paragraphOptions),
	new Paragraph(3, ['flows to and fro'], paragraphOptions),
    ]);
    function drawStory() {
	story.drawOn(context, { 'fillStyle': 'white', 'font': '50px sans-serif', 'strokeStyle': 'white', 'lineWidth': '1' });
    }
    drawStory();

    function advanceStory() {
	story.next();
	drawStory();
    }

    function retreatStory() {
	story.previous();
	drawStory();
    }

    body.addEventListener('keydown', function(event){
	if (event.keyCode == 39) {
	    advanceStory();
	}
	if (event.keyCode == 37) {
	    retreatStory();
	}
    });

    drawCurve = (function(){
	var start = (new Date()).getTime();
	var period = 12 * 1000;

	function number(t) {
	    return 1 + Math.floor((t - start)/period) % 6
	}

	return function drawCurve(t) {
	    context.save();
	    context.fillRect(0, 0, canvas.width, canvas.height);
	    var alpha = 2 * Math.PI * (t - start) / period;
	    context.translate(0, 10);

	    var koch = new curves.kochLike(number(t), 9*Math.PI/40 * (1 - Math.cos(alpha)));
	    koch.drawOn(context, { strokeStyle: 'white', lineWidth: 1 });
	    context.restore();
	}
    })();

    function continuous(){
	drawCurve((new Date()).getTime());
	requestAnimationFrame(continuous);
    }
    //continuous();
})();
