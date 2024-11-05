import {
    Step,
    StepIcon,
    StepIndicator,
    StepSeparator,
    StepStatus,
    Stepper,
    Box,
    Text,
    Heading,
    useSteps,
    StepNumber,
    StepTitle,
    useBreakpointValue
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { useEffect } from 'react';



const SectionSteps = ({ currentCategoryIndex, categories }) => {
    const orientation = useBreakpointValue({ base: 'horizontal', md: 'vertical' });
    const { activeStep, setActiveStep } = useSteps({
        index: currentCategoryIndex,
        count: categories.length,
    });



    useEffect(() => {
        console.log('Updated currentCategoryIndex:', currentCategoryIndex);
        setActiveStep(currentCategoryIndex);
    }, [currentCategoryIndex]);

    const activeStepText = categories[activeStep];

    return (

        <Box ><Stepper size='md' minWidth={
            orientation === 'horizontal' ? 'auto' : '200px'
        } index={activeStep} gap='0' height={
            orientation === 'horizontal' ? 'auto' : '50svh'
        } orientation={orientation}>
            {categories.map((category, index) => (
                <Step key={index}>
                    <StepIndicator>
                        <StepStatus
                            complete={<StepIcon />}
                            incomplete={<StepNumber />}
                            active={<StepNumber />}
                        />
                    </StepIndicator>

                    {orientation !== 'horizontal' && <StepTitle>{category}</StepTitle>}


                    <StepSeparator />
                </Step>
            ))}

        </Stepper>
            {orientation === 'horizontal' && <Heading textAlign='center' mt='2' size="md">{activeStepText}</Heading>}
        </Box>

    );
};

SectionSteps.propTypes = {
    currentCategoryIndex: PropTypes.number.isRequired,
    categories: PropTypes.array.isRequired
};

export default SectionSteps;
