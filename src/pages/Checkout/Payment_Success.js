import Payment from "./Payment";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading";

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
      .catch((res) => console.log(res))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading />;

  return <Payment success={success} />;
}
