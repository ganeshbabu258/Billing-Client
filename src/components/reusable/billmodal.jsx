import React from "react";
import { Modal, Row, Col, Table, Button } from "react-bootstrap";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function BillingModal(props) {

  
  const generateBill = () => {
    html2canvas(document.querySelector("#billCapture")).then((canvas) => {
      const imgData = canvas.toDataURL("image/png", 1.0);
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: [612, 792],
      });

      pdf.internal.scaleFactor = 1.0;
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("Bill.pdf");
    });
  };

  return (
    <Modal show={props.showModal} onHide={props.closeModal} size="lg" centered>
      <div id="billCapture">
        <div className="d-flex flex-row justify-content-between align-items-start bg-light w-100 p-4">
          <div className="w-100">
            <h4 className="fw-bold my-2">{props.info.billFrom}</h4>
            <h6 className="fw-bold my-2 text-secondary">
              Invoice#: {props.info.billingNumber}
            </h6>
          </div>

          <div className="text-end ms-4">
            <h6 className="fw-bold mt-1 mb-2">Amount Due</h6>
            <h5 className="fw-bold text-secondary">
              {props.info.currency} {props.total}
            </h5>
          </div>
        </div>

        <div className="p-4">
          <Row className="mb-4">
            <Col md={4}>
              <div className="fw-bold">Billed To:</div>
              <div>{props.info.billTo || ""}</div>
              <div>{props.info.billToAddress || ""}</div>
              <div>{props.info.billToEmail || ""}</div>
            </Col>

            <Col md={4}>
              <div className="fw-bold">Billed From:</div>
              <div>{props.billFrom.billFrom || ""}</div>
              <div>{props.billFrom.billFromAddress || ""}</div>
              <div>{props.billFrom.billFromEmail || ""}</div>
            </Col>

            <Col md={4}>
              <div className="fw-bold mt-2">Date Of Issue:</div>
              <div>{new Date().toLocaleDateString()}</div>
            </Col>
          </Row>

          <Table className="mb-0">
            <thead>
              <tr>
                <th>QTY</th>
                <th>DESCRIPTION</th>
                <th className="text-end">PRICE</th>
                <th className="text-end">AMOUNT</th>
              </tr>
            </thead>
            <tbody>
              {props.items.map((item) => (
                <tr key={item.id}>
                  <td style={{ width: "70px" }}>{item.quantity}</td>
                  <td>
                    {item.name} - {item.description}
                  </td>
                  <td className="text-end" style={{ width: "100px" }}>
                    {props.info.currency} {item.price}
                  </td>
                  <td className="text-end" style={{ width: "100px" }}>
                    {props.info.currency} {item.price * item.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Table>
            <tbody>
              <tr>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td></td>
                <td className="fw-bold" style={{ width: "100px" }}>
                  SUBTOTAL
                </td>
                <td className="text-end" style={{ width: "100px" }}>
                  {props.billFrom.currency} {props.billFrom.subTotal}
                </td>
              </tr>
              <tr className="text-end">
                <td></td>
                <td className="fw-bold" style={{ width: "100px" }}>
                  TAX
                </td>
                <td className="text-end" style={{ width: "100px" }}>
                  {props.billFrom.currency} {props.billFrom.GSTAmount}
                </td>
              </tr>
              {props.discountAmount !== 0.0 && (
                <tr className="text-end">
                  <td></td>
                  <td className="fw-bold" style={{ width: "100px" }}>
                    DISCOUNT
                  </td>
                  <td className="text-end" style={{ width: "100px" }}>
                    {props.billFrom.currency} {props.billFrom.discountAmount}
                  </td>
                </tr>
              )}
              <tr className="text-end">
                <td></td>
                <td className="fw-bold" style={{ width: "100px" }}>
                  TOTAL
                </td>
                <td className="text-end" style={{ width: "100px" }}>
                  {props.info.currency} {props.total}
                </td>
              </tr>
            </tbody>
          </Table>

          {props.info.notes && (
            <div className="bg-light py-3 px-4 rounded">
              <div>{props.info.notes}</div>
            </div>
          )}
        </div>
      </div>

      <div className="pb-4 px-4">
        <Button variant="primary" className="d-block w-100 mt-3 mt-md-0" onClick={generateBill}>
          Download
        </Button>
      </div>
    </Modal>
  );
}

