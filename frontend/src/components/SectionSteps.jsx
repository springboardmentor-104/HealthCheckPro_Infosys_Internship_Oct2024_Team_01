import {
    Step,
    StepDescription,
    StepIcon,
    StepIndicator,
    StepNumber,
    StepSeparator,
    StepStatus,
    StepTitle,
    Stepper,
    useSteps,
    Box,
    Stack,
    Text,
    Heading
} from '@chakra-ui/react'

const SectionSteps = () => {
    const steps = [
        { title: 'Physical Health', description: 'Contact Info' },
        { title: 'Diet', description: 'Date & Time' },
        { title: 'Mental Well Being', description: 'Select Rooms' },
        { title: 'Lifestyle', description: 'Payment' },
    ]

    const { activeStep, setActiveStep } = useSteps({
        index: 3,
        count: steps.length,
    })

    const activeStepText = steps[activeStep].title

    return (
        <Stack>
            <Stepper size='md' index={activeStep} gap='0'>
                {steps.map((step, index) => (
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
    )
}

export default SectionSteps;
