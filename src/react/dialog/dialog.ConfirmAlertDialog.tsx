import { CancelLineMutedButton, CheckCircleLineButton } from '@dmp/ui';
import DialogPanel from './dialog.Panel';
import type {
  ConfirmAlertButtonSlotProps,
  ConfirmAlertDialogProps,
  ConfirmAlertDialogUI,
  ConfirmAlertPanelSlotProps,
  ConfirmAlertTextSlotProps,
  DialogActionHandler,
} from './dialog.types';

const DefaultPanel: React.FC<ConfirmAlertPanelSlotProps> = ({ children, className, onClose }) => {
  return (
    <DialogPanel className={className} onClose={onClose}>
      {children}
    </DialogPanel>
  );
};

const DefaultTitle: React.FC<ConfirmAlertTextSlotProps> = ({ children, className }) => {
  if (!children) return null;
  return <DialogPanel.Title className={className}>{children}</DialogPanel.Title>;
};

const DefaultDescription: React.FC<ConfirmAlertTextSlotProps> = ({ children, className }) => {
  if (!children) return null;
  return (
    <DialogPanel.Description as="div" className={className}>
      {children}
    </DialogPanel.Description>
  );
};

const DefaultActions: React.FC<{ children?: React.ReactNode; className?: string }> = ({ children, className }) => {
  return <div className={className ?? 'flex justify-end mt-6 gap-1'}>{children}</div>;
};

const DefaultCancelButton: React.FC<ConfirmAlertButtonSlotProps> = ({ children, ...props }) => {
  return <CancelLineMutedButton {...props}>{children}</CancelLineMutedButton>;
};

const DefaultOkButton: React.FC<ConfirmAlertButtonSlotProps> = ({ children, ...props }) => {
  return <CheckCircleLineButton {...props}>{children}</CheckCircleLineButton>;
};

const mergeUi = (providerUi?: ConfirmAlertDialogUI, propsUi?: ConfirmAlertDialogUI): ConfirmAlertDialogUI => ({
  ...providerUi,
  ...propsUi,
});

interface ConfirmAlertDialogComponentProps {
  props: ConfirmAlertDialogProps;
  ui?: ConfirmAlertDialogUI;
}

/**
 * Confirm/Alert 다이얼로그
 * - `type` 필드의 'alert' | 'confirm' 구분
 * - ui 슬롯을 외부에서 주입할 수 있고, 없으면 기본 UI를 사용한다.
 */
const ConfirmAlertDialog: React.FC<ConfirmAlertDialogComponentProps> = ({ props, ui: providerUi }) => {
  const { type, title, description, onOk, okText = '확인', close } = props;
  const isConfirm = type === 'confirm';
  const cancelText = isConfirm ? props.cancelText ?? '취소' : undefined;
  const onCancel = isConfirm ? props.onCancel : undefined;

  const ui = mergeUi(providerUi, props.ui);
  const Panel = ui.Panel ?? DefaultPanel;
  const Title = ui.Title ?? DefaultTitle;
  const Description = ui.Description ?? DefaultDescription;
  const Actions = ui.Actions ?? DefaultActions;
  const OkButton = ui.OkButton ?? DefaultOkButton;
  const CancelButton = ui.CancelButton ?? DefaultCancelButton;

  const cancel = () => {
    onCancel?.();
    if (!isConfirm) close();
  };

  const ok: DialogActionHandler = e => {
    e?.stopPropagation();
    e?.preventDefault();
    onOk?.();
  };

  const customBody = props.type === 'confirm' ? props.customBody?.(ok, cancel) : props.customBody?.(ok);
  const hasCustomBody = !!props.customBody;

  return (
    <Panel className="z-[100]" onClose={close}>
      <Title>{title}</Title>
      <Description>{description}</Description>

      {customBody}

      {!hasCustomBody && (
        <Actions>
          {isConfirm && (
            <CancelButton type="button" onClick={cancel}>
              {cancelText}
            </CancelButton>
          )}
          <OkButton type="button" onClick={ok}>
            {okText}
          </OkButton>
        </Actions>
      )}
    </Panel>
  );
};

export default ConfirmAlertDialog;
