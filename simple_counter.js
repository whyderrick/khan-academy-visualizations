var defaultIconSize = 30;

var primaryPanelOptions = {
  x: 10,
  y: 20,
};

var switchSignOptions = {
  relativeSize: 1.5,
  x: 130,
  y: 65,
  type: "addition",
  rgbArray: [187,112,0],
};

var secondaryPanelOptions = {
  x: 175,
  y: 125,
};

var equalSignOptions = {
  x: 300,
  y: 175,
  type: "equals",
  relativeSize: 1.7,
  rgbArray: [27, 202, 14],
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
  //Set Defaults for all icons

  strokeWeight(1); //Reinitialize default from previous drawings
  fill(this.iconColorArray[0], this.iconColorArray[1], this.iconColorArray[2]);
  rect(this.x, this.y, this.iconSize, this.iconSize); //Icon container
  fill(0, 0, 0);
  strokeWeight(3);

  if(this.type === "addition") {
    // Horizontal plus line
    line( this.x + this.iconSize * 0.25, // Starting x
          this.y + this.iconSize * 0.5, // Starting y
          this.x + this.iconSize * 0.75, // Ending x
          this.y + this.iconSize * 0.5  ); // Ending y
    // Vertical plus line
    line(this.x + this.iconSize * 0.5, // Starting x
         this.y + this.iconSize * 0.25, //Starting y
         this.x + this.iconSize * 0.5, // Ending x
         this.y + this.iconSize * 0.75  ); // Ending y
  }
  else if(this.type === "subtraction") {
    // Horizontal line
    line(this.x + this.iconSize * 0.25, // Starting x
         this.y + this.iconSize * 0.5, // Starting y
         this.x + this.iconSize * 0.75, // Starting x
         this.y + this.iconSize * 0.5  ); // Starting y
  }
  else if(this.type === "equals") {
    // Upper Horizontal line
    line(this.x + this.iconSize * 0.25, //Starting x
         this.y + this.iconSize * 0.4,  // Starting y
         this.x + this.iconSize * 0.75, // Ending x
         this.y + this.iconSize * 0.4  ); // Ending y
    // Lower horizontal line
    line(this.x + this.iconSize * 0.25,
         this.y + this.iconSize * 0.6,
         this.x + this.iconSize * 0.75,
         this.y + this.iconSize * 0.6  );
  }
};

var CountPanel = function(options){
  BaseBlock.call(this, options);
  this.panelCount = 0;

  this.iconColorArray = options.rgbArray || [200, 200, 200];
  this.panelColor = options.panelRGBArray || [255, 255, 255];

  this.xEnd = this.iconSize * 4 + this.x;

// Set up the icon options
  var subtractionIconOptions = {
    iconColorArray: this.iconColor,
    iconSize: this.iconSize,
    x: this.x,
    y: this.y,
    type: "subtraction",
  };

  var additionIconOptions = {
    iconColorArray: this.iconColor,
    iconSize: this.iconSize,
    x: this.xEnd - this.iconSize,
    y: this.y,
    type: "addition",
  };

  this.subtractionIcon = new OperationIcon(subtractionIconOptions);
  this.additionIcon = new OperationIcon(additionIconOptions);

  this.showPanel = function() {
    this.subtractionIcon.makeIcon();
  };

  this.showCounter = function() {
    var targetTextSize = this.iconSize * 0.8;
    // Define the counter value position within the existing icons.
    var leftBoundary = this.subtractionIcon.xEnd;
    var rightBoundary = this.additionIcon.xStart;
    var textXLocation = leftBoundary + (rightBoundary - leftBoundary)/2 - targetTextSize * 0.25;

    // Clear the existing counter space before redrawing
    strokeWeight(1);
    fill(255,255,255);
    rect(leftBoundary + 1, this.yStart, rightBoundary - leftBoundary, this.iconSize);

    // Update the visible counter value
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
    strokeWeight(1);
    this.subtractionIcon.draw();
    this.additionIcon.draw();
    this.showCounter();
};

var primaryPanel = new CountPanel(primaryPanelOptions);
primaryPanel.draw();

var switchSign = new OperationIcon(switchSignOptions);
switchSign.draw();

// Hint Text
fill(255, 0, 0);
textSize(14);
text("Click to switch between \naddition & subtraction", switchSign.xEnd + 20, switchSign.yStart + 5, 170, 200);


var secondaryPanel = new CountPanel(secondaryPanelOptions);
secondaryPanel.draw();

var solutionSign = new OperationIcon(equalSignOptions);
solutionSign.draw();

// Solution Sign Hint Text
fill(255, 0, 0);
textSize(14);
text("Click to show the answer!", solutionSign.xStart - 120, solutionSign.yStart + 15, 115, 100);
fill(255, 255, 255);


//Result Stage
var resultStage = {
  x: 10,
  y: 240,

  total: function() {
    var total = 0;
    if(switchSign.type === "addition") {
      total = primaryPanel.panelCount + secondaryPanel.panelCount;
    } else {
        total = primaryPanel.panelCount - secondaryPanel.panelCount;
    }
    return total;
  },

  drawTokens: function() {
    fill(232,217,40);
    var total = this.total();
    var drawingX = this.x + 50;
    var drawingY = this.y + 20;
    var xIncrement = 35;
    var yIncrement = 40;
    var maxRowLength = 6;

    var makeToken = function(){ ellipse(drawingX, drawingY, 25, 25); };

    // Build rows capped at 5 items
    var fullRows = floor(total/maxRowLength);

    for(var i = 0; i < fullRows; i++) {
      for(var j = 0; j < maxRowLength; j++){
        makeToken();
        drawingX += xIncrement;
      }
      drawingX = this.x + 50;
      drawingY += yIncrement;
    }
    // The remainder
    for(var k = 0; k < total % maxRowLength; k++) {
      makeToken();
      drawingX += xIncrement;
    }

  },

  draw: function() {
    // Draw stage rectangle
    fill(15, 45, 182);
    rect(this.x, this.y, 380, 150);
    this.drawTokens();
    fill(255, 255, 255);
  },
};

// resultStage.draw();
var mouseClicked = function() {

  //Primary Panel
  if(primaryPanel.subtractionIcon.clicked()) {
    // Make sure counter stays in positive numbers as appropriate for the lesson
    if(primaryPanel.panelCount > 0){ primaryPanel.panelCount--; }
    primaryPanel.showCounter();
  }
  if (primaryPanel.additionIcon.clicked()) {
    if(primaryPanel.panelCount < 9){ primaryPanel.panelCount++; }
    primaryPanel.showCounter();
  }

  // Switch Sign
  if (switchSign.clicked()) {
    if(switchSign.type === "addition"){
        switchSign.type = "subtraction";
        switchSign.draw();
    } else {
      switchSign.type = "addition";
      switchSign.draw();
    }
  }

  // Secondary Panel
  if(secondaryPanel.subtractionIcon.clicked()) {
   // Make sure counter stays in positive numbers as appropriate for the lesson
    if(secondaryPanel.panelCount > 0) { secondaryPanel.panelCount--; }
    secondaryPanel.showCounter();
  }
  if (secondaryPanel.additionIcon.clicked()) {
    if(secondaryPanel.panelCount < 9){ secondaryPanel.panelCount++; }
    secondaryPanel.showCounter();
  }

  // Solution Sign
  if(solutionSign.clicked()){
    var canvasTotal = 0;
    resultStage.draw();
    // text(canvasTotal, 50, 300);
  }
};
