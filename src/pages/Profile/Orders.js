import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAllOrder } from "../../api";
import Loading from "../../components/Loading";

export default function Orders() {
  const { isLoading, data: orders } = useAllOrder();
  const navigate = useNavigate();

  const headers = ["Order ID", "Products", "Total", "Purchased Date"];

  if (isLoading) return <Loading />;

  return (
    <Table
      striped
      bordered
      hover
      variant="dark"
      className="mx-auto text-center mt-3"
      responsive
    >
      <thead>
        <tr>
          {headers.map((data, idx) => (
            <th key={idx} style={{ fontWeight: "bold" }}>
              {data}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {orders?.map(({ id, products, total, created_at }, idx) => (
          <tr key={idx} onClick={() => navigate(`/order/${id}`)}>
            <td>{id}</td>
            <td>{products.length}</td>
            <td>RM {total.toFixed(2)}</td>
            <td>{created_at}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
