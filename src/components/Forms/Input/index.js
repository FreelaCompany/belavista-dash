import React, { useRef, useEffect } from "react";
import { useField } from "@unform/core";
import { Container } from "./styles";

export default function Input({ name, label, required, icon, ...rest }) {
  const inputRef = useRef(null);
  const { fieldName, defaultValue = "", registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "value",
    });
  }, [fieldName, registerField]);

  return (
    <Container>
      <label htmlFor={fieldName}>
        {label}
        {required && <span>*</span>}
      </label>
      <input
        id={fieldName}
        name={fieldName}
        ref={inputRef}
        defaultValue={defaultValue}
        {...rest}
      />
      {icon && <button type="submit">{icon}</button>}
      {error && <span className="error">{error}</span>}
    </Container>
  );
}
