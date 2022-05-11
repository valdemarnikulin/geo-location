loadMapDrawingManager() {
      let self = this;
      this.$refs.map.$mapCreated.then((mapObject) => {
        const drawingManager = new google.maps.drawing.DrawingManager({
          drawingControl: true,
          drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_CENTER,
            drawingModes: [google.maps.drawing.OverlayType.POLYGON],
          },
          polygonOptions: {
            fillColor: "#0099FF",
            fillOpacity: 0.7,
            strokeColor: "#AA2143",
            strokeWeight: 4,
            editable: true,
          },
        });
        drawingManager.setMap(this.$refs.map.$mapObject);

        google.maps.event.addListener(
          drawingManager,
          "overlaycomplete",
          function (event) {
            // Get overlay paths
            let paths = event.overlay.getPaths().getArray();
            // Remove overlay from map
            event.overlay.setMap(null);

            // Disable drawingManager
            drawingManager.setDrawingMode(null);

            // Create Polygon
            self.savePolygon(paths);
          }
        );
      });
    },