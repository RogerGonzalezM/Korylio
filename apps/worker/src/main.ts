const startedAt = new Date().toISOString();

console.log(
  JSON.stringify({
    service: "worker",
    status: "started",
    startedAt,
  }),
);