type FormControlElement = HTMLInputElement | HTMLTextAreaElement;
interface InputProps {
  value?: string;
  placeholder?: string;
  onChange?: React.ChangeEventHandler<FormControlElement>;
  ref?: any;
}

const Input = (props: InputProps) => {
  const { placeholder, value, onChange, ref, ...rest } = { ...props };

  return (
    <div>
      <input value={value ?? ''} placeholder={placeholder} onChange={onChange} ref={ref} {...rest} />
    </div>
  );
};

export default Input;
