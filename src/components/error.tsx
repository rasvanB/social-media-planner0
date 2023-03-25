type Props = {
  message: string;
};

const Error = ({ message }: Props) => {
  return (
    <div className="flex items-center rounded-md py-1 text-sm font-medium text-red-700">
      <span>{message}</span>
    </div>
  );
};

export default Error;
