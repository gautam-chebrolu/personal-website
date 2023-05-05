import React, { useEffect, useRef } from "react";

const Sketch = () => {
  const sketchRef = useRef(null);

  useEffect(() => {
    let p5;
    import("p5").then((p5Module) => {
      p5 = p5Module.default;
      const sketch = new p5((p) => {
        let canvas;

        p.setup = () => {
          canvas = p.createCanvas(p.windowWidth, p.windowHeight);
        };

        p.draw = () => {
          p.background(
            250,
            p.map(p.mouseY, 0, p.windowWidth, 245, 250),
            p.map(p.mouseX, 0, p.windowHeight, 245, 250)
          );
          p.noStroke();
          p.fill(250, 250, 250);
          p.rectMode(p.CENTER);
          p.rect(
            p.windowWidth / 2,
            p.windowHeight / 2,
            p.windowWidth / 3,
            p.windowHeight / 3,
            15,
            15,
            15,
            15
          );
        };
      }, sketchRef.current);

      return () => {
        sketch.remove();
      };
    });
  }, []);

  return <div ref={sketchRef}></div>;
};

export default Sketch;
