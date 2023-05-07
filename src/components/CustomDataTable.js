import React from 'react';
import DataTable from 'react-data-table-component';

const customStyles = {
  rows: {
    style: {
      minHeight: '50px', // override the row height
    },
  },
  headCells: {
    style: {
      paddingLeft: '8px', // override the cell padding for head cells
      paddingRight: '8px',
      fontSize: '1.6rem',
      fontWeight: '500',
    },
  },
  cells: {
    style: {
      paddingLeft: '8px', // override the cell padding for data cells
      paddingRight: '8px',
      fontSize: '1.5rem',
      textTransform: 'capitalize',
    },
  },
};
const CustomDataTable = ({ columns, data }) => {
  return (
    <div className='table-wrapper'>
      <DataTable
        pagination
        columns={columns}
        data={data}
        customStyles={customStyles}
      />
    </div>
  );
};

export default CustomDataTable;
