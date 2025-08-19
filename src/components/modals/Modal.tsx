import {
  ModalProps,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalHeader,
  ModalContentProps,
} from "@chakra-ui/react";

interface ModalPropsParams extends ModalProps {
  modalHeaderText?: string;
  modalContentProps?: ModalContentProps;
}

const CustomModal = (params: ModalPropsParams) => {
  return (
    <Modal {...params}>
      <ModalOverlay />
      <ModalContent {...params.modalContentProps}>
        <ModalHeader>{params.modalHeaderText}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{params.children}</ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CustomModal;
