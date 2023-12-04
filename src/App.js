// import logo from "./logo.svg";
import { useLiveQuery } from "dexie-react-hooks";
import "./App.css";
import Menu from "./components/Menu";
import TableCompenent from "./components/Table";
import { db } from "./utils/db";
import { useState } from "react";
import WarnModal from "./components/WarnModal";
import AddOrEditLoans from "./containers/AddOrEditLoans";
import { Button } from "react-bootstrap";

function App() {
  const [item, setItem] = useState();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const headerData = [
    "loanName",
    "startDate",
    "emi",
    "totalAmount",
    "amountPaid",
    "amountToPay",
    "updatedAt",
  ];
  const loans = useLiveQuery(() => db.loans.toArray(), [item]);
  const handleEdit = (item) => {
    if (item) {
      setItem(item);
      setShowModal(true);
    }
  };
  const handleDelete = async () => {
    await db.loans.delete(item.id);
    setItem();
    setShowDeleteModal(false);
  };
  const handleClear = () => {
    setShowModal(false);
    setItem();
  };
  const handleShowDeleteModal = (item) => {
    setItem(item);
    setShowDeleteModal(true);
  };
  const handleShowModal = () => {
    setItem();
    setShowModal(true);
  };
  return (
    <>
      <Menu />
      <div className="App">
        <div className="d-flex justify-content-end p-2">
          <Button variant="primary" onClick={handleShowModal}>
            Add
          </Button>
        </div>
        {loans?.length ? (
          <TableCompenent
            header={headerData.map((data) => ({ key: data, value: data }))}
            data={loans || []}
            handleDelete={handleShowDeleteModal}
            handleEdit={handleEdit}
          />
        ) : (
          <div className="text-center">No Items Found</div>
        )}
        <AddOrEditLoans
          show={showModal}
          handleClose={() => setShowModal(false)}
          item={item}
          handleClear={handleClear}
        />

        <WarnModal
          handleClose={() => {
            setShowDeleteModal(false);
          }}
          handleDelete={handleDelete}
          show={showDeleteModal}
        />
      </div>
    </>
  );
}

export default App;
