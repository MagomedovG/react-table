import React, { useState } from 'react';
import './form.css'
const AddRowForm = ({ columns, onAddRow }) => {
  const initialRowState = Object.fromEntries(columns.map(column => [column.accessor, '']));
  const [rowData, setRowData] = useState(initialRowState);

  const handleChange = (e, accessor) => {
    setRowData({ ...rowData, [accessor]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddRow(rowData);
    setRowData(initialRowState);
  };

  return (
    <form onSubmit={handleSubmit}>
      {columns.map(column => (
        <div key={column.accessor}>
          <label htmlFor={column.accessor}>{column.Header}</label>
          <input
            type="text"
            id={column.accessor}
            value={rowData[column.accessor]}
            onChange={(e) => handleChange(e, column.accessor)}
          />
        </div>
      ))}
      <button type="submit">Добавить ряд</button>
    </form>
  );
};

export default AddRowForm;
