import { File } from './file';

export const DEFAULT_FILE_SYSTEM: File = {
  // C:\
  name: '',
  type: 'directory',
  children: [
    // C:\Users
    {
      name: 'Users',
      type: 'directory',
      children: [
        // C:\Users\Sammwy
        {
          name: 'Sammwy',
          type: 'directory',
          children: [
            // C:\Users\Sammwy\Desktop
            {
              name: 'Desktop',
              type: 'directory',
              children: [
                {
                  name: 'uwu',
                  type: 'executable',
                  icon: '/icons/system/sys_cutedos.png',
                  exec: (ctx) => {
                    ctx.winManager.createWindow('uwu', {
                      title: 'Hola chat de twitch uwu',
                    });
                  },
                },
              ],
            },

            // C:\Users\Sammwy\AppData
            {
              name: 'AppData',
              type: 'directory',
              children: [
                // C:\Users\Sammwy\AppData\CuteDOS
                {
                  name: 'CuteDOS',
                  type: 'directory',
                  children: [
                    // C:\Users\Sammwy\AppData\CuteDOS\Start Menu
                    {
                      name: 'Start Menu',
                      type: 'directory',
                      children: [
                        {
                          name: 'uwu',
                          type: 'executable',
                          icon: '/icons/system/sys_cutedos.png',
                          exec: (ctx) => {
                            ctx.winManager.createWindow('uwu', {
                              title: 'Hola chat de twitch uwu',
                            });
                          },
                        },
                        {
                          name: 'uwu',
                          type: 'executable',
                          icon: '/icons/system/sys_cutedos.png',
                          exec: (ctx) => {
                            ctx.winManager.createWindow('uwu', {
                              title: 'Hola chat de twitch uwu',
                            });
                          },
                        },
                        {
                          name: 'uwu',
                          type: 'executable',
                          icon: '/icons/system/sys_cutedos.png',
                          exec: (ctx) => {
                            ctx.winManager.createWindow('uwu', {
                              title: 'Hola chat de twitch uwu',
                            });
                          },
                        },
                        {
                          name: 'uwu',
                          type: 'executable',
                          icon: '/icons/system/sys_cutedos.png',
                          exec: (ctx) => {
                            ctx.winManager.createWindow('uwu', {
                              title: 'Hola chat de twitch uwu',
                            });
                          },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
