(function(root) {
  'use strict';

  var DepthyDrawer = root.DepthyDrawer = function(canvasElement) {
    var self = this;
    var ctx = canvasElement.getContext("2d");
    var drawing = false;
    var brushDirty = false;
    var options = {
      depth: 0.5, // Greyscale value (0 to 1)
      size: 20,   // Brush size in pixels
      hardness: 0.0, // Brush softness (0: soft, 1: hard)
      opacity: 1.0,  // Brush opacity (0 to 1)
    };
    var imageToDraw = null;  // To hold the image being drawn on the canvas

    // Create brush
    function createBrush() {
      var size = options.size;
      var hardness = Math.max(0, Math.min(0.99, options.hardness));
      var brushCanvas = document.createElement('canvas');
      var brushCtx = brushCanvas.getContext('2d');
      brushCanvas.width = brushCanvas.height = size;

      var grd = brushCtx.createRadialGradient(size / 2, size / 2, size / 2 * hardness, size / 2, size / 2, size / 2);
      var grey = Math.round(options.depth * 255);
      grd.addColorStop(0, `rgba(${grey},${grey},${grey},${options.opacity})`);
      grd.addColorStop(1, `rgba(${grey},${grey},${grey},0)`);

      brushCtx.fillStyle = grd;
      brushCtx.fillRect(0, 0, size, size);

      return brushCanvas;
    }

    var brushCanvas = createBrush();

    // Brush cursor element
    var brushCursor = document.createElement('div');
    brushCursor.style.position = 'absolute';
    brushCursor.style.borderRadius = '50%';
    brushCursor.style.border = '2px solid rgba(0,0,0,0.5)';
    brushCursor.style.pointerEvents = 'none';  // Prevent interaction with the cursor
    brushCursor.style.zIndex = 9999;  // Ensure it's above the canvas
    document.body.appendChild(brushCursor);  // Append to body to follow the mouse

    function updateBrushCursor(x, y) {
      var size = options.size;
      brushCursor.style.width = size + 'px';
      brushCursor.style.height = size + 'px';
      brushCursor.style.left = (x - size / 2) + 'px';
      brushCursor.style.top = (y - size / 2) + 'px';
    }

    function draw(x, y) {
      var size = options.size;
      ctx.globalCompositeOperation = "source-over";
      ctx.drawImage(brushCanvas, x - size / 2, y - size / 2);
    }

    // Event listeners
    function onMouseDown(e) {
      drawing = true;
      var rect = canvasElement.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      draw(x, y);
    }

    function onMouseMove(e) {
      var rect = canvasElement.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      updateBrushCursor(e.clientX, e.clientY);  // Update cursor position
      if (drawing) {
        draw(x, y);
      }
    }

    function onMouseUp() {
      drawing = false;
    }

    // Attach mouse events
    canvasElement.addEventListener("mousedown", onMouseDown);
    canvasElement.addEventListener("mousemove", onMouseMove);
    canvasElement.addEventListener("mouseup", onMouseUp);
    canvasElement.addEventListener("mouseleave", onMouseUp);

    canvasElement.style.cursor = 'none';

    // Set canvas image from URL
    this.setCanvasImageFromURL = function(url) {
      var img = new Image();
      img.onload = function() {
        imageToDraw = img;  // Set the image to draw on canvas
        ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);  // Clear previous content
        ctx.drawImage(img, 0, 0, canvasElement.width, canvasElement.height);
      };
      img.src = url;
    };

    // Update the canvas with the current image and drawing
    this.updateCanvas = function() {
      if (imageToDraw) {
        // If an image is set, redraw it to keep it updated
        ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);  // Clear previous content
        ctx.drawImage(imageToDraw, 0, 0, canvasElement.width, canvasElement.height);
      }

      // Request the next frame
      requestAnimationFrame(self.updateCanvas);
    };

    // Update brush when options change
    this.setOptions = function(newOptions) {
      for (var key in newOptions) {
        if (options[key] !== newOptions[key]) {
          options[key] = newOptions[key];
          brushDirty = true;
        }
      }
      if (brushDirty) {
        brushCanvas = createBrush();
        brushDirty = false;
      }
    };

    this.getOptions = function() {
      return Object.assign({}, options);
    };

    // Start the continuous update
    requestAnimationFrame(self.updateCanvas);

    // Get canvas as a data URL
    this.getCanvasDataURL = function() {
      return canvasElement.toDataURL('image/png');
    };
  };

})(window);
