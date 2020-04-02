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
import { MdPrint, MdToday } from 'react-icons/md'
import moment from 'moment'
import DateDialog from './DateDialog'
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
  data,
  setData,
  setCount,
}) => {
  const [date, setDate] = React.useState(new Date('2014-03-18T21:11:54'))
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = (value) => {
    setOpen(false)
    setDate(value)
  }

  const keys = ['name', 'calories', 'fat', 'carbs', 'date']

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
    const filteredData = data.filter((e) =>
      keys.find((k) => fix(e[k]).includes(fix(value.target.value)))
    )
    setData(filteredData)
    setCount(filteredData.length)
    console.log(filteredData)
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
          Balancete de {moment(date).format('MMMM')}
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip placement="top" title="Print">
          <IconButton
            style={{ margin: '14px 0' }}
            onClick={handlePrint}
            aria-label="print"
          >
            <MdPrint />
          </IconButton>
        </Tooltip>
      ) : (
        <>
          <TextField
            onChange={handleSetData}
            id="standard-basic"
            variant="outlined"
            style={{ margin: '10px 10px 10px 0' }}
            label="Pesquisar"
          />
          <Tooltip placement="top" title="Date">
            <IconButton onClick={handleClickOpen} aria-label="change date">
              <MdToday />
            </IconButton>
          </Tooltip>

          <DateDialog value={date} open={open} onClose={handleClose} />
        </>
      )}
    </Toolbar>
  )
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  selected: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  setData: PropTypes.func.isRequired,
  setCount: PropTypes.func.isRequired,
}
