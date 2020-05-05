import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

export default function AddEmployeeDialog({ open, onClose }) {
  const [name, setName] = useState(undefined)
  const buttonRef = React.createRef()

  const handleSubmit = (e) => {
    e.preventDefault()
    setName(undefined)
    onClose(name)
  }

  // Validators
  const validateValue = () => (!name ? `Nome é obrigatório!` : undefined)

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
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose()} color="primary">
          Cancelar
        </Button>
        <Button
          ref={buttonRef}
          disabled={name === '' || name === undefined}
          onClick={handleSubmit}
          color="primary"
        >
          Cadastrar
        </Button>
      </DialogActions>
    </Dialog>
  )
}

AddEmployeeDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}
