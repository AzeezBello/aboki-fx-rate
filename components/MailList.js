import React from 'react'
import { Button, Modal } from 'semantic-ui-react'
import MailchimpForm from './MailchimpForm'

const MailList = () => <Modal basic size='small' centered={false} defaultOpen>
  <Modal.Content>
    <MailchimpForm />
  </Modal.Content>
</Modal>;

export default MailList;

