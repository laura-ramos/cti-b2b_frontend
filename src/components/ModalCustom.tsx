import { Button, Modal } from "react-bootstrap";

interface Props {
  title: string;
  open: boolean;
  handleClose: () => void;
  children: JSX.Element;
}

export const ModalCustom = ({title, open, handleClose, children}: Props) => {

  return (
    <>
      <Modal show={open} onHide={handleClose}>
        <Modal.Header className="bg-info">
          <Modal.Title>{title}</Modal.Title>
          <button type="button" className="close" onClick={handleClose}>×</button>
        </Modal.Header>
        <Modal.Body>
          {children}
        </Modal.Body>
        {/*<Modal.Footer className="d-flex justify-content-between">
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>*/}
      </Modal>
    </>
  )
}