import React from "react";
import { Table, Button } from "react-bootstrap";
import EditableField from "./editablefield";
import { BiTrash } from "react-icons/bi";

function InvoiceItem(props) {
  var itemTable = props.items.map((item) => (
    <ItemRow
      onItemizedItemEdit={props.onItemizedItemEdit}
      item={item}
      onDelEvent={props.onRowDel}
      key={item.id}
      currency={props.currency}
    />
  ));
  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Price/Rate</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>{itemTable}</tbody>
      </Table>
      <Button className="fw-bold" onClick={props.onRowAdd}>Add Items</Button>
    </div>
  );
}

function ItemRow(props) {
  const onDelEvent = () => {
    props.onDelEvent(props.item);
  };

  return (
    <tr>
      <td style={{ width: "100%" }}>
        <EditableField
          onItemizedItemEdit={props.onItemizedItemEdit}
          cellData={{
            type: "text",
            name: "name",
            placeholder: "Item Name",
            textAlign: "text-start",
            value: props.item.name,
            id: props.item.id,
          }}
        />

        <EditableField
          onItemizedItemEdit={props.onItemizedItemEdit}
          cellData={{
            type: "text",
            name: "description",
            placeholder: "Item description",
            textAlign:"text-start",
            value: props.item.description,
            id: props.item.id,
          }}
        />
      </td>

      <td style={{ minWidth: "70px" }}>
        <EditableField
          onItemizedItemEdit={props.onItemizedItemEdit}
          cellData={{
            type: "number",
            name: "quantity",
            min: 1,
            step: "1",
            value: props.item.quantity,
            id: props.item.id,
          }}
        />
      </td>

      <td style={{ minWidth: "130px" }}>
        <EditableField
          onItemizedItemEdit={props.onItemizedItemEdit}
          cellData={{
            leading: props.currency,
            type: "number",
            name: "price",
            min: 1,
            step: "0.01",
            value: props.item.price,
            id: props.item.id,
          }}
        />
      </td>

      <td className="text-center" style={{ minWidth: "50px" }}>
        <BiTrash
          onClick={onDelEvent}
          style={{ height: "33px", width: "33px", padding: "7.5px" }}
          className="text-white mt-1 btn btn-danger"
        />
      </td>
    </tr>
  );
}

export default InvoiceItem;
