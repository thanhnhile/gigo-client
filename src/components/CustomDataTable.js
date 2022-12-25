import React from 'react';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { Icon } from '@iconify/react';
import { DELIVERY_METHOD, ORDER_STATUS } from '~/utils/enum';
import Status from '~/components/Status';
import { formatPrice } from '~/utils/format';

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
      fontSize: '1.5rem',
      fontWeight: '500',
    },
  },
  cells: {
    style: {
      paddingLeft: '8px', // override the cell padding for data cells
      paddingRight: '8px',
      fontSize: '1.2rem',
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
