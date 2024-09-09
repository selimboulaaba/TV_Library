import React, { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";

function TiltedPoster({ src, title }) {

  const ROTATION_RANGE = 32.5;
  const HALF_ROTATION_RANGE = 32.5 / 2;

  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x);
  const ySpring = useSpring(y);

  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

  const handleMouseMove = (e) => {
    if (!ref.current) return [0, 0];

    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
    const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;

    const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;
    const rY = mouseX / width - HALF_ROTATION_RANGE;

    x.set(rX);
    y.set(rY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transform,
        backgroundImage: `url(${src})`
      }}
      className="bg-cover bg-center relative aspect-[3/4] w-[40vw] sm:w-[45vw] md:w-[22vw] rounded-xl border border-orange-600 bg-gradient-to-br from-indigo-300 to-violet-300"
    >
      <div
        style={{
          transform: "translateZ(75px)",
          transformStyle: "preserve-3d",
        }}
        className="absolute inset-4 grid place-content-center rounded-xl bg-orange-600 bg-opacity-30 shadow-lg"
      >
        <p
          style={{
            transform: "translateZ(50px)",
            transformStyle: "preserve-3d",
          }}
          className="text-center text-2xl font-bold text-white bg-black bg-opacity-50 px-2 py-1 rounded-xl"
        >
          {title}
        </p>
      </div>
    </motion.div>
  );
}

export default TiltedPoster