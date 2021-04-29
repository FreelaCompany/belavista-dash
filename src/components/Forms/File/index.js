import React, { useEffect, useRef, useState } from "react";
import { useField } from "@unform/core";
import { Container, Arquivo } from "./styles";

export default function File({ name, label, required, icon, ...rest }) {
  const inputRef = useRef(null);
  const { fieldName, defaultValue = "", registerField, error } = useField(name);
  const [attach, setAttach] = useState(undefined);

  function handleChange(event) {
    setAttach(event.target.files[0]);
  }

  function handleFile() {
    return inputRef.current.click();
  }

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
      <Arquivo>
        <span>{attach ? attach.name : "Nenhum arquivo selecionado"}</span>
        <input
          className="arquivo"
          type="file"
          id={fieldName}
          name={fieldName}
          ref={inputRef}
          defaultValue={defaultValue}
          onChange={handleChange}
        />
        <button type="button" onClick={handleFile}>
          Selecionar
        </button>
      </Arquivo>
      {icon && <button type="submit">{icon}</button>}
      {error && <span className="error">{error}</span>}
    </Container>
  );
}