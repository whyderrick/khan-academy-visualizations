var defaultIconSize = 30;
// background(0, 0 , 0);
var OperationIcon = function(options) {
  this.x = options.x;
  this.y = options.y;
  this.type = options.type;
  this.iconColorArray = options.rgbArray || [200, 200, 200];
  this.iconSize = options.relativeSize * defaultIconSize || defaultIconSize;
  this.coordinates = [[this.x, this.y],[this.x + this.iconSize, this.y + this.iconSize]];
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
    var origCal = this;

    this.leftIcon = new OperationIcon(leftIconOptions);
    this.leftIcon.makeIcon();

    this.rightIcon = new OperationIcon(rightIconOptions);
    this.rightIcon.makeIcon();

    this.showCounter = function(){
      fill(255, 0, 0);
      var targetTextSize = origCal.iconSize * 0.8;
      textSize(targetTextSize);
      fill(0, 0, 0);
      text(origCal.panelCount, (origCal.rightIcon.coordinates[1][0] - origCal.coordinates[0][0]) * 0.85, origCal.y + targetTextSize);
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

var icon1options = {
  x: 200,
  y: 200,
  type: "equals",
};

text(panel1.leftIcon.coordinates[0][0], 200, 200);
text(panel1.leftIcon.coordinates[1][0], 300, 200);

// draw = function() {
//   if (mouseX > panel1.leftIcon.coordinates[0][0] &&
//       mouseX < panel1.leftIcon.coordinates[1][0]) {
//       rect(20,20, 20,20);
//   }
// };

var mouseClicked = function() {

  // panel1
  var p1xStart = panel1.leftIcon.coordinates[0][0];
  var p1xEnd = panel1.leftIcon.coordinates[1][0];
  var p1yStart = panel1.leftIcon.coordinates[0][1];
  var p1yEnd = panel1.leftIcon.coordinates[1][1];

  if ((mouseX >= p1xStart && mouseX <= p1xEnd) &&
       (mouseY >=p1yStart && mouseY <= p1yEnd)){
      rect(20,20, 20,20);
      panel1.panelCount--;
  } else if ((mouseX >= panel1.rightIcon.coordinates[0][0] && mouseX <= panel1.rightIcon.coordinates[1][0]) &&
  (mouseY >= panel1.rightIcon.coordinates[0][1] && mouseY <= panel1.rightIcon.coordinates[1][1])) {
    panel1.panelCount++;
  }
  text(panel1.panelCount, 100, 300);
};
