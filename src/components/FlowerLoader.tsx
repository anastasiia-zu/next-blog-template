"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { Elastic, Expo, Linear } from "gsap/all";

gsap.registerPlugin(Elastic, Expo);

const FlowerLoader = () => {
  useEffect(() => {
    const LEAF_SVG =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23.7 51.8"><path d="M11.8,0c0,0-26.6,24.1,0,51.8C38.5,24.1,11.8,0,11.8,0z"/></svg>';

    const Selector = {
      CENTER: ".flower__center",
      LEAF: ".flower__leaf",
      LEAF_INNER: ".flower__leaf-inner",
      LEAVES: ".flower__leaves",
    };

    const flower = document.querySelector(".flower");
    if (!flower) return;

    const flowerLeaves = flower.querySelector(Selector.LEAVES);
    const numberOfLeaves = 7;
    const rotation = 360 / numberOfLeaves;
    const path = [
      { x: 15, y: 0 },
      { x: 16, y: -1 },
      { x: 17, y: 0 },
      { x: 16, y: 1 },
      { x: 15, y: 0 },
    ];
    const location = { x: path[0].x, y: path[0].y };

    const tn1 = gsap.to(location, {
      duration: numberOfLeaves,
      motionPath: {
        path,
        curviness: 1.5,
      },
      ease: Linear.easeNone,
    });

    for (let i = 0; i < numberOfLeaves; i++) {
      const leaf = document.createElement("div");
      leaf.className = "flower__leaf";
      leaf.innerHTML = `<div class='flower__leaf-inner'>${LEAF_SVG}</div>`;
      tn1.time(i);
      gsap.set(leaf, {
        x: location.x - 11,
        y: location.y - 37,
        rotation: rotation * i - 90,
      });
      flowerLeaves?.appendChild(leaf);
    }

    const leaves = flowerLeaves?.querySelectorAll(Selector.LEAF_INNER) || [];
    const center = flower.querySelector(Selector.CENTER);

    const timeline = gsap.timeline({
      onComplete: () => {
      timeline.restart(true);
      },
    });

    timeline
      .fromTo(
        center,
        { scale: 0 },
        { scale: 1, ease: Elastic.easeOut.config(1.1, 0.75), duration: 1 }
      )
      .to(
        leaves,
        {
          scale: 1,
          ease: Elastic.easeOut.config(1.1, 0.75),
          duration: 1,
          stagger: 0.2,
        },
        0.3
      )
      .to(leaves, {
        scale: 1.25,
        ease: Elastic.easeOut.config(1.5, 1),
        duration: 0.3,
      })
      .to(
        flowerLeaves,
        { rotation: 360, ease: Expo.easeInOut, duration: 1.5 },
        1.7
      )
      .to(leaves, {
        scale: 0,
        ease: Elastic.easeInOut.config(1.1, 0.75),
        duration: 0.5,
      })
      .to(
        center,
        {
          scale: 0,
          ease: Elastic.easeInOut.config(1.1, 0.75),
          duration: 0.5,
        },
        "-=0.37"
      );
  }, []);

  return (
    <div className="flower-wrapper flex justify-center items-center min-h-screen">
      <div className="flower">
        <div className="flower__center bg-pink-400"></div>
        <div className="flower__leaves"></div>
      </div>
    </div>
  );
};

export default FlowerLoader;
