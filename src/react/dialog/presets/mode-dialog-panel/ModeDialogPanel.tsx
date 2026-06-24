import type { FieldValues, UseFormReturn } from 'react-hook-form';
import DialogPanel from '../../panel';
import { BOTTOM_MODE_MAP } from './constants';
import type { BottomConfig, BottomConfigs } from './types';

interface ModeDialogPanelProps<M extends string = string, T extends FieldValues = FieldValues> {
  title?: string;
  form?: {
    methods: UseFormReturn<T>;
    submit?: (e?: React.BaseSyntheticEvent) => Promise<void>;
  };
  className?: string;
  mode: M;
  bottomConfigs?: BottomConfigs<M>;
  children: React.ReactNode;
}

const ModeDialogPanel = <M extends string = string, T extends FieldValues = FieldValues>({
  mode,
  bottomConfigs,
  children,
  title,
  className,
  form,
}: ModeDialogPanelProps<M, T>) => {
  const titleNode = title && <DialogPanel.Title>{title}</DialogPanel.Title>;

  const bottomNode = bottomConfigs && (
    <div className="mt-6 flex justify-end gap-2">
      {bottomConfigs[mode].map(({ key, ...props }) => {
        const Comp = BOTTOM_MODE_MAP[key];
        return <Comp key={key} {...props} />;
      })}
    </div>
  );

  if (form) {
    const { methods, submit } = form;
    return (
      <DialogPanel className={className}>
        {titleNode}
        <DialogPanel.FormWithProvider methods={methods} onSubmit={submit}>
          {children}
          {bottomNode}
        </DialogPanel.FormWithProvider>
      </DialogPanel>
    );
  }

  return (
    <DialogPanel className={className}>
      {titleNode}
      {children}
      {bottomNode}
    </DialogPanel>
  );
};

export default ModeDialogPanel;
