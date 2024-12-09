let gv = require('./Lenticular/config');

(function(root) {
  'use strict';

  var DepthyDrawer = root.DepthyDrawer = function(canvasElement) {
    var self = this;
    var ctx = canvasElement.getContext("2d");
    var drawing = false;
    var brushDirty = false;

    // Load saved options from localStorage or use defaults
    var savedOptions = JSON.parse(localStorage.getItem('DepthyDrawerOptions')) || {};
    var options = {
      depth: savedOptions.depth || 0.5,
      size: savedOptions.size || 20,
      hardness: savedOptions.hardness || 0.0,
      opacity: savedOptions.opacity || 1.0,
    };

    var imageToDraw = null;
    var history = [];
    var historyIndex = -1;

    // Create brush with gradient based on depth and hardness
    function createBrush() {
      var size = options.size;
      var grey = Math.round(options.depth * 255);
      var color = `rgba(${grey},${grey},${grey},${options.opacity})`; // Solid color based on depth and opacity

      document.getElementById('eyeDrop').style.backgroundColor = color;
    
      var brushCanvas = document.createElement('canvas');
      brushCanvas.id = "depthBrush";

      brushCanvas.width = brushCanvas.height = size;
    
      var ctx = brushCanvas.getContext('2d');
      ctx.fillStyle = color; // Set the fill style to the solid color
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2); // Draw a circle for the brush shape
      ctx.fill();
    
      return brushCanvas;
    }

    var brushCanvas = createBrush();

    // Create SVG cursor based on brush size
    function createSvgCursor(size) {
      var radius = size / 2;
      var svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
                  <circle cx="${radius}" cy="${radius}" r="${radius - 2}" stroke="black" stroke-width="2" fill="none"/>
                </svg>`;
      return `url('data:image/svg+xml;base64,${btoa(svg)}') ${radius} ${radius}, auto`;
    }

    // Update cursor to match brush size
    function updateCursor() {
      if(gv.enableEyedrop){
        canvasElement.style.cursor = 'crosshair';
      }
      else canvasElement.style.cursor = createSvgCursor(options.size);
    }

    // Draw function that applies brush to canvas
    function draw(x, y) {
      var size = options.size;
      ctx.globalCompositeOperation = "source-over";
      ctx.drawImage(brushCanvas, x - size / 2, y - size / 2);
    }

    // Save current canvas state for undo/redo
    function saveState() {
      if (historyIndex < history.length - 1) {
        history = history.slice(0, historyIndex + 1);
      }
      history.push(canvasElement.toDataURL('image/png'));
      historyIndex++;
    }

    // Undo the last action
    this.undo = function() {
      if (historyIndex > 0) {
        historyIndex--;
        var img = new Image();
        img.onload = function() {
          ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
          ctx.drawImage(img, 0, 0);
        };
        img.src = history[historyIndex];
      }
    };

    // Redo the last undone action
    this.redo = function() {
      if (historyIndex < history.length - 1) {
        historyIndex++;
        var img = new Image();
        img.onload = function() {
          ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
          ctx.drawImage(img, 0, 0);
        };
        img.src = history[historyIndex];
      }
    };

    // Event listeners for drawing
    function onMouseDown(e) {
      drawing = true;
      var rect = canvasElement.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      saveState();
      draw(x, y);
    }

    function onMouseMove(e) {
      if (drawing) {
        var rect = canvasElement.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        draw(x, y);
      }
    }

    function onMouseUp() {
      drawing = false;
    }

    // Attach event listeners for mouse actions
    canvasElement.addEventListener("mousedown", onMouseDown);
    canvasElement.addEventListener("mousemove", onMouseMove);
    canvasElement.addEventListener("mouseup", onMouseUp);
    canvasElement.addEventListener("mouseenter", updateCursor);
    canvasElement.addEventListener("mouseleave", () => canvasElement.style.cursor = 'default');

    // Set canvas image from URL
    this.setCanvasImageFromURL = function(url) {
      var img = new Image();
      img.onload = function() {
        imageToDraw = img;
        ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
        ctx.drawImage(img, 0, 0, canvasElement.width, canvasElement.height);
      };
      img.src = url;
    };

    // Continuously update the canvas with current image and drawing
    this.updateCanvas = function() {
      if (imageToDraw) {
        ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
        ctx.drawImage(imageToDraw, 0, 0, canvasElement.width, canvasElement.height);
      }
      requestAnimationFrame(self.updateCanvas);
    };

    // Set drawing options and update brush when changed
    this.setOptions = function(newOptions) {
      for (var key in newOptions) {
        if (options[key] !== newOptions[key]) {
          options[key] = newOptions[key];
          brushDirty = true;
        }
      }
      if (brushDirty) {
        brushCanvas = createBrush();
        updateCursor();
        brushDirty = false;
        localStorage.setItem('DepthyDrawerOptions', JSON.stringify(options));
      }
    };

    // Get current drawing options
    this.getOptions = function() {
      return { ...options };
    };

    // Get canvas data URL
    this.getCanvasDataURL = function() {
      return canvasElement.toDataURL('image/png');
    };

    // Start the continuous update loop
    requestAnimationFrame(self.updateCanvas);

    // Initialize cursor
    updateCursor();
  };

})(window);
