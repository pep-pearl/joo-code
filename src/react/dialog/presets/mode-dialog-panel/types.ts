import type { BOTTOM_MODE_MAP } from './constants';

export interface ButtonProps {
  type?: 'button' | 'submit';
  title?: string;
  clickCb?: () => void;
  close?: boolean;
}

export interface BottomConfig extends ButtonProps {
  key: keyof typeof BOTTOM_MODE_MAP;
}

export type BottomConfigs<M extends string> = Record<M, BottomConfig[]>;
