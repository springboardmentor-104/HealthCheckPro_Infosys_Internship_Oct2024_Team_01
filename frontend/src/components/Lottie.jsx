import { useLottie } from "lottie-react";
import PropTypes from "prop-types";

const Lottie = ({ animationData }) => {
    const options = {
        animationData,
        loop: true
    };

    const { View } = useLottie(options);

    return <>{View}</>;
};

Lottie.propTypes = {
    animationData: PropTypes.object.isRequired
};


export default Lottie;