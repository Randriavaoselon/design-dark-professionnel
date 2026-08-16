import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import "../styles/ImageSlider.css";

function ImageSlider({ images, className = "", interval = 3500 }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return undefined;

    const timerId = setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, interval);

    return () => clearInterval(timerId);
  }, [images.length, interval]);

  return (
    <div className={`image-slider ${className}`.trim()}>
      {images.map((src, index) => (
        <img
          key={src}
          src={src}
          alt=""
          className={`image-slider__image ${
            index === activeIndex ? "image-slider__image--active" : ""
          }`.trim()}
          draggable="false"
        />
      ))}
    </div>
  );
}

ImageSlider.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  className: PropTypes.string,
  interval: PropTypes.number,
};

export default ImageSlider;