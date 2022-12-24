import { useState } from "react";
import { Carousel } from "react-bootstrap";

// Icon
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import NoProductFound from "../assets/no-product-found.png";

export default function MultipleImage({ images }) {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => setIndex(selectedIndex);

  return (
    <Carousel
      className="overflow-hidden"
      style={{ backgroundColor: "#969696" }}
      // variant="dark"
      activeIndex={index}
      onSelect={handleSelect}
      prevIcon={<FaChevronLeft size="2rem" />}
      nextIcon={<FaChevronRight size="2rem" />}
      controls={images.length > 1}
      interval={null}
      indicators={images.length > 0}
    >
      {images.length > 0 ? (
        images?.map((data, idx) => (
          <Carousel.Item key={idx}>
            <img
              className="d-block mx-auto w-auto mh-100 cover"
              src={data}
              alt="product"
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = NoProductFound;
              }}
            />
          </Carousel.Item>
        ))
      ) : (
        <Carousel.Caption>
          <h3 style={{ textAlign: "center" }}>No preview image</h3>
        </Carousel.Caption>
      )}
    </Carousel>
  );
}
