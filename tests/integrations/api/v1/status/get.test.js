import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
})

describe("GET /api/v1/status", () => {
  test("should return status 200", async () => {
    const response = await fetch("http://localhost:3000/api/v1/status");
    expect(response.status).toBe(200);

    const responseBody = await response.json();

    const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
    expect(responseBody.updated_at).toBe(parsedUpdatedAt);

    expect(responseBody.dependencies.database.version).toEqual("16.0");
    expect(responseBody.dependencies.database.max_connections).toEqual(100);

    const openedConnections =
      responseBody.dependencies.database.opened_connections;
    expect(openedConnections).toEqual(1);
  });
});
