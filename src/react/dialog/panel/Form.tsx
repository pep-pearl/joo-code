import clsx from 'clsx';

const Form: React.FC<React.FormHTMLAttributes<HTMLFormElement>> = ({ children, className, ...props }) => {
  return (
    <form
      className={clsx(
        'mt-4 [&_td:has(:is(input,select,textarea,button))]:p-2 [&_td_input:not(.none-style),&_td_button:not(.none-style)]:w-full',
        className,
      )}
      {...props}
    >
      {children}
    </form>
  );
};

export default Form;
