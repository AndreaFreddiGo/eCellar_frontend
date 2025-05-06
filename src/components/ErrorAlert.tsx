import { Alert } from 'react-bootstrap'

// This component is used to display error messages in the application
// It takes a message prop and displays it in a Bootstrap alert component
interface ErrorAlertProps {
  message: string
}

// This functional component takes a message prop and returns a Bootstrap alert component
// It uses the Alert component from react-bootstrap to display the error message
const ErrorAlert = (props: ErrorAlertProps) => {
  return <Alert variant="danger">{props.message}</Alert>
}

export default ErrorAlert
