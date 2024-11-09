import { useState, useEffect, useRef } from "react";
import { VStack, Input, Button, Box, useToast, useColorModeValue, Textarea, Heading, Text, HStack, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay } from "@chakra-ui/react";
import useAdmin from "../../hooks/useAdmin";
import useCustomTheme from "../../hooks/useCustomTheme";
import useGlobalState from "../../hooks/useGlobalState";

const AddCategoryForm = () => {
    const [categoryName, setCategoryName] = useState('');
    const [description, setDescription] = useState('');
    const [categories, setCategories] = useState([]);
    const [deleteCategoryId, setDeleteCategoryId] = useState(null);
    const [deleteCategoryName, setDeleteCategoryName] = useState('');
    const [confirmationInput, setConfirmationInput] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const cancelRef = useRef();
    const { addCategory, fetchCategories, deleteCategory } = useAdmin();
    const toast = useToast();
    const hoverBg = useColorModeValue("gray.100", "gray.700");
    const { cardBg, inputBg } = useCustomTheme();
    const { fetchAgain, setFetchAgain } = useGlobalState();

    const handleSubmit = async () => {
        try {
            await addCategory({ categoryName, description });
            setCategoryName('');
            setDescription('');
        } catch (error) {
            console.error('Error adding category:', error);
        }
        setFetchAgain(!fetchAgain);
    };

    const handleDelete = async () => {
        try {
            await deleteCategory(deleteCategoryId);
            setIsOpen(false);
            setDeleteCategoryId(null);
            setDeleteCategoryName('');
            setConfirmationInput('');
        } catch (error) {
            console.error('Error deleting category:', error);
        }
        setFetchAgain(!fetchAgain);
    };

    const openDeleteModal = (id, name) => {
        setDeleteCategoryId(id);
        setDeleteCategoryName(name);
        setConfirmationInput('');
        setIsOpen(true);
    };

    useEffect(() => {
        const getCategories = async () => {
            const data = await fetchCategories();
            setCategories(data);
        };
        getCategories();
    }, [fetchAgain]);

    const handleCopyToClipboard = (id) => {
        navigator.clipboard.writeText(id);
        toast({
            title: "Event",
            description: `Category ID: ${id} copied to clipboard`,
            status: "success",
            duration: 3000,
            isClosable: true,
        });
    };

    return (
        <VStack spacing={4} w="80%" justifySelf="center" flex={1}>
            <Input
                placeholder="Category Name"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                required
                bgColor={inputBg}
                mt={10}
            />
            <Textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                bgColor={inputBg}
            />
            <Button onClick={handleSubmit} colorScheme="blue">Add Category</Button>

            <Heading size="lg" mt={10}>Categories</Heading>
            <VStack spacing={4} w="100%" mt={4} h="400px" overflowY="auto" pb={5}>
                {categories.map((category) => (
                    <Box
                        key={category._id}
                        p={4}
                        w="100%"
                        bgColor={cardBg}
                        borderRadius="md"
                        boxShadow="md"
                    >
                        <HStack w="100%" justifyContent="space-between">
                            <Heading size="md">{category.categoryName}</Heading>
                            <HStack>
                                <Button
                                    size="sm"
                                    colorScheme="blue"
                                    onClick={() => handleCopyToClipboard(category._id)}
                                >
                                    Copy ID
                                </Button>
                                <Button
                                    size="sm"
                                    colorScheme="red"
                                    onClick={() => openDeleteModal(category._id, category.categoryName)}
                                >
                                    Delete
                                </Button>
                            </HStack>
                        </HStack>
                        <Text mt={2}>{category.description}</Text>
                        <Text mt={2} fontSize="sm" color="gray.500">ID: {category._id}</Text>
                    </Box>
                ))}
            </VStack>

            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={() => setIsOpen(false)}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Delete Category
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure you want to delete the category "{deleteCategoryName}"? This action cannot be undone.
                            <Input
                                placeholder="Type category name to confirm"
                                value={confirmationInput}
                                onChange={(e) => setConfirmationInput(e.target.value)}
                                mt={4}
                            />
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={() => setIsOpen(false)}>
                                Cancel
                            </Button>
                            <Button
                                colorScheme="red"
                                onClick={handleDelete}
                                ml={3}
                                isDisabled={confirmationInput !== deleteCategoryName}
                            >
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </VStack>
    );
};

export default AddCategoryForm;
