import { NextResponse } from "next/server";

export const internalError = (consoleError: string, error: unknown) => {
  console.log(consoleError, error);
  return NextResponse.json(
    { message: "Internal server error", error },
    { status: 500 }
  );
};
