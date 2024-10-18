// import Carousel from "../components/Carousel";
// import { Pagination, Autoplay } from 'swiper/modules';
// import Sponsers from "../components/Sponsers";
// import image1 from '../assets/image1.jpg';
// import image2 from '../assets/image2.jpg';
// import image3 from '../assets/image3.jpg';
// import image4 from '../assets/image4.jpg';
// import image5 from '../assets/image5.jpg';

// // Import additional slideshow images
// import img1 from '../assets/img1.jpg';
// import img2 from '../assets/img2.jpg';
// import img3 from '../assets/img3.jpg';
// import img4 from '../assets/img4.jpg';

// const Home = () => {
//     const slidesShow1 = {
//         slides: [
//             {
//                 id: 1,
//                 image: image1,
//                 title: "Comprehensive Health Check",
//                 description: "Get a full health assessment with our comprehensive health check services."
//             },
//             {
//                 id: 2,
//                 image: image2,
//                 title: "Personalized Doctor Consultation",
//                 description: "Book an appointment with our expert doctors for personalized consultations."
//             },
//             {
//                 id: 3,
//                 image: image3,
//                 title: "State-of-the-art Diagnostic Tests",
//                 description: "Access advanced diagnostic tests for accurate and efficient health evaluations."
//             },
//             {
//                 id: 4,
//                 image: image4,
//                 title: "Preventive Health Care Plans",
//                 description: "Choose from a range of preventive health care plans designed for your wellness."
//             },
//             {
//                 id: 5,
//                 image: image5,
//                 title: "24/7 Medical Assistance",
//                 description: "Our medical experts are available round the clock for your health concerns."
//             }
//         ],
//         settings: {
//             modules: [Pagination, Autoplay],
//             slidesPerView: 1,
//             loop: true,
//             autoplay: {
//                 delay: 3000,
//                 disableOnInteraction: false,
//             },
//             pagination: {
//                 clickable: true
//             },
//             scrollbar: {
//                 draggable: true
//             },
//             onSwiper: (swiper) => console.log(swiper),
//             onSlideChange: () => console.log('slide change')
//         },
//         sliderContainerStyle: {
//             width: "100%",
//             height: "400px",
//             margin: "0 auto"
//         }
//     };

//     const slidesShow2 = {
//         slides: [
//             {
//                 id: 1,
//                 image: img1,
              
//             },
//             {
//                 id: 2,
//                 image: img2,
                
//             },
//             {
//                 id: 3,
//                 image: img3,
                
//             },
//             {
//                 id: 4,
//                 image: img1,
                
//             },
//             {
//                 id: 5,
//                 image: img4,
                
//             },
//             {
//                 id: 6,
//                 image: img2,
              
//             }
//         ],
//         settings: {
//             modules: [Pagination, Autoplay],
//             slidesPerView: 3,
//             slidesPerGroup: 3,
//             spaceBetween: "20px",
//             loop: true,
//             autoplay: {
//                 delay: 3000,
//                 disableOnInteraction: false,
//             },
//             pagination: {
//                 clickable: true
//             },
//             scrollbar: {
//                 draggable: true
//             },
//             onSwiper: (swiper) => console.log(swiper),
//             onSlideChange: () => console.log('slide change')
//         },
//         sliderContainerStyle: {
//             width: "100%",
//             height: "300px",
//             margin: "0 auto",
//             marginTop: "20px"
//         }
//     };

//     return (
//         <>
//             <Carousel {...slidesShow1} />
//             <Carousel {...slidesShow2} />
//             <Sponsers />
//         </>
//     );
// };






// export default Home;
import './Home.css'; // Adjust the path if necessary
import Carousel from "../components/Carousel";
import { Pagination, Autoplay } from 'swiper/modules';
import Sponsers from "../components/Sponsers";
import image1 from '../assets/image1.jpg';
import image2 from '../assets/image2.jpg';
import image3 from '../assets/image3.jpg';
import image4 from '../assets/image4.jpg';
import image5 from '../assets/image5.jpg';

// Import additional slideshow images
import img1 from '../assets/img1.jpg';
import img2 from '../assets/img2.jpg';
import img3 from '../assets/img3.jpg';
import img4 from '../assets/img4.jpg';

const Home = () => {
    const slidesShow1 = {
        slides: [
            {
                id: 1,
                image: image1,
                title: "Comprehensive Health Check",
                description: "Get a full health assessment with our comprehensive health check services."
            },
            {
                id: 2,
                image: image2,
                title: "Personalized Doctor Consultation",
                description: "Book an appointment with our expert doctors for personalized consultations."
            },
            {
                id: 3,
                image: image3,
                title: "State-of-the-art Diagnostic Tests",
                description: "Access advanced diagnostic tests for accurate and efficient health evaluations."
            },
            {
                id: 4,
                image: image4,
                title: "Preventive Health Care Plans",
                description: "Choose from a range of preventive health care plans designed for your wellness."
            },
            {
                id: 5,
                image: image5,
                title: "24/7 Medical Assistance",
                description: "Our medical experts are available round the clock for your health concerns."
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
            onSwiper: (swiper) => console.log(swiper),
            onSlideChange: () => console.log('slide change')
        },
        sliderContainerStyle: {
            width: "100%",
            height: "400px",
            margin: "0 auto"
        }
    };

    const slidesShow2 = {
        slides: [
            {
                id: 1,
                image: img1,
            },
            {
                id: 2,
                image: img2,
            },
            {
                id: 3,
                image: img3,
            },
            {
                id: 4,
                image: img1,
            },
            {
                id: 5,
                image: img4,
            },
            {
                id: 6,
                image: img2,
            }
        ],
        settings: {
            modules: [Pagination, Autoplay],
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
            breakpoints: {
                640: {
                    slidesPerView: 1,
                    slidesPerGroup: 1,
                },
                768: {
                    slidesPerView: 2,
                    slidesPerGroup: 2,
                },
                1024: {
                    slidesPerView: 3,
                    slidesPerGroup: 3,
                },
            },
            onSwiper: (swiper) => console.log(swiper),
            onSlideChange: () => console.log('slide change')
        },
        sliderContainerStyle: {
            width: "100%",
            height: "300px",
            margin: "0 auto",
            marginTop: "20px"
        }
    };

    return (
        <>
            <Carousel {...slidesShow1} />
            <Carousel {...slidesShow2} />
            <Sponsers />
        </>
    );
};

export default Home;
