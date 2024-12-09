var depthData = null;
var imageData = null;
var depthURL = "";
var imageURL = "";
var imageWidth = 0;
var imageHeight = 0;
var canvasWidth = 0;
var canvasHeight = 0;
var depthPrevWidth = 0;
var depthPrevHeight = 0;
var stageWidth = 0;
var stageHeight = 0;
var dilationSize = 1;
var tempDepth = null;
var set_focus = 0;
var temp_amt_mot = 50;
var viewer = null;
var origin_viewer = null;
var drawer = null;
var anaglUrl = ''
var upload_depth = '';
var tempedit_depth = '';
var storeDepth = '';
var enableEyedrop = false;

module.exports = {
  depthData,
  imageData,
  depthURL,
  imageURL,
  imageWidth,
  imageHeight,
  canvasWidth,
  canvasHeight,
  depthPrevWidth,
  depthPrevHeight,
  stageWidth,
  stageHeight,
  dilationSize,
  tempDepth,
  set_focus,
  temp_amt_mot,
  origin_viewer,
  viewer,
  drawer,
  anaglUrl,
  upload_depth,
  tempedit_depth,
  storeDepth,
  enableEyedrop
};
