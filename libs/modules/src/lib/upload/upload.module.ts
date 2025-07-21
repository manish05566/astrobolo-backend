import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MulterModule, MulterModuleOptions } from '@nestjs/platform-express';
// import { Request } from 'express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { uuid } from '@xapads/nest/utils';
import { existsSync, mkdirSync } from 'fs';

export type UploadModuleOption = {
  regex?: RegExp;
};

@Module({})
export class UploadModule {
  static registerForBuffer(): DynamicModule {
    return {
      module: UploadModule,
      imports: [MulterModule.register()],
      exports: [MulterModule],
    };
  }

  static register(option: UploadModuleOption): DynamicModule {
    return {
      module: UploadModule,
      imports: [
        MulterModule.registerAsync({
          useFactory: (config: ConfigService) => {
            const factory: MulterModuleOptions = {
              fileFilter: (req, file, callback) => {
                const ext = extname(file.originalname);

                console.log('ext', ext, 'file.originalname', file.originalname);

                if (!file.originalname.match(option.regex || '')) {
                  return callback(
                    new Error(`File with extension .${ext} is not allowed.`),
                    false
                  );
                }
                callback(null, true);
              },
            };

            const type: string = config.get('storageType') || 'DISK';

            if (type === 'GOOGLE') {
              // factory.storage = new GoogleStorage({
              //   projectId: config.get('googleProjectId'),
              //   keyFilename: config.get('googleKeyPath'),
              //   bucket: config.get('googleBucket'),
              //   contentType: (req, file) => {
              //     return file.mimetype;
              //   },
              //   filename: (
              //     req: Request,
              //     file: Express.Multer.File,
              //     callback: (error: Error | null, filename: string) => void
              //   ) => {
              //     const name: string = uuid(),
              //       ext: string = extname(file.originalname);
              //     callback(null, `${req['publicationId']}/${name}${ext}`);
              //   },
              // });
            } else {
              factory.dest = config.get('uploadPath');
              factory.storage = diskStorage({
                destination: config.get('uploadPath'),
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                filename: (req: any, file: any, callback: any) => {
                  const name: string = uuid(),
                    ext: string = extname(file.originalname);

                  const dir = `${config.get('uploadPath')}/${
                    req['publicationId']
                  }`;

                  if (!existsSync(dir)) {
                    mkdirSync(dir);
                  }

                  callback(null, `${req['publicationId']}/${name}${ext}`);
                },
              });
            }

            return factory;
          },
          inject: [ConfigService],
        }),
      ],
      exports: [MulterModule],
    };
  }
}
