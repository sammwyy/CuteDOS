import { PropsWithChildren, ReactNode, useState } from 'react';

import { randomString } from '@/lib/utils/random-utils';

import { WindowMeta, WindowMetaCreateOpts } from './window-meta';
import { WindowsContext } from './windows-context';

const log = (...args: any[]) => {
  console.log('CuteDOS', '[WindowsManager]', ...args);
};

export function WindowsProvider({ children }: PropsWithChildren) {
  const [windows, setWindows] = useState<WindowMeta[]>([]);
  const [minimizedWindows, setMinimizedWindows] = useState<string[]>([]);
  const [focusedWindow, setFocusedWindow] = useState<string | null>(null);
  const [focusedZIndex, setFocusedZIndex] = useState(0);

  const findWindow = (id: string) => {
    return windows.find((w) => w.id == id);
  };

  const minimizeWindow = (id: string) => {
    log('Minimizing window:', id);
    const list = [...minimizedWindows].filter((w) => w != id);
    list.push(id);
    setMinimizedWindows(list);
  };

  const restoreWindow = (id: string) => {
    log('Restoring window:', id);
    const list = [...minimizedWindows].filter((w) => w != id);
    setMinimizedWindows(list);
  };

  const isWindowMinimized = (id: string) => {
    return minimizedWindows.find((w) => w === id) != null;
  };

  const unfocusWindow = () => {
    log('Unfocus current focused window');
    setFocusedWindow(null);
  };

  const focusWindow = (windowId: string) => {
    log('Focused window', windowId);
    setFocusedWindow(windowId);
    setFocusedZIndex(focusedZIndex + 1);
  };

  const closeWindow = (windowId: string) => {
    log('Closing window', windowId);
    setWindows([...windows].filter((win) => win.id != windowId));
  };

  const createWindow = (
    component: ReactNode,
    opts: WindowMetaCreateOpts = {},
  ) => {
    const meta: WindowMeta = {
      id: opts.id || randomString(32),
      canClose: opts.canClose || true,
      canMaximize: opts.canMaximize || true,
      canMinimize: opts.canMinimize || true,
      focused: opts.focused || true,
      height: opts.height || 400,
      width: opts.width || 600,
      x: opts.x || 0,
      y: opts.y || 0,
      icon: opts.icon || '/icons/apps/default.png',
      title: opts.title || 'Untitled Window',
      component,
    };
    log('Created window', meta.id, `(${meta.title})`);
    if (meta.focused) focusWindow(meta.id);
    setWindows([...windows, meta]);
  };

  return (
    <WindowsContext.Provider
      value={{
        closeWindow,
        createWindow,
        focusWindow,
        unfocusWindow,
        findWindow,
        minimizeWindow,
        restoreWindow,
        isWindowMinimized,
        focusedZIndex,
        windows,
        minimizedWindows,
        focusedWindow,
      }}
    >
      {children}
    </WindowsContext.Provider>
  );
}
