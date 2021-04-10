import React from 'react'
import Modal from '@material-ui/core/Modal'
import Paper from '@material-ui/core/Paper'

const AccountModal = ({ accountOpen, handleAccountClose }) => (
  <Modal
    open={accountOpen}
    onClose={handleAccountClose}
    className="modal"
  >
    <Paper className="modal-content" elevation={1}>
      <p>Here will be a registration/login form</p>
    </Paper>
  </Modal>
)

export default AccountModal