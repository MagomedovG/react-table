import React, { useMemo, useState } from 'react';
import { useTable } from 'react-table';
import MOSC_DATA from './MOSC_DATA.json';
import COLUMNS from './columns.js';
import './table.css';
import AddRowForm from './RowForm';
// import { ReactComponent as Logo } from '../public/edit.svg';

export const BasicTable = () => {
  const columns = useMemo(() => COLUMNS, []);
  const [data, setData] = useState(MOSC_DATA);
  const [editedRowId, setEditedRowId] = useState(null);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  });

  const handleCellEdit = (rowIndex, columnId, value) => {
    const updatedData = [...data];
    updatedData[rowIndex][columnId] = value;
    setData(updatedData);
  };

  const handleEditClick = (rowId) => {
    setEditedRowId(rowId === editedRowId ? null : rowId);
  };

  const handleSaveEdit = (rowIndex) => {
    setEditedRowId(null);
    // Save changes to the data array
  };

  const handleDeleteRow = (rowIndex) => {
    // Remove the row from the data array
    const updatedData = [...data];
    updatedData.splice(rowIndex, 1);
    setData(updatedData);
  };

  const handleAddRow = (newRow) => {
    setData([...data, newRow]);
  };

  return (
    <div>
        <AddRowForm columns={columns} onAddRow={handleAddRow} />
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
    
      <tbody {...getTableBodyProps()}>
        {rows.map((row, rowIndex) => {
          prepareRow(row);
          const isEditing = row.id === editedRowId;
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                const { column } = cell;
                const isEditable = column.editable;
                return (
                  <td {...cell.getCellProps()}>
                    {isEditing ? (
                      <input
                        type="text"
                        value={cell.value}
                        onChange={(e) =>
                          handleCellEdit(rowIndex, column.id, e.target.value)
                        }
                      />
                    ) : (
                      cell.render('Cell')
                    )}
                  </td>
                );
              })}
              <td>
                <button onClick={() => handleEditClick(row.id)}>
                  {isEditing ? <img src="/ok.svg" alt="ok" /> : <img src="/edit.svg" alt="edit" />}
                </button>
                <button onClick={() => handleDeleteRow(rowIndex)}><img src="/delete2.svg" alt="Delete" /></button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>

    </div>
      );
};
