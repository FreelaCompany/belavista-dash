import React, { useEffect, useRef } from "react";
import { useField } from "@unform/core";
import { Container } from "./styles";

export default function Textarea({ name, label, required, margin, ...rest }) {
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
    <Container margin={margin}>
      <label htmlFor={fieldName}>
        {label}
        {required && <span>*</span>}
      </label>
      <textarea
        name={fieldName}
        id={fieldName}
        ref={inputRef}
        defaultValue={defaultValue}
        {...rest}
      />
      {error && <span className="error">{error}</span>}
    </Container>
  );
}