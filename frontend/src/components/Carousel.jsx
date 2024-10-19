// Usage: Carousel Component for displaying slides
// Ref: https://swiperjs.com/react

// Important: Don't change unless you know what you are doing

// For Type Checking
import PropTypes from 'prop-types';

import { Heading, Text, VStack } from "@chakra-ui/react";


// Import Swiper styles
import 'swiper/css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { useColorMode } from '@chakra-ui/react';



const Carousel = ({ slides, settings,sliderContainerStyle }) => {

    const { colorMode } = useColorMode();

    const slidesArr = slides.map(slide => (
        // SwiperSlide is a wrapper for slide container
        <SwiperSlide key={slide.id}>
            <VStack
                maxWidth="100%"
                textAlign="center"
                justify="center"
                backgroundImage={
                    colorMode === 'light'
                        ? `url(${slide.image})`
                        : `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(${slide.image})`
                }
                style={sliderContainerStyle}
                backgroundSize="cover"
                backgroundPosition="center"
            >
                <Heading fontSize="2xl" textShadow="2px 2px 4px rgba(0, 0, 0, 0.5)">{slide.title}</Heading>
                <Text fontSize="lg" textShadow="2px 2px 4px rgba(0, 0, 0, 0.5)">{slide.description}</Text>
            </VStack>
        </SwiperSlide>
    ));


    return (
        // Swiper is the main container for slides and settings
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
