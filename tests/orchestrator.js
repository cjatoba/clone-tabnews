import retry from "async-retry";
import database from "../infra/database";
import migrator from "models/migrator";

async function waitForAllServices() {
  await waitForWebServer();

  async function waitForWebServer() {
    return retry(fetchStatusPage, {
      retries: 100,
    });

    async function fetchStatusPage() {
      const response = await fetch("http://localhost:3000/api/v1/status");

      if (response.status !== 200) {
        throw new Error("Web server is not ready yet");
      }
    }
  }
}

async function clearDatabase() {
  await database.query("DROP SCHEMA PUBLIC CASCADE; CREATE SCHEMA PUBLIC;");
}

const orchestrator = {
  waitForAllServices,
  clearDatabase,
};

export default orchestrator;
