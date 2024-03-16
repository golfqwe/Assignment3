"use strict";
const supertest = require("supertest");
const request = supertest("http://localhost:4480");

test("returns a welcome message", async () => {
  const response = await request.get("/crud24/testCRUD?name=claire");
  expect(response.status).toBe(200);
  expect(JSON.parse(response.text)).toEqual({
    message: "/crud24/testCRUD?name=claire  GET REQUEST",
  });
});
