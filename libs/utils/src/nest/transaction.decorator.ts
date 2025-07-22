import { Inject } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';

export const Transaction = (): ((
  target: never,
  propertyKey: string,
  descriptor: PropertyDescriptor
) => void) => {
  const Injection = Inject(Sequelize);

  return function (
    tagret,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    Injection(tagret, 'connection');
    const originalMethod = descriptor.value;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    descriptor.value = function (this: any, ...args: never) {
      return this.connection.transaction(() => {
        return originalMethod.apply(this, args);
      });
    };
  };
};
