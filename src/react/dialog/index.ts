export interface AppDialogPropMap {}

export type * from './dialog.types';

export { default as ConfirmAlertDialog } from './dialog.ConfirmAlertDialog';
export { default as DialogProvider } from './dialog.DialogProvider';
export { default as DialogPanel } from './dialog.Panel';
export {
  BOTTOM_MODE_MAP,
  CancelButton,
  DeleteButton,
  EditButton,
  ModeDialogPanel,
  OkButton,
  SaveButton,
  RiskApplyButton,
  type BottomConfig,
  type BottomConfigs,
  type ButtonProps,
} from './dialog.presets';

export { useConfirmAlertDialogStore, useDialogStore } from './dialog.stores';
