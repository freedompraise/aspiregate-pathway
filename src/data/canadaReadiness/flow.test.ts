import { describe, expect, it } from "vitest";
import { visibleQuestionIds } from "./flow";

describe("Canada readiness question flow", () => {
  it("shows the full path on the first question, not 1 of 1", () => {
    expect(visibleQuestionIds({}).length).toBe(13);
    expect(visibleQuestionIds({ applyFrom: "outside" }).length).toBe(13);
  });

  it("stops after the first answer when the application is not from outside Canada", () => {
    expect(visibleQuestionIds({ applyFrom: "inside" })).toEqual(["applyFrom"]);
  });

  it("stops after province when Quebec is selected", () => {
    expect(visibleQuestionIds({ applyFrom: "outside", province: "quebec" })).toEqual(["applyFrom", "province"]);
  });
});
