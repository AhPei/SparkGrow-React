import { useParams } from "react-router-dom";
import { useGetOrder } from "../../api";
import Loading from "../../components/Loading";
import OrderForm from "./OrderForm";

// Hooks
import useDocumentTitle from "../../hooks/useDocumentTitle";

export default function Order({ title }) {
  useDocumentTitle(title);

  const { id } = useParams();

  const { data: orders, isLoading } = useGetOrder(id);

  if (isLoading) return <Loading />;

  const { products: items, total } = orders;

  return <OrderForm id={id} items={items} total={total} />;
}
