import email from "infra/email";
import orchestrator from "tests/orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

describe("email", () => {
  test("send()", async () => {
    await orchestrator.deleteAllEmails();

    await email.send({
      from: "CloneTabNews <no-reply@clonetabnews.com>",
      to: "user@example.com",
      subject: "Test Email",
      text: "This is a test email.",
    });

    await email.send({
      from: "CloneTabNews <no-reply@clonetabnews.com>",
      to: "user@example.com",
      subject: "Test Last Email",
      text: "This is a test email in last email.",
    });

    const lastEmail = await orchestrator.getLastEmail();
    expect(lastEmail.sender).toBe("<no-reply@clonetabnews.com>");
    expect(lastEmail.recipients[0]).toBe("<user@example.com>");
    expect(lastEmail.subject).toBe("Test Last Email");
    expect(lastEmail.text).toBe("This is a test email in last email.\n");
  });
});
