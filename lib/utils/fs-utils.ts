import { File } from '@/contexts/fs/file';

export function splitParent(path: string) {
  const parts = path.split('\\');
  const name = parts.pop() as string;
  const parent = parts.join('\\') as string;
  return [parent, name];
}

export function findOnTree(path: string, root: File) {
  const parts = path.split('\\');
  let cursor = null;

  for (const part of parts) {
    if (cursor == null) {
      cursor = root;
      continue;
    }

    let founded = false;

    for (const child of cursor.children || []) {
      if (child.name === part) {
        cursor = child;
        founded = true;
        break;
      }
    }

    if (!founded) {
      return null;
    }
  }

  return cursor;
}
