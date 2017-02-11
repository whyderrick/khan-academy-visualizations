var defaultIconSize = 25;

var makeAddIcon = function(x, y, iconSize, iconColorArray) {
  strokeWeight(1); //Reinitialize default from previous drawings

  fill(iconColorArray[0], iconColorArray[1], iconColorArray[2]);
  rect(x, y, iconSize, iconSize); //Icon container

  strokeWeight(3);
  line(x + iconSize * 0.25, y + iconSize * 0.5, x + iconSize * 0.75, y + iconSize * 0.5); // Horizontal line
  line(x + iconSize * 0.5, y + iconSize * 0.25, x + iconSize * 0.5, y + iconSize * 0.75); // Vertical line
};
var makeSubtractionIcon = function(x, y, iconSize, iconColorArray) {
  strokeWeight(1); //Reinitialize default from previous drawings

  fill(iconColorArray[0], iconColorArray[1], iconColorArray[2]);
  rect(x, y, iconSize, iconSize); //Icon container

  strokeWeight(3);
  line(x + iconSize * 0.25, y + iconSize * 0.5, x + iconSize * 0.75, y + iconSize * 0.5); // Horizontal line
};
var makeEqualIcon = function(x, y, iconSize, iconColorArray) {
  strokeWeight(1); //Reinitialize default from previous drawings

  fill(iconColorArray[0], iconColorArray[1], iconColorArray[2]);
  rect(x, y, iconSize, iconSize); //Icon container

  strokeWeight(3);
  line(x + iconSize * 0.25, y + iconSize * 0.4, x + iconSize * 0.75, y + iconSize * 0.4); // Horizontal line
  line(x + iconSize * 0.25, y + iconSize * 0.6, x + iconSize * 0.75, y + iconSize * 0.6); // Horizontal line
};


var makeIcon = function(x, y, iconType, RGBArray, relativeSize) {
  var targetSize = relativeSize * defaultIconSize || defaultIconSize;
  var targetColor = RGBArray || [200, 200, 200];

  switch (iconType) {
    case "addition":
        makeAddIcon(x, y, targetSize, targetColor);
        break;
    case "subtraction":
        makeSubtractionIcon(x, y, targetSize, targetColor);
        break;
    case "equals":
        makeEqualIcon(x, y, targetSize, targetColor);
        break;
  }
};

// makeIcon(width * 0.1, 100, "addition", [100, 254, 16], 1.3 );
// makeIcon(width * 0.3, 50, "addition");
// makeIcon(width * 0.6, 50, "subtraction");

var makeCountPanel = function(x, y, relativeSize) {
  var counter = 0;

  var targetIconSize = defaultIconSize * relativeSize;
  var targetTextSize = defaultIconSize * relativeSize * 0.9;

  var coordinates = {
    panel:[[x, y], [x + targetIconSize * 4, y + targetIconSize]]
  };

  textSize(targetTextSize);
  fill(0, 0, 0);
  text(counter, x + targetIconSize * 1.75, y + targetTextSize);

  var subtractionIcon = makeIcon(x, y, "subtraction");
  coordinates.subtraction = [[x, y],[x + targetIconSize, y + targetIconSize]];

  var additionIcon = makeIcon(x + targetIconSize * 3, y, "addition");
  coordinates.addition = [[x + targetIconSize * 3, y],[x + targetIconSize * 4, y + targetIconSize]];


};

makeCountPanel(100, 100, 1.0);

// Actually here
var defaultIconSize = 30;

var OperationIcon(options) = {
  this.xPos = options[x],
  this.yPos = options[y],
  this.type = options[type],
  this.iconColor = options[rgbArray] || [200, 200, 200],
  this.iconSize = options[relativeSize] * defaultIconSize || defaultIconSize,
  this.coordinates = [[xPos, yPos],[xPos + this.iconSize, yPos + this.iconSize]]
}

OperationIcon.prototype.makeIcon = function(){
  if(this.type === "addition") {
    strokeWeight(1); //Reinitialize default from previous drawings

    fill(iconColorArray[0], iconColorArray[1], iconColorArray[2]);
    rect(x, y, iconSize, iconSize); //Icon container

    strokeWeight(3);
    line(x + iconSize * 0.25, y + iconSize * 0.5, x + iconSize * 0.75, y + iconSize * 0.5); // Horizontal line
    line(x + iconSize * 0.5, y + iconSize * 0.25, x + iconSize * 0.5, y + iconSize * 0.75); // Vertical line
  }
  if(this.type === "subtraction") {
    strokeWeight(1); //Reinitialize default from previous drawings

    fill(iconColorArray[0], iconColorArray[1], iconColorArray[2]);
    rect(x, y, iconSize, iconSize); //Icon container

    strokeWeight(3);
    line(x + iconSize * 0.25, y + iconSize * 0.5, x + iconSize * 0.75, y + iconSize * 0.5); // Horizontal line
  }
  if(this.type === "equals") {
    strokeWeight(1); //Reinitialize default from previous drawings

    fill(iconColorArray[0], iconColorArray[1], iconColorArray[2]);
    rect(x, y, iconSize, iconSize); //Icon container

    strokeWeight(3);
    line(x + iconSize * 0.25, y + iconSize * 0.4, x + iconSize * 0.75, y + iconSize * 0.4); // Horizontal line
    line(x + iconSize * 0.25, y + iconSize * 0.6, x + iconSize * 0.75, y + iconSize * 0.6); // Horizontal line
  }
  else {
    alert('Invalid icon type. Try "addition", "subtraction", or "equals".')
  }
}
