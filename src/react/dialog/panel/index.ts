import Description from './Description';
import Form from './Form';
import FormWithProvider from './FormWithProvider';
import Title from './Title';
import Wrap from './Wrap';

export type DialogPanel = typeof Wrap & {
  Title: typeof Title;
  Description: typeof Description;
  Form: typeof Form;
  FormWithProvider: typeof FormWithProvider;
};

/**
 * 다이얼로그 패널
 */
const DialogPanel = Wrap as DialogPanel;
/**
 * 다이얼로그 패널 - 타이틀
 */
DialogPanel.Title = Title;
/**
 * 다이얼로그 패널 - 설명
 */
DialogPanel.Description = Description;
/**
 * 다이얼로그 패널 - form
 */
DialogPanel.Form = Form;
/**
 * 다이얼로그 패널 - form(FormProvider)
 */
DialogPanel.FormWithProvider = FormWithProvider;

export default DialogPanel;
