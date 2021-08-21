import React from 'react'
import { useTable } from 'react-table'

function Table({ columns, data }) {
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

  return (
    <table {...getTableProps()}>
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
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

const  BmiTable = (props) => {
  const { data } = props;
  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        columns: [
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
            accessor: 'bmi',
          },
        ],
      },
    ],
    []
  )

 return (
   <div>
     <h1>BMI Table</h1>
       <Table columns={columns} data={data} />
   </div>
  )
}

export default BmiTable;
