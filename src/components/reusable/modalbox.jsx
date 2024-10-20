import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import BillingModal from "./billmodal";

function ModalBox({ show, onHide, info, items,billFrom }) {
  const [showBillingModal, setShowBillingModal] = useState(false);

  const handleViewBill = () => {
    setShowBillingModal(true);
  };

  const handleCloseBillingModal = () => {
    setShowBillingModal(false);
  };

  return (
    <>
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Bill Added</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Bill has been added successfully!</h4>
          <Button
            variant="primary"
            className="d-block w-100 mt-3"
            onClick={handleViewBill}
          >
            View Bill
          </Button>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

{ showBillingModal &&   <BillingModal
        showModal={showBillingModal}
        closeModal={handleCloseBillingModal}
        info={info} 
        items={items}
        total={info ? info.total : 0}
        billFrom={billFrom}
      />}
    </>
  );
}


export default ModalBox;
