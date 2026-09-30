"use client";

import { useEffect, useState } from "react";

type ApiState = "checking" | "online" | "offline";

type HealthResponse = {
  status: "ok";
};

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export function ApiStatus() {
  const [state, setState] = useState<ApiState>(
    apiUrl ? "checking" : "offline",
  );

  useEffect(() => {
    if (!apiUrl) {
      return;
    }

    const controller = new AbortController();

    async function checkApi() {
      try {
        const response = await fetch(`${apiUrl}/health`, {
          method: "GET",
          signal: controller.signal,
        });

        if (!response.ok) {
          setState("offline");
          return;
        }

        const data = (await response.json()) as HealthResponse;

        setState(data.status === "ok" ? "online" : "offline");
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        setState("offline");
      }
    }

    void checkApi();

    return () => {
      controller.abort();
    };
  }, []);

  const label =
    state === "checking"
      ? "Checking API"
      : state === "online"
        ? "API connected"
        : "API offline";

  return (
    <div
      className="hidden items-center gap-2 text-xs text-muted md:flex"
      title={label}
    >
      <span
        className={[
          "h-2 w-2 rounded-full",
          state === "online"
            ? "bg-emerald-500"
            : state === "offline"
              ? "bg-red-500"
              : "bg-amber-500",
        ].join(" ")}
      />
      <span>{label}</span>
    </div>
  );
}