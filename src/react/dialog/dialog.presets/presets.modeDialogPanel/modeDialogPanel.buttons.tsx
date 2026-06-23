import {
  CancelLineMutedButton,
  CheckCircleLineButton,
  DeleteLineButton,
  EditLineButton,
  RiskStepApplyButton,
} from '@dmp/ui';
import { useDialogStore } from '../../dialog.stores';
import type { ButtonProps } from './modeDialogPanel.types';

const EditButton: React.FC<ButtonProps> = ({ type = 'button', title = '수정', clickCb, close }) => {
  const ensureClose = useDialogStore(s => s.close);
  return (
    <EditLineButton
      title={title}
      type={type}
      onClick={() => {
        clickCb?.();
        close && ensureClose();
      }}
    >
      {title}
    </EditLineButton>
  );
};

const DeleteButton: React.FC<ButtonProps> = ({ type = 'button', clickCb, title = '삭제', close }) => {
  const ensureClose = useDialogStore(s => s.close);
  return (
    <DeleteLineButton
      type={type}
      onClick={() => {
        clickCb?.();
        close && ensureClose();
      }}
    >
      {title}
    </DeleteLineButton>
  );
};

const SaveButton: React.FC<ButtonProps> = ({ type = 'submit', clickCb, title = '저장', close }) => {
  const ensureClose = useDialogStore(s => s.close);
  return (
    <CheckCircleLineButton
      title={title}
      type={type}
      onClick={() => {
        clickCb?.();
        close && ensureClose();
      }}
    >
      {title}
    </CheckCircleLineButton>
  );
};

const OkButton: React.FC<ButtonProps> = ({ type = 'submit', clickCb, title = '확인', close }) => {
  const ensureClose = useDialogStore(s => s.close);
  return (
    <CheckCircleLineButton
      title={title}
      type={type}
      onClick={() => {
        clickCb?.();
        close && ensureClose();
      }}
    >
      {title}
    </CheckCircleLineButton>
  );
};

const CancelButton: React.FC<ButtonProps> = ({ type = 'button', clickCb, title, close }) => {
  const ensureClose = useDialogStore(s => s.close);
  return (
    <CancelLineMutedButton
      title={title}
      type={type}
      onClick={() => {
        clickCb?.();
        close && ensureClose();
      }}
    >
      {title}
    </CancelLineMutedButton>
  );
};

const RiskApplyButton: React.FC<ButtonProps> = ({ type = 'submit', clickCb, title = '위기단계 적용', close }) => {
  const ensureClose = useDialogStore(s => s.close);
  return (
    <RiskStepApplyButton
      title={title}
      type={type}
      onClick={() => {
        clickCb?.();
        close && ensureClose();
      }}
    >
      {title}
    </RiskStepApplyButton>
  );
};

export { CancelButton, DeleteButton, EditButton, OkButton, SaveButton, RiskApplyButton };
