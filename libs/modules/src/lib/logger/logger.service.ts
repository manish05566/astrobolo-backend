import { Injectable, LoggerService as Logger } from '@nestjs/common';
import { appendFile, open } from 'fs';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { LogLevel } from '@xapads/types';
import moment = require('moment');

type AllowedLogLevels = {
  [key in LogLevel]: LogLevel[];
};

const allowedLogLevels: AllowedLogLevels = {
  DEBUG: [LogLevel.DEBUG, LogLevel.INFO, LogLevel.WARNING, LogLevel.ERROR],
  INFO: [LogLevel.INFO, LogLevel.WARNING, LogLevel.ERROR],
  WARNING: [LogLevel.WARNING, LogLevel.ERROR],
  ERROR: [LogLevel.ERROR],
  VERBOSE: [LogLevel.DEBUG, LogLevel.INFO, LogLevel.WARNING, LogLevel.ERROR],
};

@Injectable()
export class LoggerService implements Logger {
  private level: LogLevel;
  private type: 'file' | 'console';

  constructor(private config: ConfigService) {
    this.level = config.get('logLevel') || LogLevel.DEBUG;
    this.type = config.get('logType') || 'console';
  }

  private _log(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    level: any,
    message: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    stack: any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    requestPayload?: any
  ) {
    if (allowedLogLevels[this.level].includes(level)) {
      // if (this.config.get('environment') === 'production') {
      if (this.config.get('environment') === 'development') {
        return this._logFormatted(level, message, stack, requestPayload);
      } else {
        console[level === LogLevel.ERROR ? 'error' : 'log'](message, stack);
      }
    }
  }

  private _logFormatted(
    severity: string,
    message: string,
    stack: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    requestPayload?: any
  ) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const globalFields: any = {};

    if (requestPayload) {
      const project = this.config.get('googleProjectId');
      const { trace, body, ...req } = requestPayload;

      globalFields['httpRequest'] = req;
      globalFields['jsonPayload'] = body;

      if (trace) {
        if (trace && project) {
          const [traceId] = trace.split('/');
          globalFields[
            'logging.googleapis.com/trace'
          ] = `projects/${project}/traces/${traceId}`;
        }
      }
    }

    const entry = Object.assign(
      {
        severity,
        message,
        textPayload: stack,
      },
      globalFields
    );

    if (this.type === 'file') {
      this._write(entry);
    } else {
      // console[severity === LogLevel.ERROR ? 'error' : 'log'](
      //   JSON.stringify(entry)
      // );
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _write(data: any) {
    const match = data.textPayload.match(/at (\w+)\.(\w+) \(/);
    const serviceName = match ? match[1] : 'Unknown Service';
    const fileName: string = serviceName + '-' + moment().format('YYYY-MM-DD-HH-mm-ss') + '.log',
      filePath: string = join(this.config.get('logPath') || '', fileName),
      message: string =
        this._format(this.level, data.message, data.textPayload) + '\r\n';
    open(filePath, 'a+', () => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      appendFile(filePath, message, () => { });
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _format(level: string, message: any, stack: any = null): string {
    if (stack) {
      message = message + '\r\n' + stack;
    }

    if (!message) {
      return '';
    }

    if (typeof message !== 'string' && typeof message.message !== 'undefined') {
      message = message.message;
    }
    return `[${moment().format('YYYY-MM-DD-HH-mm-ss')}] ${level}: ${message}`
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  log(message: string, stack: any = null) {
    this._log(LogLevel.INFO, message, stack);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error(message: string, stack: any, requestPayload: any) {
    this._log(LogLevel.ERROR, message, stack, requestPayload);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  warn(message: string, stack: any = null) {
    this._log(LogLevel.WARNING, message, stack);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  debug(message: string, stack: any = null) {
    this._log(LogLevel.DEBUG, message, stack);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  verbose(message: string, stack: any = null) {
    this._log(LogLevel.VERBOSE, message, stack);
  }
}
