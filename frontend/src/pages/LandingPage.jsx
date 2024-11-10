// Desc: Home page component
// Usage: This component is rendered when the user visits the application



// import { Autoplay, Pagination } from 'swiper/modules';

import { Box } from "@chakra-ui/react";
// import image1 from '../assets/image1.jpg';
// import image2 from '../assets/image2.jpg';
// import image3 from '../assets/image3.jpg';
// import image4 from '../assets/image4.jpg';
// import image5 from '../assets/image5.jpg';

// // Import additional slideshow images
// import img1 from '../assets/img1.jpg';
// import img2 from '../assets/img2.jpg';
// import img3 from '../assets/img3.jpg';

// import Carousel from '../components/Carousel';
import { About, Contact, Features, Sponsers,Home } from '../components/landing_sections';

const LandingPage = () => {

    return (
        <Box >

            <Home />
            <Sponsers />
            <Features />
            <About/>
            <Contact/>
        </Box>
    )
}

export default LandingPage;