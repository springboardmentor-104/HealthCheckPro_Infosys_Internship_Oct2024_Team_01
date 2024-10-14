
import { Heading, Text, VStack } from "@chakra-ui/react";
import PropTypes from 'prop-types';
// Import Swiper React components
// Import Swiper styles
import 'swiper/css';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';



const Carousel = ({ slides, settings,sliderContainerStyle }) => {


    const slidesArr = slides.map(slide => (
        <SwiperSlide key={slide.id} >
            <VStack textAlign="center" justify="center"  backgroundImage={`url(${slide.image})`} style={sliderContainerStyle} backgroundSize="cover" backgroundPosition="center">
                <Heading fontSize="xl">{slide.title}</Heading>
                <Text>{slide.description}</Text>
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
