import React, { useState } from 'react'
import { Dialog, Button, Grid } from '@material-ui/core'
import PropTypes from 'prop-types'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'
import moment from 'moment'
import MomentUtils from '@date-io/moment'
import 'moment/locale/pt-br'

moment.locale('pt-br')

export default function DateDialog({ onClose, value, open }) {
  const [date, setDate] = useState(value)

  return (
    <Dialog
      onClose={() => onClose(value)}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <KeyboardDatePicker
          format="MMMM"
          variant="static"
          views={['month', 'year']}
          openTo="month"
          id="date-picker"
          label="Selecione uma data"
          value={date}
          onChange={setDate}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </MuiPickersUtilsProvider>
      <Grid container justify="space-around">
        <Button
          style={{ width: '50%' }}
          size="large"
          onClick={() => onClose(value)}
        >
          Cancel
        </Button>
        <Button
          style={{ width: '50%' }}
          size="large"
          onClick={() => onClose(date)}
        >
          Ok
        </Button>
      </Grid>
    </Dialog>
  )
}

DateDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
}
