import { CancelButton, DeleteButton, EditButton, OkButton, SaveButton } from './buttons';
import type { ButtonProps } from './types';

export const BOTTOM_MODE_MAP = {
  edit: (props: ButtonProps) => <EditButton {...props} />,
  delete: (props: ButtonProps) => <DeleteButton {...props} />,
  save: (props: ButtonProps) => <SaveButton {...props} />,
  ok: (props: ButtonProps) => <OkButton {...props} />,
  cancel: (props: ButtonProps) => <CancelButton {...props} />,
} as const;
