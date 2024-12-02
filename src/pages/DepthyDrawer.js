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
      depth: savedOptions.depth || 0.5, // Greyscale value (0 to 1)
      size: savedOptions.size || 20,   // Brush size in pixels
      hardness: savedOptions.hardness || 0.0, // Brush softness (0: soft, 1: hard)
      opacity: savedOptions.opacity || 1.0,  // Brush opacity (0 to 1)
    };

    var imageToDraw = null;  // To hold the image being drawn on the canvas
    var history = []; // Stack for undo/redo
    var historyIndex = -1; // Index for tracking the current history state

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

    function createSvgCursor(size) {
      var radius = size / 2;
      var svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
          <circle cx="${radius}" cy="${radius}" r="${radius - 2}" stroke="black" stroke-width="2" fill="none"/>
        </svg>
      `;
      return `url('data:image/svg+xml;base64,${btoa(svg)}') ${radius} ${radius}, auto`;
    }

    function updateCursor() {
      var size = options.size;
      canvasElement.style.cursor = createSvgCursor(size);
    }

    // Draw function
    function draw(x, y) {
      var size = options.size;
      ctx.globalCompositeOperation = "source-over";
      ctx.drawImage(brushCanvas, x - size / 2, y - size / 2);
    }

    // Save current canvas state to history
    function saveState() {
      if (historyIndex < history.length - 1) {
        history = history.slice(0, historyIndex + 1);  // Remove any redo steps if new actions are taken
      }
      history.push(canvasElement.toDataURL('image/png')); // Save canvas as data URL
      historyIndex++;
    }

    // Undo last action
    this.undo = function() {
      if (historyIndex > 0) {
        historyIndex--;
        var img = new Image();
        img.onload = function() {
          ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
          ctx.drawImage(img, 0, 0, canvasElement.width, canvasElement.height);
        };
        img.src = history[historyIndex];
      }
    };

    // Redo last undone action
    this.redo = function() {
      if (historyIndex < history.length - 1) {
        historyIndex++;
        var img = new Image();
        img.onload = function() {
          ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
          ctx.drawImage(img, 0, 0, canvasElement.width, canvasElement.height);
        };
        img.src = history[historyIndex];
      }
    };

    // Event listeners
    function onMouseDown(e) {
      drawing = true;
      var rect = canvasElement.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      saveState();  // Save state before drawing
      draw(x, y);
    }

    function onMouseMove(e) {
      var rect = canvasElement.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
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
    canvasElement.addEventListener("mouseenter", updateCursor);
    canvasElement.addEventListener("mouseleave", function() {
      canvasElement.style.cursor = 'default';
    });

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
        updateCursor();
        brushDirty = false;

        // Save updated options to localStorage
        localStorage.setItem('DepthyDrawerOptions', JSON.stringify(options));
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

    // Initialize cursor
    updateCursor();
  };

})(window);
