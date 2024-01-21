import { WindowsHook } from '../windows';
import { FSHook } from './fs-context';

type FileExecutionCtx = {
  args: string[];
  winManager: WindowsHook;
  fs: FSHook;
};

export interface File {
  name: string;
  type: 'directory' | 'file' | 'executable';

  // Only if type is "directory".
  children?: File[];

  // Only if type is "file".
  content?: string;
  remote_content?: string;

  // Only if is type executable.
  exec?: (ctx: FileExecutionCtx) => unknown;
  icon?: string;
}
