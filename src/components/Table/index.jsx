import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";

function TableCompenent(props) {
  const { header, data, handleDelete, handleEdit } = props;
  return (
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          {header?.map((data, index) => (
            <th key={index}>{data?.key}</th>
          ))}
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            {header?.map((headerValue, index) => (
              <td key={index}>{item[headerValue?.value]}</td>
            ))}
            <td>
              <Button
                className="m-1"
                variant="primary"
                onClick={() => {
                  handleEdit(item);
                }}
              >
                Edit
              </Button>

              <Button
                className="m-1"
                variant="danger"
                onClick={() => {
                  handleDelete(item);
                }}
              >
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default TableCompenent;
