import React from 'react';

import { WindowMeta, WindowMetaCreateOpts } from './window-meta';

export interface WindowsHook {
  windows: WindowMeta[];
  minimizedWindows: string[];
  focusedWindow?: string | null;
  focusedZIndex: number;
  createWindow: (
    content: React.ReactNode,
    meta?: WindowMetaCreateOpts,
  ) => unknown;
  minimizeWindow: (id: string) => unknown;
  restoreWindow: (id: string) => unknown;
  isWindowMinimized: (id: string) => unknown;
  closeWindow: (id: string) => unknown;
  focusWindow: (id: string) => unknown;
  unfocusWindow: () => unknown;
  findWindow: (id: string) => WindowMeta | null | undefined;
}

export const WindowsContext = React.createContext<WindowsHook>({
  windows: [],
  minimizedWindows: [],
  focusedWindow: null,
  focusedZIndex: 0,
  createWindow: () => {
    throw new Error('Not implemented yet. (createWindow)');
  },
  minimizeWindow: () => {
    throw new Error('Not implemented yet. (minimizeWindow)');
  },
  restoreWindow: () => {
    throw new Error('Not implemented yet. (restoreWindow)');
  },
  isWindowMinimized: () => {
    throw new Error('Not implemented yet. (isWindowMinimized)');
  },
  closeWindow: () => {
    throw new Error('Not implemented yet. (closeWindow)');
  },
  focusWindow: () => {
    throw new Error('Not implemented yet. (focusWindow)');
  },
  unfocusWindow: () => {
    throw new Error('Not implemented yet. (unfocusWindow)');
  },
  findWindow: () => {
    throw new Error('Not implemented yet. (findWindow)');
  },
});
