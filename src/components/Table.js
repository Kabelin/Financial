import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import CircularProgress from '@material-ui/core/CircularProgress'
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
import moment from 'moment'
import EnhancedTableHead from './TableHead'
import { EnhancedTableToolbar } from './TableToolBar'
import { LoadingContainer } from './styles/table'
import getComparator from '../utils/getComparator'
import stableSort from '../utils/stableSort'
import 'moment/locale/pt-br'

moment.locale('pt-br')

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

export default function EnhancedTable({
  component,
  rows,
  date,
  loading,
  setLoading,
  getData,
  handleNewEmployee,
  handleNewPosting,
}) {
  const classes = useStyles()
  const [order, setOrder] = React.useState('asc')
  const [orderBy, setOrderBy] = React.useState('')
  const [selected, setSelected] = React.useState([])
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const [data, setData] = React.useState([])
  const [count, setCount] = React.useState(rows.length)

  useEffect(() => setData(rows), [rows])

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = data.map((n) => n)
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }

  const handleClick = (event, row) => {
    const selectedIndex = selected.indexOf(row)
    console.log(selected, selected.indexOf(row), row)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(
        selected,
        data.find((f) => f === row)
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
    rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage)

  return (
    <Paper className={classes.paper}>
      <EnhancedTableToolbar
        numSelected={selected.length}
        selected={selected}
        data={data}
        handleNewEmployee={handleNewEmployee}
        handleNewPosting={handleNewPosting}
        auxDate={date}
        setLoading={setLoading}
        rows={rows}
        getData={getData}
        setData={setData}
        setCount={setCount}
        component={component}
      />
      <TableContainer>
        {loading ? (
          <LoadingContainer>
            <CircularProgress />
          </LoadingContainer>
        ) : (
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
              component={component}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {component === 'Employees' &&
                stableSort(data, getComparator(order, orderBy))
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
                        key={row.id}
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
                          {row.name}
                        </TableCell>
                        <TableCell align="right">
                          {new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                          }).format(row.balance)}
                        </TableCell>
                        <TableCell align="right">
                          {moment(row.createdAt).format('DD/MM/YYYY')}
                        </TableCell>
                      </TableRow>
                    )
                  })}
              {component === 'Home' &&
                stableSort(data, getComparator(order, orderBy))
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
                        key={row.id}
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
                          {row.description}
                        </TableCell>
                        <TableCell
                          align="right"
                          component="th"
                          id={labelId}
                          scope="row"
                        >
                          {row.type === 'credit' ? 'Crédito' : 'Débito'}
                        </TableCell>
                        <TableCell align="right">
                          {new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                          }).format(row.value)}
                        </TableCell>
                        <TableCell align="right">
                          {moment(row.createdAt).format('DD/MM/YYYY')}
                        </TableCell>
                      </TableRow>
                    )
                  })}
              {data.length === 0 && (
                <TableRow>
                  <TableCell
                    style={{ textAlign: 'center', height: 53 * emptyRows }}
                    colSpan={6}
                  >
                    Não há dados para serem listados
                  </TableCell>
                </TableRow>
              )}
              {emptyRows > 0 && data.length > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={data.length >= 25 ? [5, 10, 25] : [5, 10]}
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
  date: PropTypes.string,
  rows: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  setLoading: PropTypes.func.isRequired,
  getData: PropTypes.func.isRequired,
  handleNewEmployee: PropTypes.func,
  handleNewPosting: PropTypes.func,
}

EnhancedTable.defaultProps = {
  handleNewEmployee: () => {},
  handleNewPosting: () => {},
  date: '',
}
