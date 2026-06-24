import { FormProvider, type FieldValues, type UseFormReturn } from 'react-hook-form';
import Form from './Form';

type FormWithProviderProps<T extends FieldValues> = React.FormHTMLAttributes<HTMLFormElement> & {
  methods: UseFormReturn<T>;
};

const FormWithProvider = <T extends FieldValues>({
  methods,
  className,
  children,
  ...props
}: FormWithProviderProps<T>) => {
  return (
    <FormProvider {...methods}>
      <Form className={className} {...props}>
        {children}
      </Form>
    </FormProvider>
  );
};

export default FormWithProvider;
