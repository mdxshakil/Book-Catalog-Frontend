interface IProps {
  message: string;
}

const ErrorElement = ({ message }: IProps) => {
  return <small className="text-red-500">{message}</small>;
};

export default ErrorElement;
