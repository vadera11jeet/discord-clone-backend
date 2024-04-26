import { createLogger, format, transports, Logger } from "winston";

const { combine, timestamp, printf, colorize } = format;

const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}] ${message}`;
});

function createLoggerInstance() {
  const env = process.env.ENVIRONMENT;

  const logger = createLogger({
    level: env === "development" ? "debug" : "info",
    format:
      env === "development"
        ? combine(colorize(), timestamp(), logFormat)
        : format.json(),
    transports: [new transports.Console()],
  });

  if (env === "production") {
    const fileTransporterError = new transports.File({
      filename: "error.log",
      level: "error",   
    });

    const combineFileTransporterLogs = new transports.File({
      filename: "combine.log",
    });

    logger.clear().add(fileTransporterError).add(combineFileTransporterLogs);
  }

  return logger;
}

const globalForLogger = globalThis as unknown as {
  logger: Logger | undefined;
};

const logger = globalForLogger.logger ?? createLoggerInstance();

export default logger;
