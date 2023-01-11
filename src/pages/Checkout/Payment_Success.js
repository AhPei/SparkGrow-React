import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api";
import Loading from "../../components/Loading";
import Payment from "./Payment";

export default function Payment_Success() {
  const { session_id } = useParams();
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get(`payment/check-session-id/${session_id}`)
      .then(({ data }) => {
        setSuccess(!!data);
        if (!data) return navigate("/", { replace: true });
      })
      .catch((res) => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading />;

  return <Payment success={success} />;
}
