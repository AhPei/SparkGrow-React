import { Container} from "react-bootstrap";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import ProfileCard from "./ProfileCard";
import Orders from "./Orders";

export default function ProfilePage({ title }) {
  useDocumentTitle(title);

  return (
    <Container>
      <ProfileCard />
      <Orders />
    </Container>
  );
}
