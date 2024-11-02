import {
    Step,
    StepIcon,
    StepIndicator,
    StepSeparator,
    StepStatus,
    Stepper,
    Stack,
    Text,
    Heading,
    useSteps
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

const SectionSteps = ({ currentCategoryIndex, categories }) => {
    const { activeStep,setActiveStep } = useSteps({
        index: currentCategoryIndex,
        count: categories.length,
    });
    useEffect(() => {
        console.log('Updated currentCategoryIndex:', currentCategoryIndex);
        setActiveStep(currentCategoryIndex);
    }, [currentCategoryIndex]);


    const activeStepText = categories[activeStep];

    return (
        <Stack overflow="hidden">
            <Stepper size='md' index={activeStep} gap='0'>
                {categories.map((_, index) => (
                    <Step key={index} gap='0'>
                        <StepIndicator>
                            <StepStatus complete={<StepIcon />} />
                        </StepIndicator>
                        <StepSeparator _horizontal={{ ml: '0' }} />
                    </Step>
                ))}
            </Stepper>
            <Text>
                Test Category {activeStep + 1}: <Heading size="lg" color="blue.500">{activeStepText}</Heading>
            </Text>
        </Stack>
    );
};

SectionSteps.propTypes = {
    currentCategoryIndex: PropTypes.number.isRequired,
    categories: PropTypes.array.isRequired
};

export default SectionSteps;
