import Spinner from 'components/spinner'
import { useAuthData } from 'hooks/authData'
import { useBmiHistory } from 'hooks/useBmiHistory'
import React from 'react'
import { Table, Button } from 'react-bootstrap'
import { useTable } from 'react-table'

const Tabela = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  })

const { authData } = useAuthData();  
const { removeBmiItem, isRemoving }   = useBmiHistory({userID: authData.data.id}); 

  const cellRender = (cell) => {
    if(cell.column.Header==="Delete"){ 
      return (<Button variant="danger" size="sm" onClick={()=>removeBmiItem({ id: cell.value})} >{cell.value}</Button> );
    }  
    return cell.render('Cell');
  }

  return (
    <>
      { (isRemoving)  && <Spinner />}
      <Table striped hover size="sm"  {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cellRender(cell)}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </Table>
  </>
  )
}

const  BmiTable = (props) => {
  const { data } = props;
  const columns = React.useMemo(
    () => [
          {
            Header: 'Age',
            accessor: 'age',
          },
          {
            Header: 'Gender',
            accessor: 'gender',
          },
          {
            Header: 'Height',
            accessor: 'height',
          },
          {
            Header: 'Weight',
            accessor: 'weight',
          },
          {
            Header: 'BMI',
            accessor: 'bmic',
          },
          {
            Header: 'Date Time',
            accessor: 'date_time',
          },
          {
            Header: 'Delete',
            accessor: 'id',
          }  
        ], []
  );

 return (
     <Tabela columns={columns} data={data} />
  )
}

export default BmiTable;
