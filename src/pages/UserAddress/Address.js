import { useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { AiOutlineEdit } from "react-icons/ai";
import { ImBin } from "react-icons/im";
import { useAllAddress, useRemoveAddress, useUpdateAddress } from "../../api";
import Button from "../../components/Button";
import IsConfirm from "../../components/IsConfirm";
import Loading from "../../components/Loading";
import AddressForm from "./AddressForm";

export default function Address() {
  const [edit, setEdit] = useState(false);
  const [add, setAdd] = useState(false);
  const [editData, setEditData] = useState({});
  const [showDelete, setShowDelete] = useState(false);
  const [showDeleteData, setShowDeleteData] = useState("");

  const { data: address, isLoading } = useAllAddress();
  const { mutate: remove } = useRemoveAddress();

  const { mutate: update } = useUpdateAddress(showDeleteData);
  const handleSetDefault = () => update({ isDefault: true });

  if (isLoading) return <Loading />;

  return (
    <>
      <Container>
        <Row>
          <Col className="text-right">
            <Button onClick={() => setAdd(true)}>+ Add New Address</Button>
          </Col>
        </Row>
        {address?.map((data, idx) => (
          <Card
            key={idx}
            className="mb-3 py-1 px-2 mx-auto"
            style={{ width: "35rem" }}
          >
            <Row>
              <Col>
                <Card.Title className="text-capitalize">
                  {data.consignee} | {data.contact}
                </Card.Title>
                <p>
                  {data.address}, {data.city}, {data.postcode}, {data.country}.
                </p>
              </Col>
              <Col className="text-right" md={4}>
                <Row>
                  <Col>
                    <AiOutlineEdit
                      className="pointer"
                      size="2rem"
                      onClick={() => {
                        setEdit(true);
                        setEditData(data);
                      }}
                    />
                    {!data.isDefault && (
                      <ImBin
                        className="pointer"
                        size="2rem"
                        onClick={() => {
                          setShowDelete(true);
                          setShowDeleteData(data.id);
                        }}
                      />
                    )}
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      disabled={data.isDefault}
                      onClick={async () => {
                        await setShowDeleteData(data.id);
                        handleSetDefault();
                      }}
                    >
                      Set Default
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card>
        ))}
      </Container>
      <IsConfirm
        show={showDelete}
        setShow={setShowDelete}
        onConfirm={() => remove(showDeleteData)}
      />
      <AddressForm show={add} setShow={setAdd} />
      <AddressForm show={edit} setShow={setEdit} data={editData} />
    </>
  );
}
