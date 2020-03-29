import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { lighten, makeStyles } from '@material-ui/core/styles'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Typography,
  Paper,
  Checkbox,
  IconButton,
  Tooltip,
  Grid,
} from '@material-ui/core'
import { MdPrint, MdFilterList } from 'react-icons/md'
import moment from 'moment'
import MomentUtils from '@date-io/moment'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'
import 'moment/locale/pt-br'

import { Container, Header } from './styles'

moment.locale('pt-br')

function createData(name, calories, fat, carbs, date) {
  return { name, calories, fat, carbs, date }
}

const rows = [
  createData(
    'Cupcake',
    305,
    3.7,
    67,
    new Intl.DateTimeFormat('pt-BR').format(new Date('2014-08-18T21:11:54'))
  ),
  createData(
    'Donut',
    452,
    25.0,
    51,
    new Intl.DateTimeFormat('pt-BR').format(new Date('2014-08-18T21:11:54'))
  ),
  createData(
    'Eclair',
    262,
    16.0,
    24,
    new Intl.DateTimeFormat('pt-BR').format(new Date('2019-08-18T21:11:54'))
  ),
  createData(
    'Frozen yoghurt',
    159,
    6.0,
    24,
    new Intl.DateTimeFormat('pt-BR').format(new Date('2012-08-18T21:11:54'))
  ),
  createData(
    'Gingerbread',
    356,
    16.0,
    49,
    new Intl.DateTimeFormat('pt-BR').format(new Date('2017-08-18T21:11:54'))
  ),
  createData(
    'Honeycomb',
    408,
    3.2,
    87,
    new Intl.DateTimeFormat('pt-BR').format(new Date('2014-08-18T21:11:54'))
  ),
  createData(
    'Ice cream sandwich',
    237,
    9.0,
    37,
    new Intl.DateTimeFormat('pt-BR').format(new Date('2012-08-18T21:11:54'))
  ),
  createData(
    'Jelly Bean',
    375,
    0.0,
    94,
    new Intl.DateTimeFormat('pt-BR').format(new Date('2011-08-18T21:11:54'))
  ),
  createData(
    'KitKat',
    518,
    26.0,
    65,
    new Intl.DateTimeFormat('pt-BR').format(new Date('2016-08-18T21:11:54'))
  ),
  createData(
    'Lollipop',
    392,
    0.2,
    98,
    new Intl.DateTimeFormat('pt-BR').format(new Date('2011-08-18T21:11:54'))
  ),
  createData(
    'Marshmallow',
    318,
    0,
    81,
    new Intl.DateTimeFormat('pt-BR').format(new Date('2013-08-18T21:11:54'))
  ),
  createData(
    'Nougat',
    360,
    19.0,
    9,
    new Intl.DateTimeFormat('pt-BR').format(new Date('2014-08-18T21:11:54'))
  ),
  createData(
    'Oreo',
    437,
    18.0,
    63,
    new Intl.DateTimeFormat('pt-BR').format(new Date('2016-08-18T21:11:54'))
  ),
]

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })
  return stabilizedThis.map((el) => el[0])
}

const headCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Dessert (100g serving)',
  },
  { id: 'calories', numeric: true, disablePadding: false, label: 'Calories' },
  { id: 'fat', numeric: true, disablePadding: false, label: 'Fat (g)' },
  { id: 'carbs', numeric: true, disablePadding: false, label: 'Carbs (g)' },
  { id: 'date', numeric: true, disablePadding: false, label: 'Date' },
]

function EnhancedTableHead(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            style={numSelected > 0 ? { color: 'white' } : {}}
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
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
}

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
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
  title: {
    flex: '1 1 100%',
  },
}))

const EnhancedTableToolbar = ({ numSelected, selected }) => {
  const [selectedDate, setSelectedDate] = React.useState(
    new Date('2014-03-18T21:11:54')
  )

  const handleDateChange = (date) => {
    setSelectedDate(date)
  }
  const classes = useToolbarStyles()

  function handlePrint() {
    console.log(selected)
  }

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected > 1
            ? `${numSelected} selecionados`
            : `${numSelected} selecionado`}
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Balancete de {moment(selectedDate).format('MMMM')}
        </Typography>
      )}
      {numSelected === 0 && (
        <Grid container>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <KeyboardDatePicker
              autoOk
              disableToolbar
              format="DD/MM/YYYY"
              variant="inline"
              margin="normal"
              views={['year', 'month']}
              id="date-picker"
              label="Selecione uma data"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>
        </Grid>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Print">
          <IconButton onClick={handlePrint} aria-label="print">
            <MdPrint />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <MdFilterList />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  )
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  selected: PropTypes.array.isRequired,
}

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

export default function EnhancedTable() {
  const classes = useStyles()
  const [order, setOrder] = React.useState('asc')
  const [orderBy, setOrderBy] = React.useState('')
  const [selected, setSelected] = React.useState([])
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)

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
    <Container>
      <Header>Home</Header>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          selected={selected}
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
              {stableSort(rows, getComparator(order, orderBy))
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
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.calories}</TableCell>
                      <TableCell align="right">{row.fat}</TableCell>
                      <TableCell align="right">{row.carbs}</TableCell>
                      <TableCell align="right">{row.date}</TableCell>
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
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </Container>
  )
}
