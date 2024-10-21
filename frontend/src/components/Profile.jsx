// Desc: Profile component to display user information
// Reference: https://v2.chakra-ui.com/docs/overlay/modal

import PropTypes from 'prop-types';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Avatar,
    Text,
    useDisclosure
} from '@chakra-ui/react';

const Profile = ({userInfo}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    console.log('=== userInfo Profile.jsx [21] ===', userInfo);


    return (
        <>
            <Button onClick={onOpen} w="full" h="full" variant="unstyled"  >Profile</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Profile</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Avatar name={userInfo.username} />
                        <Text mt={4}>Username: {userInfo.username}</Text>
                        <Text>Email: {userInfo.email}</Text>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

Profile.propTypes = {
    userInfo: PropTypes.shape({
        username: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired
    }).isRequired
};

export default Profile;