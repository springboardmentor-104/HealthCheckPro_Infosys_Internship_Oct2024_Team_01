import { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Textarea, VStack, Heading, HStack, IconButton, useToast} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import useAdmin from '../../hooks/useAdmin';
import useCustomTheme from '../../hooks/useCustomTheme';

const AddQuestionForm = () => {
    const [assessment, setAssessment] = useState('');
    const [category, setCategory] = useState('');
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState([{ text: '', score: 0 }]);
    const [categoryId, setCategoryId] = useState('');
    const { addQuestion } = useAdmin();
    const { inputBg } = useCustomTheme();
    const toast = useToast();



    const handleAddOption = () => {
        setOptions([...options, { text: '', score: 0 }]);
    };

    const handleOptionChange = (index, field, value) => {
        const newOptions = [...options];
        newOptions[index][field] = value;
        setOptions(newOptions);
    };

    const handleSubmit = async () => {
        if (!categoryId || !question || options.some(option => !option.text || !option.score)) {
            toast({
                title: "Error",
                description: "Please fill all fields",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
            return;
        }

        const data = {
            categoryId,
            questionText: question,
            options: options.map(option => ({
                optionText: option.text,
                score: option.score
            })),
            selectedOption: null
        };

        try {
            await addQuestion(data);
            setAssessment('');
            setCategory('');
            setQuestion('');
            setOptions([{ text: '', score: 0 }]);
            setCategoryId('');
        } catch (error) {
            console.error('Error adding question:', error);
        }
    };



    return (
        <Box p={5} w="80%" justifySelf="center">
            <HStack justify="space-between" alignItems="center">
                <HStack><Heading mb={5}>Add Question</Heading>
                    <Button variant="outline" colorScheme='blue' disabled>Paste JSON or Object</Button></HStack>
                <Button colorScheme="blue" onClick={handleSubmit}>Submit</Button>
            </HStack>
            <VStack spacing={4} align="stretch">
                <FormControl id="categoryId">
                    <FormLabel>Category ID</FormLabel>
                    <Input
                        type="text"
                        value={categoryId}
                        placeholder="Enter category ID"
                        onChange={(e) => setCategoryId(e.target.value)}
                        bgColor={inputBg}
                    />
                </FormControl>
                <FormControl id="question">
                    <FormLabel>Question</FormLabel>
                    <Textarea
                        value={question}
                        placeholder="Enter question"
                        onChange={(e) => setQuestion(e.target.value)}
                        bgColor={inputBg}
                    />
                    <HStack gap={3} mt={6}>
                        <FormLabel mt={4}>Options</FormLabel>
                        <IconButton mt={2} onClick={handleAddOption}><AddIcon /></IconButton>
                    </HStack>
                    {options.map((option, index) => (
                        <HStack key={index} mt={2}>
                            <Input
                                value={option.text}
                                placeholder={`Option ${index + 1} Text`}
                                onChange={(e) => handleOptionChange(index, 'text', e.target.value)}
                                bgColor={inputBg}
                            />
                            <Input
                                type="number"
                                w="fit-content"
                                value={option.score}
                                placeholder={`Option ${index + 1} Score`}
                                onChange={(e) => handleOptionChange(index, 'score', e.target.value)}
                                bgColor={inputBg}
                            />
                        </HStack>
                    ))}
                </FormControl>

            </VStack>


        </Box>
    );
}

export default AddQuestionForm;
