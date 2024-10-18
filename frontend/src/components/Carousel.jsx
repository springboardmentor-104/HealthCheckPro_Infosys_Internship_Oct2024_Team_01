import { Heading, Text, VStack } from "@chakra-ui/react";
import PropTypes from 'prop-types';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import './Carousel.css'; // Import your custom CSS file

const Carousel = ({ slides, settings, sliderContainerStyle }) => {
    const slidesArr = slides.map(slide => (
        <SwiperSlide key={slide.id}>
            <VStack
                maxWidth="100%"
                justify="center" // Center vertically
                align="center" // Center horizontally
                style={sliderContainerStyle}
                className="carousel-slide"
                height="400px" // Set a fixed height for the slide
                position="relative" // Relative positioning for absolute children
            >
                {/* Use an img element for better styling control */}
                <img
                    src={slide.image}
                    alt={`Slide ${slide.id}`}
                    className="carousel-image"
                />
                <VStack
                    position="absolute"
                    top="50%" // Center vertically
                    left="50%" // Center horizontally
                    transform="translate(-50%, -50%)" // Adjust for centering
                    spacing={2}
                    zIndex="1"
                >
                    <Heading fontSize="xl" color="white" textAlign="center">{slide.title}</Heading>
                    <Text color="white" textAlign="center">{slide.description}</Text>
                </VStack>
            </VStack>
        </SwiperSlide>
    ));

    return (
        <Swiper {...settings}>
            {slidesArr}
        </Swiper>
    );
};

Carousel.propTypes = {
    slides: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            image: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired
        })
    ).isRequired,
    settings: PropTypes.object.isRequired,
    sliderContainerStyle: PropTypes.object
};

export default Carousel;
