
import React from "react";
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Button, useDisclosure
} from "@chakra-ui/react";
import { FaTrashAlt } from "react-icons/fa";
const BtnAlert = ({ btntxt, fun, headertxt, bodytxt }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef();

    return (
        <>
            <FaTrashAlt size={22} onClick={onOpen} className="text-red-500 cursor-pointer" />
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            {headertxt}
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            {bodytxt}
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme="red" onClick={() => fun()} ml={3}>
                                {btntxt}
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    );
};

export default BtnAlert;
