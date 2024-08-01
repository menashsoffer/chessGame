interface Props {
  err: string;
}

const ErrorMessage = ({ err }: Props) => {
  return (
    <div className="error-message">
      <p>{err}</p>
    </div>
  );
};

export default ErrorMessage;
