import { useState, useEffect } from "react";
import { Box, Heading, Table, Tbody, Tr, Td, Text, Thead, Th, HStack, IconButton, Tabs, TabList, Tab, TabPanels, TabPanel, useToast, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Input, FormControl, FormLabel } from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import useAdmin from "../../hooks/useAdmin";
import useCustomTheme from "../../hooks/useCustomTheme";
import useGlobalState from "../../hooks/useGlobalState";

const Questions = () => {
    const { fetchCategories, fetchQuestionsByCategory, deleteQuestion, modifyQuestion } = useAdmin();
    const [categories, setCategories] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const { cardBg } = useCustomTheme();
    const toast = useToast();
    const { fetchAgain, setFetchAgain } = useGlobalState();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [editedQuestionText, setEditedQuestionText] = useState("");
    const [editedOptions, setEditedOptions] = useState([]);

    useEffect(() => {
        const getCategories = async () => {
            const categoriesData = await fetchCategories();
            setCategories(categoriesData);
            if (categoriesData.length > 0) {
                handleCategoryClick(categoriesData[0]._id);
            }
        };
        getCategories();
    }, [fetchAgain]);

    const handleCategoryClick = async (categoryId) => {
        setSelectedCategory(categoryId);
        const questionsData = await fetchQuestionsByCategory(categoryId);
        console.log('=== questionsData Questions.jsx [26] ===', questionsData);
        setQuestions(questionsData);
    };

    const handleEdit = (question) => {
        setCurrentQuestion(question);
        setEditedQuestionText(question.questionText);
        setEditedOptions(question.options);
        setIsEditModalOpen(true);
    };

    const handleDelete = async (id) => {
        console.log(`Delete question with id: ${id}`);
        await deleteQuestion(id);
        setFetchAgain(!fetchAgain);
        toast({
            title: "Question deleted successfully.",
            status: "success",
            duration: 5000,
            isClosable: true,
        });
    };

    const handleEditSubmit = async () => {
        await modifyQuestion(currentQuestion._id, { questionText: editedQuestionText, options: editedOptions });
        setIsEditModalOpen(false);
        setFetchAgain(!fetchAgain);
    };

    const handleOptionChange = (index, field, value) => {
        const newOptions = [...editedOptions];
        newOptions[index][field] = value;
        setEditedOptions(newOptions);
    };

    return (
        <>
            <Tabs
                variant="soft-rounded"
                index={categories.findIndex(category => category._id === selectedCategory)}
                onChange={(index) => handleCategoryClick(categories[index]._id)}
                w="100%"
                h="100%"
                display="grid"
                gridTemplateRows="10% 90%"
                p={5}
            >
                <TabList py={2} px={5}>
                    {categories.map((category) => (
                        <Tab key={category._id}>
                            {category.categoryName}
                        </Tab>
                    ))}
                </TabList>
                <TabPanels>
                    {categories.map((category) => (
                        <TabPanel key={category._id}>
                            {!questions && <Box h="100%" display="flex" justifyContent="center" alignItems="center"><Heading opacity={0.5}>No questions found for this category</Heading></Box>}
                            {questions && questions.map((q) => (
                                <Box w="80%" mx="auto" mt={3} key={q.id} borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} bgColor={cardBg}>
                                    <HStack>
                                        <Text flex={1} size="lg" mb={5}><strong>Question:</strong> {q.questionText}</Text>
                                        <HStack spacing={2}>
                                            <IconButton
                                                aria-label="Edit question"
                                                icon={<EditIcon />}
                                                onClick={() => handleEdit(q)}
                                            />
                                            <IconButton
                                                aria-label="Delete question"
                                                icon={<DeleteIcon />}
                                                onClick={() => handleDelete(q._id)}
                                            />
                                        </HStack>
                                    </HStack>
                                    <Table variant="simple">
                                        <Thead>
                                            <Tr>
                                                <Th>Option</Th>
                                                <Th>Score</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            {q.options.map((option, index) => (
                                                <Tr key={index}>
                                                    <Td minWidth="150px">{option.optionText}</Td>
                                                    <Td minWidth="50px">{option.score}</Td>
                                                </Tr>
                                            ))}
                                        </Tbody>
                                    </Table>
                                </Box>
                            ))}
                        </TabPanel>
                    ))}
                </TabPanels>
            </Tabs>

            <Modal size="2xl" isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit Question</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <FormLabel>Question Text</FormLabel>
                            <Input
                                value={editedQuestionText}
                                onChange={(e) => setEditedQuestionText(e.target.value)}
                            />
                        </FormControl>
                        {editedOptions.map((option, index) => (
                            <FormControl key={index} mt={4}>
                                <FormLabel>Option {index + 1}</FormLabel>
                                <Input
                                    placeholder="Option Text"
                                    value={option.optionText}
                                    onChange={(e) => handleOptionChange(index, 'optionText', e.target.value)}
                                />
                                <Input
                                    placeholder="Score"
                                    type="number"
                                    value={option.score}
                                    onChange={(e) => handleOptionChange(index, 'score', e.target.value)}
                                    mt={2}
                                />
                            </FormControl>
                        ))}
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={handleEditSubmit}>
                            Save
                        </Button>
                        <Button variant="ghost" onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default Questions;
