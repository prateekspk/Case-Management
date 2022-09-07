import React from 'react'
import MUIDataTable from "mui-datatables";

const defaultOptions = {
    filterType: 'checkbox',
  };
  

export default function MuiDataTable( columns, data =[],title, options=defaultOptions) {
    

    return(
<><MUIDataTable
  title={title}
  data={data}
  columns={columns}
  options={options}
/></>
    )
}