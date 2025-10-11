import React, { useEffect, useRef } from "react";
import anime from "animejs/lib/anime.es.js";

const LoadingAnimation = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create 5 circles
    const circles = [];
    for (let i = 0; i < 5; i++) {
      const circle = document.createElement("div");
      circle.style.width = "20px";
      circle.style.height = "20px";
      circle.style.borderRadius = "50%";
      circle.style.background = `hsl(${i * 60}, 70%, 50%)`;
      circle.style.position = "absolute";
      circle.style.left = "50%";
      circle.style.top = "50%";
      container.appendChild(circle);
      circles.push(circle);
    }

    // Bounce animation
    anime({
      targets: circles,
      translateY: [
        { value: -30, duration: 500 },
        { value: 0, duration: 500 }
      ],
      delay: anime.stagger(100),
      loop: true,
      easing: "easeInOutSine"
    });

    // Mouse follow
    const handleMouseMove = (e) => {
      circles.forEach((circle, idx) => {
        anime({
          targets: circle,
          left: e.clientX + idx * 10,
          top: e.clientY + idx * 10,
          duration: 300,
          easing: "easeOutExpo"
        });
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return <div ref={containerRef} style={{ width: "100vw", height: "100vh", position: "relative" }} />;
};

export default LoadingAnimation;