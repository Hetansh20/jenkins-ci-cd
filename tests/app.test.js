
const { test } = require("node:test");
const assert = require("node:assert");
const app = require("../app");

test("Dashboard should return HTTP 200", async () => {
    const server = app.listen(0);

    try {
        const response = await fetch(
            `http://localhost:${server.address().port}/`
        );

        assert.strictEqual(response.status, 200);

        const body = await response.text();

        assert.ok(body.includes("DevOps Deployment Dashboard"));
    } finally {
        server.close();
    }
});

test("Health endpoint should return healthy status", async () => {
    const server = app.listen(0);

    try {
        const response = await fetch(
            `http://localhost:${server.address().port}/health`
        );

        assert.strictEqual(response.status, 200);

        const body = await response.json();

        assert.strictEqual(body.status, "healthy");
    } finally {
        server.close();
    }
});
