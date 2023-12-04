import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { formattedDate } from "../../utils";
import { db } from "../../utils/db";
import { Button, Col, Form, Row } from "react-bootstrap";

function AddOrEditLoans({ item, handleClear, show, handleClose }) {
  const [loan, setLoan] = useState({
    loanName: "",
    startDate: "",
    emi: "",
    totalAmount: "",
    amountPaid: "",
    amountToPay: "",
    updatedAt: formattedDate(),
  });

  const handleAddItem = async () => {
    try {
      const updatedAt = formattedDate();
      if (item?.id) {
        await db.loans.update(item.id, { ...loan, updatedAt: updatedAt });
      } else {
        await db.loans.add({ ...loan, updatedAt: updatedAt });
      }
      setLoan({
        loanName: "",
        startDate: "",
        emi: "",
        totalAmount: "",
        amountPaid: "",
        amountToPay: "",
        updatedAt: formattedDate(),
      });
      handleClear();
      // fetchData();
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };
  useEffect(() => {
    setLoan(item);
  }, [item]);
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{item?.id ? "Update" : "Add"} Loan </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Loan Name:</Form.Label>
              <Form.Control
                type="text"
                value={loan?.loanName}
                onChange={(e) => setLoan({ ...loan, loanName: e.target.value })}
                placeholder="Loan Name"
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>EMI:</Form.Label>
              <Form.Control
                type="number"
                value={loan?.emi}
                onChange={(e) => setLoan({ ...loan, emi: e.target.value })}
                placeholder="EMI"
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Total Amount:</Form.Label>
              <Form.Control
                type="number"
                value={loan?.totalAmount}
                onChange={(e) =>
                  setLoan({ ...loan, totalAmount: e.target.value })
                }
                placeholder="Total Amount"
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Amount Paid:</Form.Label>
              <Form.Control
                type="number"
                value={loan?.amountPaid}
                onChange={(e) =>
                  setLoan({ ...loan, amountPaid: e.target.value })
                }
                placeholder="Amount Paid"
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Amount To Pay:</Form.Label>
              <Form.Control
                type="number"
                value={loan?.amountToPay}
                onChange={(e) =>
                  setLoan({ ...loan, amountToPay: e.target.value })
                }
                placeholder="Amount To Pay"
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Start Date:</Form.Label>
              <input
                type="date"
                value={loan?.startDate}
                onChange={(e) =>
                  setLoan({ ...loan, startDate: e.target.value })
                }
                placeholder="Start Date"
              />
            </Form.Group>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleAddItem}>
          {item?.id ? "Update" : "Add"} Loan
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddOrEditLoans;
