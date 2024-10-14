
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
    const { username, email } = userInfo;

    return (
        <>
            <Button onClick={onOpen} variant="none">Open Profile</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Profile</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Avatar name={username} src="https://bit.ly/broken-link" />
                        <Text mt={4}>Username: {username}</Text>
                        <Text>Email: {email}</Text>
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