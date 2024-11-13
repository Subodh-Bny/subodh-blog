declare global {
  // eslint-disable-next-line no-var
  var mongoose:
    | {
        connection: unknown;
        promise: Promise<typeof import("mongoose")> | null;
      }
    | undefined;
}

export {};
