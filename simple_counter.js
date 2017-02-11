var defaultIconSize = 30;
// background(0, 0 , 0);
var OperationIcon = function(options) {
  this.x = options.x;
  this.y = options.y;
  this.type = options.type;
  this.iconColorArray = options.rgbArray || [200, 200, 200];
  this.iconSize = options.relativeSize * defaultIconSize || defaultIconSize;
  this.coordinates = [[this.xPos, this.yPos],[this.xPos + this.iconSize, this.yPos + this.iconSize]];
};

OperationIcon.prototype.makeIcon = function(){
  if(this.type === "addition") {
    strokeWeight(1); //Reinitialize default from previous drawings

    fill(this.iconColorArray[0], this.iconColorArray[1], this.iconColorArray[2]);
    rect(this.x, this.y, this.iconSize, this.iconSize); //Icon container

    strokeWeight(3);
    line(this.x + this.iconSize * 0.25, this.y + this.iconSize * 0.5, this.x + this.iconSize * 0.75, this.y + this.iconSize * 0.5); // Horizontal line
    line(this.x + this.iconSize * 0.5, this.y + this.iconSize * 0.25, this.x + this.iconSize * 0.5, this.y + this.iconSize * 0.75); // Vertical line
  }
  if(this.type === "subtraction") {
    strokeWeight(1); //Reinitialize default from previous drawings

    fill(this.iconColorArray[0], this.iconColorArray[1], this.iconColorArray[2]);
    rect(this.x, this.y, this.iconSize, this.iconSize); //Icon container

    strokeWeight(3);
    line(this.x + this.iconSize * 0.25, this.y + this.iconSize * 0.5, this.x + this.iconSize * 0.75, this.y + this.iconSize * 0.5); // Horizontal line
  }
  if(this.type === "equals") {
    strokeWeight(1); //Reinitialize default from previous drawings

    fill(this.iconColorArray[0], this.iconColorArray[1], this.iconColorArray[2]);
    rect(this.x, this.y, this.iconSize, this.iconSize); //Icon container

    strokeWeight(3);
    line(this.x + this.iconSize * 0.25, this.y + this.iconSize * 0.4, this.x + this.iconSize * 0.75, this.y + this.iconSize * 0.4); // Horizontal line
    line(this.x + this.iconSize * 0.25, this.y + this.iconSize * 0.6, this.x + this.iconSize * 0.75, this.y + this.iconSize * 0.6); // Horizontal line
  }
  else {
    // alert('Invalid icon type. Try "addition", "subtraction", or "equals".');
  }
};

var CountPanel = function(options){
  this.panelCount = 0;

  this.x = options.x;
  this.y = options.y;
  this.iconColor = options.rgbArray || [200, 200, 200];
  this.panelColor = options.panelRGBArray || [255, 255, 255];
  this.iconSize = options.relativeSize * defaultIconSize || defaultIconSize;
  this.coordinates = [[this.x, this.y],[this.x + this.iconSize * 4.2, this.y + this.iconSize]];

// Set up the icon options
  var leftIconOptions = {
    iconColorArray: this.iconColor,
    iconSize: this.iconSize,
    x: this.x * 1.1,
    y: this.y,
  };

  var rightIconOptions = {
    iconColorArray: this.iconColor,
    iconSize: this.iconSize,
    x: this.x * 3.1,
    y: this.y,
  };

  // Assign the addition and subtraction iconSize
  leftIconOptions.type = "subtraction";
  rightIconOptions.type = "addition";

  // Create the panel view
  this.showPanel = function() {
    var originalCaller = this;

    this.leftIcon = new OperationIcon(leftIconOptions);
    this.leftIcon.makeIcon();

    this.rightIcon = new OperationIcon(rightIconOptions);
    this.rightIcon.makeIcon();

    this.showCounter = function(){
      fill(255, 0, 0);
      var targetTextSize = originalCaller.iconSize * 0.8;
      text(targetTextSize, 200, 200);
      textSize(targetTextSize);
      fill(0, 0, 0);
      text(originalCaller.panelCount, originalCaller.x + originalCaller.iconSize * 2.1, originalCaller.y + targetTextSize);
    };
    this.showCounter();
  };
};
var panel1options = {
  x: 50,
  y: 50,
};

var panel1 = new CountPanel(panel1options);
panel1.showPanel();
// text(panel1.panelCount, 30, 50);

var icon1options = {
    x: 200,
    y: 200,
    type: "equals",
};
