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
      if (!drawing) return;
      var rect = canvasElement.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      draw(x, y);
    }

    function onMouseUp() {
      drawing = false;
    }

    // Attach mouse events
    canvasElement.addEventListener("mousedown", onMouseDown);
    canvasElement.addEventListener("mousemove", onMouseMove);
    canvasElement.addEventListener("mouseup", onMouseUp);
    canvasElement.addEventListener("mouseleave", onMouseUp);

    // Set canvas image from URL
    this.setCanvasImageFromURL = function(url) {
      var img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = function() {
        ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);  // Clear previous content
        ctx.drawImage(img, 0, 0, canvasElement.width, canvasElement.height);
      };
      img.src = url;
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

    // Get canvas as a data URL
    this.getCanvasDataURL = function() {
      return canvasElement.toDataURL('image/png');
    };
  };

})(window);
