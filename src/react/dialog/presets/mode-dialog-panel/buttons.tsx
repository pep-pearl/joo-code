import { Button } from '../../../../ui/Button';
import { useDialogStore } from '../../stores';
import type { ButtonProps } from './types';

const EditButton: React.FC<ButtonProps> = ({ type = 'button', title = '수정', clickCb, close }) => {
  const ensureClose = useDialogStore(s => s.close);
  return (
    <Button
      intent="primary"
      variant="outline"
      title={title}
      type={type}
      onClick={() => {
        clickCb?.();
        close && ensureClose();
      }}
    >
      {title}
    </Button>
  );
};

const DeleteButton: React.FC<ButtonProps> = ({ type = 'button', clickCb, title = '삭제', close }) => {
  const ensureClose = useDialogStore(s => s.close);
  return (
    <Button
      intent="danger"
      variant="solid"
      type={type}
      onClick={() => {
        clickCb?.();
        close && ensureClose();
      }}
    >
      {title}
    </Button>
  );
};

const SaveButton: React.FC<ButtonProps> = ({ type = 'submit', clickCb, title = '저장', close }) => {
  const ensureClose = useDialogStore(s => s.close);
  return (
    <Button
      intent="primary"
      variant="solid"
      title={title}
      type={type}
      onClick={() => {
        clickCb?.();
        close && ensureClose();
      }}
    >
      {title}
    </Button>
  );
};

const OkButton: React.FC<ButtonProps> = ({ type = 'submit', clickCb, title = '확인', close }) => {
  const ensureClose = useDialogStore(s => s.close);
  return (
    <Button
      intent="primary"
      variant="solid"
      title={title}
      type={type}
      onClick={() => {
        clickCb?.();
        close && ensureClose();
      }}
    >
      {title}
    </Button>
  );
};

const CancelButton: React.FC<ButtonProps> = ({ type = 'button', clickCb, title, close }) => {
  const ensureClose = useDialogStore(s => s.close);
  return (
    <Button
      intent="ghost"
      variant="outline"
      title={title}
      type={type}
      onClick={() => {
        clickCb?.();
        close && ensureClose();
      }}
    >
      {title}
    </Button>
  );
};

const RiskApplyButton: React.FC<ButtonProps> = ({ type = 'submit', clickCb, title = '위기단계 적용', close }) => {
  const ensureClose = useDialogStore(s => s.close);
  return (
    <Button
      intent="warning"
      variant="solid"
      title={title}
      type={type}
      onClick={() => {
        clickCb?.();
        close && ensureClose();
      }}
    >
      {title}
    </Button>
  );
};

export { CancelButton, DeleteButton, EditButton, OkButton, SaveButton, RiskApplyButton };
