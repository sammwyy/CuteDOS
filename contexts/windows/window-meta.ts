import React from 'react';

export interface WindowMeta {
  id: string;
  title: string;
  icon: string;
  canClose: boolean;
  canMinimize: boolean;
  canMaximize: boolean;
  focused: boolean;
  x: number;
  y: number;
  width: number;
  height: number;
  component: React.ReactNode;
}

export type WindowMetaCreateOpts = Omit<Partial<WindowMeta>, 'component'>;
