"use strict";
const supertest = require("supertest");
const request = supertest("http://localhost:4480");

test("returns a welcome message", async () => {
  const response = await request.get("/");
  expect(response.status).toBe(200);
  expect(response.text).toEqual("hello world from the Data API on port: 4480");
});
