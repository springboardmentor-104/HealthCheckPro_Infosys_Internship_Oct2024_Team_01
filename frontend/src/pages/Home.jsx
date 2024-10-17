// Desc: Home page component
// Usage: This component is rendered when the user visits the application


import Carousel from "../components/Carousel";
import { Pagination, Autoplay } from 'swiper/modules';
import Sponsers from "../components/Sponsers";
import { Box } from "@chakra-ui/react";

const Home = () => {

    // Note: Only change the slides array to change the slides
    // You can also change the settings object to change the carousel settings
    // But do it with knowledge of SwiperJS

    // Main Carousel
    const slidesShow1 = {
        slides: [
            {
                id: 1,
                image: "https://via.placeholder.com/800x400",
                title: "Slide 1",
                description: "Slide 1 description"
            },
            {
                id: 2,
                image: "https://via.placeholder.com/800x400",
                title: "Slide 2",
                description: "Slide 2 description"
            },
            {
                id: 3,
                image: "https://via.placeholder.com/800x400",
                title: "Slide 3",
                description: "Slide 3 description"
            }
        ],
        settings: {
            modules: [Pagination, Autoplay],
            slidesPerView: 1,
            loop: true,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            pagination: {
                clickable: true
            },
            scrollbar: {
                draggable: true
            },

        },
        sliderContainerStyle: {
            width: "100%",
            height: "400px",
            margin: "0 auto"
        }
    }

    // Adjacent Sub Carousel
    const slidesShow2 = {
        slides: [
            {
                id: 1,
                image: "https://via.placeholder.com/800x400",
                title: "Slide 1",
                description: "Slide 1 description"
            },
            {
                id: 2,
                image: "https://via.placeholder.com/800x400",
                title: "Slide 2",
                description: "Slide 2 description"
            },
            {
                id: 3,
                image: "https://via.placeholder.com/800x400",
                title: "Slide 3",
                description: "Slide 3 description"
            },
            {
                id: 4,
                image: "https://via.placeholder.com/800x400",
                title: "Slide 4",
                description: "Slide 4 description"
            },
            {
                id: 5,
                image: "https://via.placeholder.com/800x400",
                title: "Slide 5",
                description: "Slide 5 description"
            },
            {
                id: 6,
                image: "https://via.placeholder.com/800x400",
                title: "Slide 6",
                description: "Slide 6 description"
            }
        ],
        settings: {
            modules: [Pagination, Autoplay],
            slidesPerView: 3,
            slidesPerGroup: 3,
            spaceBetween: "20px",
            loop: true,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            pagination: {
                clickable: true
            },
            scrollbar: {
                draggable: true
            },

        },
        sliderContainerStyle: {
            width: "100%",
            height: "300px",
            margin: "0 auto",
            marginTop: "20px"
        }
    }

    return (
        <Box p="20px">
            <Carousel {...slidesShow1} />
            <Carousel {...slidesShow2} />
            <Sponsers />
        </Box>
    )
}

export default Home;