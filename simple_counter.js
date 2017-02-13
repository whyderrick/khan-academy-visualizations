var defaultIconSize = 30;

var primaryPanelOptions = {
  x: 10,
  y: 50,
};

var switchSignOptions = {
  relativeSize: 1.5,
  x: 150,
  y: 105,
  type: "addition",
  rgbArray: [180, 220, 0],
};

var secondaryPanelOptions = {
  x: 120,
  y: 170,
};

var equalSignOptions = {
  x: 300,
  y: 220,
  type: "equals",
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
  //Set Defaults for all icons

  strokeWeight(1); //Reinitialize default from previous drawings
  fill(this.iconColorArray[0], this.iconColorArray[1], this.iconColorArray[2]);
  rect(this.x, this.y, this.iconSize, this.iconSize); //Icon container
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

var secondaryPanel = new CountPanel(secondaryPanelOptions);
secondaryPanel.draw();


var mouseClicked = function() {
  //Primary Panel
  var pp = primaryPanel;

  if(pp.subtractionIcon.clicked()) {
    // Make sure counter stays in positive numbers as appropriate for the lesson
    if(pp.panelCount > 0){
      pp.panelCount--;
    }
    pp.showCounter();
  }
  if (pp.additionIcon.clicked()) {
    pp.panelCount++;
    pp.showCounter();
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
};
