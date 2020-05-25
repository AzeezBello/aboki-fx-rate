import React from 'react'
import {
    Input,
    Header,
    Form,
    Button
} from 'semantic-ui-react'
import MailchimpSubscribe from "react-mailchimp-subscribe"

const url = "//xxxx.us13.list-manage.com/subscribe/post?u=zefzefzef&id=fnfgn";

const SubscriptionForm = ({ status, message, onValidated }) => {
    let email, name;
    const submit = () =>
    email &&
    name &&
    email.value.indexOf("@") > -1 &&
    onValidated({
    EMAIL: email.value,
    NAME: name.value
    });

    const handleChange = (event, data) => {}

  
    return (
        <Form size='big'>
        <Header content="join our mailing list to stay up to date on current currency exchange rate and news." style={{textAlign:'center', fontWeight: 'bolder', marginTop: '10%', color:'#fff'}} />
          <Form.Group widths='equal'>
              <Form.Field
                  control={Input}
                  input={{id: 'email'}}
                  label={{ children: 'Email', htmlFor: 'form-select-control-email', style:{color:'#fff'} }}
                  placeholder={'Email'}
                  fluid
                  width='eight'
                  onChange={handleChange}
              />
              <Form.Field
                  control={Input}
                  input={{id: 'name'}}
                  label={{ children: 'Name', htmlFor: 'form-select-control-name', style:{color:'#fff'} }}
                  placeholder={'Name'}
                  fluid
                  width='eight'
                  onChange={handleChange}
              />
              </Form.Group>
                <Button color='orange' onClick={submit} type='submit'>Submit</Button>
              </Form>
    );
  };
 

export default () => (
    <MailchimpSubscribe
      url={url}
      render={({ subscribe, status, message }) => (
        <div>
          <SubscriptionForm onSubmitted={formData => subscribe(formData)} />
          {status === "sending" && <div style={{ color: "blue" }}>sending...</div>}
          {status === "error" && <div style={{ color: "red" }} dangerouslySetInnerHTML={{__html: message}}/>}
          {status === "success" && <div style={{ color: "green" }}>Subscribed !</div>}
        </div>
      )}
    />
  )