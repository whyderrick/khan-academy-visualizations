var defaultIconSize = 30;

var primaryPanelOptions = {
  x: 50,
  y: 50,
};

var primaryOperatorOptions = {
  x: 300,
  y: 100,
  rgbArray: [],
};

var secondaryPanelOptions = {
  x: 50,
  y: 170,
};

var equalSignOptions = {
  x: 300,
  y: 220,
  rgbArray: [],
};

var BaseBlock = function(options) {
  this.x = options.x;
  this.y = options.y;
  this.iconSize = options.relativeSize * defaultIconSize || defaultIconSize;
  this.coordinates = [[this.x, this.y],
                      [this.x + this.iconSize, this.y + this.iconSize]];
  this.xStart = this.x;
  this.xEnd = this.x + this.iconSize;
  this.yStart = this.y;
  this.yEnd = this.y + this.iconSize;
};

var OperationIcon = function(options) {
  BaseBlock.call(this, options);
  this.type = options.type;
  this.iconColorArray = options.rgbArray || [200, 200, 200];
};
OperationIcon.prototype = Object.create(BaseBlock.prototype);

OperationIcon.prototype.clicked = function(){
  if((mouseX >= this.xStart && mouseX <= this.xEnd) &&
      (mouseY >= this.yStart && mouseY <= this.yEnd)) {
        return true;
  } else {
      return false;
  }
};

OperationIcon.prototype.draw = function(){
  var caller = this;

  var setup = function() {
    strokeWeight(1); //Reinitialize default from previous drawings

    fill(caller.iconColorArray[0], caller.iconColorArray[1], caller.iconColorArray[2]);
    rect(caller.x, caller.y, caller.iconSize, caller.iconSize); //Icon container

    strokeWeight(3);
  };

  if(this.type === "addition") {
    setup(this);
    line(this.x + this.iconSize * 0.25, this.y + this.iconSize * 0.5, this.x + this.iconSize * 0.75, this.y + this.iconSize * 0.5); // Horizontal line
    line(this.x + this.iconSize * 0.5, this.y + this.iconSize * 0.25, this.x + this.iconSize * 0.5, this.y + this.iconSize * 0.75); // Vertical line
  }
  if(this.type === "subtraction") {
    setup(this);

    line(this.x + this.iconSize * 0.25, this.y + this.iconSize * 0.5, this.x + this.iconSize * 0.75, this.y + this.iconSize * 0.5); // Horizontal line
  }
  if(this.type === "equals") {
    setup(this);

    line(this.x + this.iconSize * 0.25, this.y + this.iconSize * 0.4, this.x + this.iconSize * 0.75, this.y + this.iconSize * 0.4); // Horizontal line
    line(this.x + this.iconSize * 0.25, this.y + this.iconSize * 0.6, this.x + this.iconSize * 0.75, this.y + this.iconSize * 0.6); // Horizontal line
  }
  else {
    // alert('Invalid icon type. Try "addition", "subtraction", or "equals".');
  }
};

var CountPanel = function(options){
  BaseBlock.call(this, options);
  this.panelCount = 0;

  this.iconColorArray = options.rgbArray || [200, 200, 200];
  this.panelColor = options.panelRGBArray || [255, 255, 255];

  this.xEnd = this.x + this.iconSize * 4.2;

// Set up the icon options
  var subtractionIconOptions = {
    iconColorArray: this.iconColor,
    iconSize: this.iconSize,
    x: this.x + (this.x * 1.1),
    y: this.y,
    type: "subtraction",
  };

  var additionIconOptions = {
    iconColorArray: this.iconColor,
    iconSize: this.iconSize,
    x: this.x + (this.x * 3.1),
    y: this.y,
    type: "addition",
  };

  this.subtractionIcon = new OperationIcon(subtractionIconOptions);
  this.additionIcon = new OperationIcon(additionIconOptions);

  this.showPanel = function() {
    this.subtractionIcon.makeIcon();
  };

  this.showCounter = function() {
    // Overwrite any counter drawing that already exists
    var targetTextSize = this.iconSize * 0.8;

    var leftBoundary = this.subtractionIcon.xEnd + 1;
    var rightBoundary = this.additionIcon.xStart - 1;
    var textXLocation = leftBoundary + (rightBoundary - leftBoundary)/2 - targetTextSize * 0.25;

    noStroke();
    fill(255,255,255);
    rect(leftBoundary + 1, this.yStart, rightBoundary - leftBoundary, this.iconSize);

    fill(0,0,0);
    textSize(targetTextSize);
    text(this.panelCount, textXLocation, this.y + targetTextSize);

    //Reset Fill
    fill(255,255,255);
    strokeWeight(1);
  };
};

CountPanel.prototype = Object.create(BaseBlock.prototype);

CountPanel.prototype.draw = function() {
    this.subtractionIcon.draw();
    this.additionIcon.draw();
    this.showCounter();
};

var drawPanel = function(panelObj) {
  var pOb = panelObj;
  pOb.subtractionIcon.draw();
  pOb.additionIcon.draw();
  pOb.showCounter();
};

// var drawPanelCounter =  function(panelObj) {
//   var pOb = panelObj;
//   var targetTextSize = pOb.iconSize * 0.8;
//   textSize(targetTextSize);
//   text(pOb.panelCount, (pOb.additionIcon.xEnd - pOb.xStart) * 0.85, pOb.y + targetTextSize);
// };

var panel1options = {
  x: 50,
  y: 50,
};

var primaryPanel = new CountPanel(primaryPanelOptions);

primaryPanel.draw();


var mouseClicked = function() {
  //Primary Panel
  var pp = primaryPanel;

  if(pp.subtractionIcon.clicked()) {
    pp.panelCount--;
    pp.showCounter();
  }
  if (pp.additionIcon.clicked()) {
    pp.panelCount++;
    pp.showCounter();
  }
};
