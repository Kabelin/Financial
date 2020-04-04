import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

export default function AddDialog({ open, onClose }) {
  const [email, setEmail] = useState(undefined)

  const handleSubmit = (e) => {
    e.preventDefault()
    setEmail(undefined)
    onClose({
      email,
    })
  }

  // Validators
  const validateEmail = () =>
    email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)
      ? 'E-mail inválido!'
      : undefined

  const validateValue = (value, name) =>
    !value ? `${name} é obrigatório!` : undefined

  const validateForm = () => validateEmail() !== undefined || !email

  return (
    <Dialog
      open={open}
      onClose={() => onClose()}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Cadastro de funcionários</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Para cadastrar, por favor preencha o formulário com as informações
          corretas!
        </DialogContentText>
        <TextField
          error={validateEmail() !== undefined}
          helperText={validateEmail() || validateValue(email, 'E-mail')}
          autoFocus
          margin="dense"
          id="name"
          onChange={(e) => setEmail(e.target.value)}
          label="Email Address"
          type="email"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose()} color="primary">
          Cancel
        </Button>
        <Button
          disabled={validateForm()}
          onClick={handleSubmit}
          color="primary"
        >
          Subscribe
        </Button>
      </DialogActions>
    </Dialog>
  )
}

AddDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}
