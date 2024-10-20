import React from "react";
import { FormControl, InputGroup } from "react-bootstrap";

function EditableField(props) {
  return (
    <InputGroup className="my-1 flex-nowrap">
  {props.cellData.leading && (
    <InputGroup.Text className="bg-light fw-bold border-0 text-secondary px-2 py-0">
      <span
        className="border border-2 border-secondary rounded-circle d-flex align-items-center justify-content-center small"
        style={{ minWidth: "30px", padding: "0.2rem", fontSize:"0.8rem" }} 
      >
        {props.cellData.leading}
      </span>
    </InputGroup.Text>
      )}
      <FormControl
        className={props.cellData.textAlign}
        type={props.cellData.type}
        placeholder={props.cellData.placeholder}
        min={props.cellData.min}
        max={props.cellData.max}
        name={props.cellData.name}
        id={props.cellData.id}
        value={props.cellData.value || ""}  
        step={props.cellData.step}
        onChange={(e) => props.onItemizedItemEdit(e, props.cellData.id)}
        required
      />
    </InputGroup>
  );
}

export default EditableField;
