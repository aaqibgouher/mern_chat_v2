import React from "react";
import lottie from "lottie-web";
import animationData from "../../assets/noMessageAnimation.json"; // Replace with your file path

const LottieNoMessageAnimationComponent = () => {
  const containerRef = React.useRef(null);

  React.useEffect(() => {
    const anim = lottie.loadAnimation({
      container: containerRef.current,
      animationData: animationData,
      loop: true, // Set to true if you want the animation to loop
      autoplay: true, // Set to true if you want the animation to play automatically
    });

    return () => {
      anim.destroy(); // Cleanup animation when component unmounts
    };
  }, []);

  return (
    <div ref={containerRef} style={{ height: "40rem", width: "40rem" }}></div>
  );
};

export default LottieNoMessageAnimationComponent;
