import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { lighten, makeStyles } from '@material-ui/core/styles'
import {
  Toolbar,
  Typography,
  IconButton,
  Tooltip,
  TextField,
} from '@material-ui/core'
import { MdPrint, MdToday, MdAddCircle, MdEdit } from 'react-icons/md'
import moment from 'moment'
import DateDialog from './DateDialog'
import AddEmployeeDialog from './AddEmployeeDialog'
import AddPostingDialog from './AddPostingDialog'
import 'moment/locale/pt-br'

moment.locale('pt-br')

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

export const EnhancedTableToolbar = ({
  numSelected,
  selected,
  rows,
  auxDate,
  setData,
  setCount,
  setLoading,
  getData,
  handleNewEmployee,
  handleNewPosting,
  component,
}) => {
  const [date, setDate] = React.useState(auxDate)
  const [openDate, setOpenDate] = React.useState(false)
  const [openAddEmployee, setOpenAddEmployee] = React.useState(false)
  const [openAddPosting, setOpenAddPosting] = React.useState(false)

  const handleOpenDate = () => {
    setOpenDate(true)
  }

  const handleCloseDate = (value) => {
    setOpenDate(false)
    if (moment(value).format() !== date) {
      setLoading(true)
      setDate(value)
      getData(value)
    }
  }

  const handleOpenAddEmployee = () => {
    setOpenAddEmployee(true)
  }

  const handleCloseAddEmployee = (value) => {
    if (value) setLoading(true)
    setOpenAddEmployee(false)
    return value ? handleNewEmployee(value) : ''
  }

  const handleOpenAddPosting = () => {
    setOpenAddPosting(true)
  }

  const handleCloseAddPosting = (value) => {
    if (value) setLoading(true)
    setOpenAddPosting(false)
    return value ? handleNewPosting(value) : ''
  }

  const keys =
    component === 'Home'
      ? ['description', 'type', 'value', 'createdAt']
      : ['name', 'balance', 'createdAt']

  const fix = (value) => {
    return value
      .toString()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '')
      .trim()
      .toLowerCase()
  }

  const handleSetData = (value) => {
    setLoading(true)
    const filteredData = rows.filter((e) =>
      keys.find((k) =>
        k === 'createdAt'
          ? fix(moment(e[k]).format('DD/MM/YYYY')).includes(
              fix(value.target.value)
            )
          : fix(e[k]).includes(fix(value.target.value))
      )
    )
    setData(filteredData)
    setCount(filteredData.length)
    setLoading(false)
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
          {component === 'Home' &&
            `Balancete de ${moment(date).format('MMMM')}`}
          {component === 'Employees' && `Lista de funcionários`}
        </Typography>
      )}

      {numSelected > 0 ? (
        <>
          {numSelected === 1 && component === 'Employees' && (
            <Tooltip placement="top" title="Edit">
              <IconButton
                style={{ margin: '14px 10px 14px' }}
                onClick={() => {}}
                aria-label="edit"
              >
                <MdEdit />
              </IconButton>
            </Tooltip>
          )}
          <Tooltip placement="top" title="Print">
            <IconButton
              style={{ margin: '14px 0' }}
              onClick={handlePrint}
              aria-label="print"
            >
              <MdPrint />
            </IconButton>
          </Tooltip>
        </>
      ) : (
        <>
          <TextField
            onChange={handleSetData}
            id="standard-basic"
            variant="outlined"
            style={{ margin: '10px 10px 10px 0' }}
            label="Pesquisar"
          />
          {component === 'Home' && (
            <>
              <Tooltip placement="top" title="Date">
                <IconButton onClick={handleOpenDate} aria-label="change date">
                  <MdToday />
                </IconButton>
              </Tooltip>
              <Tooltip placement="top" title="Add">
                <IconButton
                  onClick={handleOpenAddPosting}
                  aria-label="change date"
                >
                  <MdAddCircle />
                </IconButton>
              </Tooltip>
            </>
          )}
          {component === 'Employees' && (
            <Tooltip placement="top" title="Add">
              <IconButton
                onClick={handleOpenAddEmployee}
                aria-label="change date"
              >
                <MdAddCircle />
              </IconButton>
            </Tooltip>
          )}

          <AddEmployeeDialog
            open={openAddEmployee}
            onClose={handleCloseAddEmployee}
          />
          <AddPostingDialog
            open={openAddPosting}
            onClose={handleCloseAddPosting}
          />
          <DateDialog
            value={moment(date).format()}
            open={openDate}
            onClose={handleCloseDate}
          />
        </>
      )}
    </Toolbar>
  )
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  component: PropTypes.string.isRequired,
  auxDate: PropTypes.string.isRequired,
  selected: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  setData: PropTypes.func.isRequired,
  setCount: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
  getData: PropTypes.func.isRequired,
  handleNewEmployee: PropTypes.func.isRequired,
  handleNewPosting: PropTypes.func.isRequired,
}
