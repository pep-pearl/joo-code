export interface AppDialogPropMap {}

export type * from './types';

export { default as ConfirmAlertDialog } from './ConfirmAlertDialog';
export { default as DialogProvider } from './DialogProvider';
export { default as DialogPanel } from './panel';
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
} from './presets';

export { useConfirmAlertDialogStore, useDialogStore } from './stores';
