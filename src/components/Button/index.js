import React from "react";
import { Container } from "./styles";
import ClipLoader from "react-spinners/ClipLoader";

export default function Button({
  btType,
  label,
  action,
  type,
  icon,
  full,
  classButton,
  loading,
}) {
  return (
    <Container
      btType={btType}
      onClick={action}
      type={type || "button"}
      full={full}
      className={classButton}>
      {loading && <ClipLoader size={20} color={"#000"} loading={loading} />}
      {/* {!loading && icon} */}
      {!loading && label}
      {/* {label} */}
    </Container>
  );
}
