import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import NumberFormat from 'react-number-format'
import InputAdornment from '@material-ui/core/InputAdornment'
import CircularProgress from '@material-ui/core/CircularProgress'
import Autocomplete from '@material-ui/lab/Autocomplete'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import api from '../services/api'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      flexGrow: 1,
      margin: theme.spacing(1),
      width: 'calc(100% * (1/3))',
    },
  },
}))

const NumberFormatCustom = (props) => {
  const { inputRef, onChange, ...other } = props

  return (
    <NumberFormat
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            value: values.value,
          },
        })
      }}
      thousandSeparator="."
      decimalSeparator=","
      decimalScale={2}
      fixedDecimalScale
      isNumericString
    />
  )
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default function AddPostingDialog({ open, onClose }) {
  const [employee, setEmployee] = useState('')
  const [employees, setEmployees] = useState(undefined)
  const [description, setDescription] = useState(undefined)
  const [value, setValue] = useState(undefined)
  const [type, setType] = useState('')
  const [loading, setLoading] = useState(true)
  const buttonRef = React.createRef()

  const classes = useStyles()

  const handleSubmit = (e) => {
    e.preventDefault()

    const form = {
      employee,
      description,
      value,
      type,
    }

    onClose(form)
  }

  const getIndex = () => {
    api.get('employees/infos').then((res) => {
      setEmployees(res.data)
      setLoading(false)
    })
  }

  useEffect(() => getIndex(), [])

  // Validators
  const validateEmployee = () =>
    !employee ? `Funcionário é obrigatório!` : undefined

  const validateDescription = () =>
    !description ? `Descrição é obrigatória!` : undefined

  const validateValue = () => (!value ? `Valor é obrigatório!` : undefined)

  const validateType = () => (type === '' ? `Tipo é obrigatório!` : undefined)

  const validateForm = () => !(employee && description && value && type)

  return (
    <Dialog
      open={open}
      onClose={() => onClose()}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Novo lançamento</DialogTitle>
      <DialogContent>
        <DialogContentText style={{ textAlign: 'justify' }}>
          Para realizar um novo lançamento, por favor preencha o formulário com
          as informações corretas!
        </DialogContentText>
        {loading ? (
          <CircularProgress />
        ) : (
          <form className={classes.root} noValidate autoComplete="off">
            <Autocomplete
              id="employee-combo-box"
              options={employees}
              onChange={(e, newValue) => setEmployee(newValue)}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField
                  helperText={validateEmployee()}
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...params}
                  label="Funcionário"
                />
              )}
            />
            <TextField
              id="description"
              error={description === ''}
              helperText={validateDescription()}
              label="Descrição"
              onChange={(e) => setDescription(e.target.value)}
            />
            <TextField
              id="value"
              error={value === ''}
              helperText={validateValue()}
              label="Valor"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              InputProps={{
                inputComponent: NumberFormatCustom,
                startAdornment: (
                  <InputAdornment position="start">R$</InputAdornment>
                ),
              }}
            />
            <FormControl>
              <InputLabel id="type">Tipo</InputLabel>
              <Select
                id="select-type"
                labelId="select-type-label"
                onChange={(e) => setType(e.target.value)}
                value={type}
              >
                <MenuItem value="">Nenhum</MenuItem>
                <MenuItem value="credit">Crédito</MenuItem>
                <MenuItem value="debit">Débito</MenuItem>
              </Select>
              <FormHelperText>{validateType()}</FormHelperText>
            </FormControl>
          </form>
        )}

        {/* <TextField
          error={name === ''}
          helperText={validateValue()}
          autoFocus
          margin="dense"
          id="name"
          onKeyPress={(e) => {
            if (e.key === 'Enter') buttonRef.current.click()
          }}
          onChange={(e) => setName(e.target.value)}
          label="Nome"
          type="text"
          fullWidth
        /> */}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose()} color="primary">
          Cancelar
        </Button>
        <Button
          ref={buttonRef}
          disabled={validateForm()}
          onClick={handleSubmit}
          color="primary"
        >
          Cadastrar
        </Button>
      </DialogActions>
    </Dialog>
  )
}

AddPostingDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}
