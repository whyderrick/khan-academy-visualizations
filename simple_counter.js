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
  BaseBlock.call(this, x, y, iconSize, coordinates, xStart, xEnd, yStart, yEnd)
  this.type = options.type;
  this.iconColorArray = options.rgbArray || [200, 200, 200];
};

OperationIcon.prototype = Object.create(BaseBlock.protoype);

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
  BaseBlock.call(this, x, y, iconSize, coordinates, xStart, yStart, yEnd);
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

    var leftBoundary = this.subtractionIcon.xEnd + 5;
    var rightBoundary = this.additionIcon.xStart - 5 - leftBoundary;

    var textXLocation = rightBoundary/2 - targetTextSize;

    fill(255,255,255);
    rect(leftBoundary + 1, this.yStart, rightBoundary, this.iconSize);

    fill(0,0,0);
    textSize(targetTextSize);
    text(this.panelCount, textXLocation, this.y + targetTextSize);
  };


//   Create the panel view
//   this.showPanel = function() {
//     this.subtractionIcon.makeIcon();
//     this.additionIcon.makeIcon();

//     fill(255, 0, 0);
//     var targetTextSize = this.iconSize * 0.8;
//     textSize(targetTextSize);
//     fill(0, 0, 0);
//     text(this.panelCount, (this.additionIcon.xEnd - this.xStart) * 0.85, this.y + targetTextSize);
//   };
};

var drawPanel = function(panelObj) {
  var pOb = panelObj;
  pOb.subtractionIcon.draw();
  pOb.additionIcon.draw();
  pOb.showCounter();
};

var drawPanelCounter =  function(panelObj) {
  var pOb = panelObj;
  var targetTextSize = pOb.iconSize * 0.8;
  textSize(targetTextSize);
  text(pOb.panelCount, (pOb.additionIcon.xEnd - pOb.xStart) * 0.85, pOb.y + targetTextSize);
};

var panel1options = {
  x: 50,
  y: 50,
};

var primaryPanel = new CountPanel(primaryPanelOptions);

drawPanel(primaryPanel);

var draw = function() {
//   primaryPanel.showCounter();
};

var mouseClicked = function() {
  var pp = primaryPanel;

  if(pp.subtractionIcon.clicked()) {
    pp.panelCount--;
    // rect(clickX, 0, 15, 15);
    pp.showCounter();
  }
  if (primaryPanel.rightIcon.clicked()) {
    pp.panelCount++;
    text("y.", clickX, 130);
  }
};
