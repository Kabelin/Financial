import React from 'react'
import PropTypes from 'prop-types'
import {
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Checkbox,
} from '@material-ui/core'

const headCellsEmployees = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Nome',
  },
  { id: 'balance', numeric: true, disablePadding: false, label: 'Saldo' },
  {
    id: 'createdAt',
    numeric: true,
    disablePadding: false,
    label: 'Data de criação',
  },
]

const headCellsHome = [
  {
    id: 'description',
    numeric: false,
    disablePadding: true,
    label: 'Descrição',
  },
  {
    id: 'employee',
    numeric: true,
    disablePadding: false,
    label: 'Funcionário',
  },
  { id: 'type', numeric: true, disablePadding: false, label: 'Tipo' },
  { id: 'value', numeric: true, disablePadding: false, label: 'Valor' },
  {
    id: 'createdAt',
    numeric: true,
    disablePadding: false,
    label: 'Data de criação',
  },
]

export default function EnhancedTableHead({
  classes,
  onSelectAllClick,
  order,
  component,
  orderBy,
  numSelected,
  rowCount,
  onRequestSort,
}) {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property)
  }
  const disabled = !(rowCount > 0)

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            disabled={disabled}
            style={numSelected > 0 ? { color: 'white' } : {}}
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {component === 'Employees' &&
          headCellsEmployees.map((headCell) => (
            <TableCell
              disabled={disabled}
              key={headCell.id}
              align={headCell.numeric ? 'right' : 'left'}
              padding={headCell.disablePadding ? 'none' : 'default'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                disabled={disabled}
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === 'desc'
                      ? 'sorted descending'
                      : 'sorted ascending'}
                  </span>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        {component === 'Home' &&
          headCellsHome.map((headCell) => (
            <TableCell
              disabled={disabled}
              key={headCell.id}
              align={headCell.numeric ? 'right' : 'left'}
              padding={headCell.disablePadding ? 'none' : 'default'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                disabled={disabled}
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === 'desc'
                      ? 'sorted descending'
                      : 'sorted ascending'}
                  </span>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
      </TableRow>
    </TableHead>
  )
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
  component: PropTypes.string.isRequired,
}
