import { PropsWithChildren, useState } from 'react';

import { findOnTree, splitParent } from '@/lib/utils/fs-utils';

import { DEFAULT_FILE_SYSTEM } from './default-file-system';
import { File } from './file';
import { FSContext } from './fs-context';

export function FSProvider({ children }: PropsWithChildren) {
  const [root, setRoot] = useState<File>(DEFAULT_FILE_SYSTEM);

  const updateRoot = () => {
    setRoot({ ...root });
  };

  const get = (path: string) => {
    const element = findOnTree(path, root);
    if (!element) throw new Error('No such file or directory: ' + path);
    return element;
  };

  const copy = (path: string, target: string) => {
    const file = get(path);
    const parent = get(target);
    const copyFile = {
      ...file,
      path: splitParent(path)[0],
    };
    parent.children?.push(copyFile);
    updateRoot();
    return copyFile;
  };

  const list = (path: string) => {
    const parent = get(path);
    if (parent.type !== 'directory' || !parent.children) {
      throw new Error(path + " isn't a directory.");
    }

    return parent.children;
  };

  const listDirs = (path: string) => {
    return list(path).filter((f) => f.type == 'directory');
  };

  const listFiles = (path: string) => {
    return list(path).filter((f) => f.type == 'file' || f.type == 'executable');
  };

  const mkDir = (path: string) => {
    const parts = path.split('\\');
    const name = parts.pop();
    const parentPath = parts.join('\\');
    const parent = get(parentPath);
    const dir: File = {
      children: [],
      name: name || 'new_directory',
      type: 'directory',
    };
    parent.children?.push(dir);
    updateRoot();
    return dir;
  };

  const mkFile = (path: string, content?: string) => {
    const [parentPath, name] = splitParent(path);
    const parent = get(parentPath);
    const dir: File = {
      children: [],
      name: name || 'new_file',
      type: 'file',
      content,
    };
    parent.children?.push(dir);
    updateRoot();
    return dir;
  };

  const move = (path: string, target: string) => {
    const file = get(path);
    const [parentPath, name] = splitParent(path);
    const oldParent = get(parentPath);
    oldParent.children?.filter((c) => c.name != name);

    const newParent = get(target);
    newParent.children?.push(file);
    updateRoot();
    return file;
  };

  const remove = (path: string) => {
    const file = get(path);
    const [parentPath, name] = splitParent(path);
    const parent = get(parentPath);
    const children = parent.children?.filter((c) => c.name != name);
    parent.children = children;
    updateRoot();
    return file;
  };

  const rename = (path: string, newName: string) => {
    const file = get(path);
    file.name = newName;
    updateRoot();
    return file;
  };

  const writeFile = (path: string, content: string) => {
    const file = get(path);
    file.content = content;
    updateRoot();
    return file;
  };

  return (
    <FSContext.Provider
      value={{
        get,
        copy,
        list,
        listDirs,
        listFiles,
        mkDir,
        mkFile,
        move,
        remove,
        rename,
        root,
        writeFile,
      }}
    >
      {children}
    </FSContext.Provider>
  );
}
