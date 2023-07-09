import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

export default function AppTable({
                                     columns,
                                     data = [],
                                     page=1,
                                     setPage = ()=> {},
                                     setPageSize = ()=>{},
                                     pageSize=4,
                                     total=10,
                                     pageSizeOptions= [5,10,20] ,
                                     ...rest
                                 })
{
    return (

        <DataGrid
            rowHeight={80}
            rows={data}
            columns={columns}
            pageSize={pageSize}
            page={page}
            rowsPerPageOptions={pageSizeOptions}
            checkboxSelection
            onPageChange={setPage}
            onPageSizeChange={setPageSize}
            paginationMode='client'
            rowCount={total}
            {...rest}

        />

    );
}