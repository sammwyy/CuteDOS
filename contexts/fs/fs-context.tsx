import { createContext } from 'react';

import { File } from './file';

export interface FSHook {
  root: File;

  get: (path: string) => File;
  list: (path: string) => File[];
  listDirs: (path: string) => File[];
  listFiles: (path: string) => File[];

  mkDir: (path: string) => File;
  mkFile: (path: string, content?: string) => File;

  rename: (path: string, name: string) => File;
  copy: (path: string, target: string) => File;
  move: (path: string, target: string) => File;
  remove: (path: string) => File;
  writeFile: (path: string, content: string) => File;
}

export const FSContext = createContext<FSHook>({
  get: () => {
    throw new Error('Not implemented yet. (get)');
  },
  copy: () => {
    throw new Error('Not implemented yet. (copy)');
  },
  list: () => {
    throw new Error('Not implemented yet. (list)');
  },
  listDirs: () => {
    throw new Error('Not implemented yet. (listDirs)');
  },
  listFiles: () => {
    throw new Error('Not implemented yet. (listFiles)');
  },
  mkDir: () => {
    throw new Error('Not implemented yet. (mkDir)');
  },
  mkFile: () => {
    throw new Error('Not implemented yet. (mkFile)');
  },
  move: () => {
    throw new Error('Not implemented yet. (move)');
  },
  remove: () => {
    throw new Error('Not implemented yet. (remove)');
  },
  rename: () => {
    throw new Error('Not implemented yet. (rename)');
  },
  root: {
    children: [],
    name: '',
    path: '',
    type: 'directory',
  },
  writeFile: () => {
    throw new Error('Not implemented yet. (writeFile)');
  },
});
