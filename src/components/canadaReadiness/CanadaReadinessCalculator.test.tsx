import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { CanadaReadinessCalculator } from "./CanadaReadinessCalculator";
import { DISCLAIMER } from "@/data/canadaReadiness/rules";

function renderCalculator() {
  return render(
    <MemoryRouter>
      <CanadaReadinessCalculator />
    </MemoryRouter>,
  );
}

describe("CanadaReadinessCalculator", () => {
  it("starts at question 1 of 13, not 1 of 1", () => {
    renderCalculator();
    expect(screen.getByText("Question 1 of 13")).toBeInTheDocument();
    expect(screen.getByText("Where will you apply from?")).toBeInTheDocument();
    expect(screen.queryByText(DISCLAIMER)).not.toBeInTheDocument();
    expect(screen.queryByText(/first version/i)).not.toBeInTheDocument();
  });

  it("keeps out-of-scope notes off the strengthen list and shows the disclaimer once at the end", async () => {
    renderCalculator();
    fireEvent.click(screen.getByText("Already in Canada"));

    await waitFor(() => {
      expect(screen.getByText("Talk to us about this one")).toBeInTheDocument();
    });

    expect(screen.queryByText("What to strengthen")).not.toBeInTheDocument();
    expect(screen.queryByText(/first version/i)).not.toBeInTheDocument();
    expect(screen.getByText(DISCLAIMER)).toBeInTheDocument();
  });
});
