// Hooks
import useDocumentTitle from "../hooks/useDocumentTitle";

export default function NotFound({ title }) {
  useDocumentTitle(title);

  return <div>NotFound</div>;
}
