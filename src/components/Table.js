import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { lighten, makeStyles } from '@material-ui/core/styles'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TablePagination,
  Checkbox,
  Paper,
} from '@material-ui/core'
import EnhancedTableHead from './TableHead'
import { EnhancedTableToolbar } from './TableToolBar'
import getComparator from '../utils/getComparator'
import stableSort from '../utils/stableSort'

function createData(name, calories, fat, carbs, date) {
  return { name, calories, fat, carbs, date }
}

const rows = [
  createData(
    'Cupcáke',
    305,
    3.7,
    67,
    new Intl.DateTimeFormat('pt-BR').format(new Date('2014-08-06T21:11:54'))
  ),
  createData(
    'Donut',
    452,
    25.0,
    51,
    new Intl.DateTimeFormat('pt-BR').format(new Date('2014-08-07T21:11:54'))
  ),
  createData(
    'Eclair',
    262,
    16.0,
    24,
    new Intl.DateTimeFormat('pt-BR').format(new Date('2019-08-08T21:11:54'))
  ),
  createData(
    'Frozen yoghurt',
    159,
    6.0,
    24,
    new Intl.DateTimeFormat('pt-BR').format(new Date('2012-08-09T21:11:54'))
  ),
  createData(
    'Gingerbread',
    356,
    16.0,
    49,
    new Intl.DateTimeFormat('pt-BR').format(new Date('2017-08-10T21:11:54'))
  ),
  createData(
    'Honeycomb',
    408,
    3.2,
    87,
    new Intl.DateTimeFormat('pt-BR').format(new Date('2014-08-11T21:11:54'))
  ),
  createData(
    'Ice cream sandwich',
    237,
    9.0,
    37,
    new Intl.DateTimeFormat('pt-BR').format(new Date('2012-08-12T21:11:54'))
  ),
  createData(
    'Jelly Bean',
    375,
    0.0,
    94,
    new Intl.DateTimeFormat('pt-BR').format(new Date('2011-08-13T21:11:54'))
  ),
  createData(
    'KitKat',
    518,
    26.0,
    65,
    new Intl.DateTimeFormat('pt-BR').format(new Date('2016-08-14T21:11:54'))
  ),
  createData(
    'Lollipop',
    392,
    0.2,
    98,
    new Intl.DateTimeFormat('pt-BR').format(new Date('2011-08-15T21:11:54'))
  ),
  createData(
    'Marshmallow',
    318,
    0,
    81,
    new Intl.DateTimeFormat('pt-BR').format(new Date('2013-08-16T21:11:54'))
  ),
  createData(
    'Nougat',
    360,
    19.0,
    9,
    new Intl.DateTimeFormat('pt-BR').format(new Date('2014-08-17T21:11:54'))
  ),
  createData(
    'Oreo',
    437,
    18.0,
    63,
    new Intl.DateTimeFormat('pt-BR').format(new Date('2016-08-18T21:11:54'))
  ),
]
const useStyles = makeStyles((theme) => ({
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: `rgba(255,255,255,.1) !important`,
        },
}))

export default function EnhancedTable({ component }) {
  const classes = useStyles()
  const [order, setOrder] = React.useState('asc')
  const [orderBy, setOrderBy] = React.useState('')
  const [selected, setSelected] = React.useState([])
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const [data, setData] = React.useState(rows)
  const [count, setCount] = React.useState(rows.length)

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n)
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }

  const handleClick = (event, row) => {
    const selectedIndex = selected.indexOf(row)
    console.log(selectedIndex)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(
        selected,
        rows.find((f) => f === row)
      )
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
      console.log(newSelected)
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }

    setSelected(newSelected)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const isSelected = (row) => selected.indexOf(row) !== -1

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage)

  return (
    <Paper className={classes.paper}>
      <EnhancedTableToolbar
        numSelected={selected.length}
        selected={selected}
        data={rows}
        setData={setData}
        setCount={setCount}
      />
      <TableContainer>
        <Table
          className={classes.table}
          aria-labelledby="tableTitle"
          size="medium"
          aria-label="enhanced table"
        >
          <EnhancedTableHead
            classes={classes}
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
          />
          <TableBody>
            {stableSort(data, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const isItemSelected = isSelected(row)
                const labelId = `enhanced-table-checkbox-${index}`

                return (
                  <TableRow
                    hover
                    className={clsx({
                      [classes.highlight]: isItemSelected,
                    })}
                    onClick={(event) => handleClick(event, row)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.name}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        style={isItemSelected ? { color: 'white' } : {}}
                        checked={isItemSelected}
                        inputProps={{ 'aria-labelledby': labelId }}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      {row?.name}
                    </TableCell>
                    <TableCell align="right">{row?.calories}</TableCell>
                    <TableCell align="right">{row?.fat}</TableCell>
                    <TableCell align="right">{row?.carbs}</TableCell>
                    <TableCell align="right">{row?.date}</TableCell>
                  </TableRow>
                )
              })}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={rows.length >= 25 ? [5, 10, 25] : [5, 10]}
        component="div"
        count={count}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  )
}

EnhancedTable.propTypes = {
  component: PropTypes.string.isRequired,
}
