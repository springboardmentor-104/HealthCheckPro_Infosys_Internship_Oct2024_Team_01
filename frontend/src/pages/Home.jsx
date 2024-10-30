



import { Pagination, Autoplay } from 'swiper/modules';

import { Box } from "@chakra-ui/react";
import image1 from '../assets/image1.jpg';
import image2 from '../assets/image2.jpg';
import image3 from '../assets/image3.jpg';
import image4 from '../assets/image4.jpg';
import image5 from '../assets/image5.jpg';

// Import additional slideshow images
import img1 from '../assets/img1.jpg';
import img2 from '../assets/img2.jpg';
import img3 from '../assets/img3.jpg';

import { About, Features,Sponsers,Contact } from '../components/landing_sections';
import Carousel from '../components/Carousel';
import LandingPage from '../components/landing_sections/LandingPage';



// import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// import useGlobalState from '../hooks/useGlobalState';

const Home = () => {

    
          
        
    

    return (
        <Box >
           
            <LandingPage/>
            <Sponsers />
            <Features />
            <About/>
            <Contact/>
        </Box>
    )
}

export default Home;