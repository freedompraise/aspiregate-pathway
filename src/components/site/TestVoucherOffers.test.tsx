import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/exchangeRate", async () => {
  const actual = await vi.importActual<typeof import("@/lib/exchangeRate")>("@/lib/exchangeRate");
  return {
    ...actual,
    getUsdToNgnRate: vi.fn().mockResolvedValue(1332.6841),
  };
});

import { TestVoucherOffers } from "./TestVoucherOffers";

describe("TestVoucherOffers", () => {
  it("shows the dollar price and sends the naira amount only on WhatsApp", async () => {
    const openSpy = vi.spyOn(window, "open").mockImplementation(() => null);
    render(<TestVoucherOffers />);

    expect(screen.getAllByText("$152.50").length).toBeGreaterThan(0);
    expect(screen.queryByText(/₦/)).not.toBeInTheDocument();

    fireEvent.click(screen.getAllByRole("button", { name: /book this test/i })[0]);

    expect(await screen.findByRole("button", { name: "Pay $152.50" })).toBeInTheDocument();
    expect(screen.queryByText(/₦/)).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /having trouble paying/i }));

    expect(await screen.findByText("5601831405")).toBeInTheDocument();
    expect(screen.getByText("Pay $152.50 into this account")).toBeInTheDocument();
    expect(screen.queryByText(/₦/)).not.toBeInTheDocument();
    expect(screen.getByText("Fidelity Bank")).toBeInTheDocument();
    expect(screen.getByText("AspireGate Services LTD")).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: "Ada Lovelace" } });
    fireEvent.change(screen.getByLabelText(/^email$/i), { target: { value: "ada@example.com" } });
    fireEvent.change(screen.getByLabelText(/whatsapp number/i), { target: { value: "+2348012345678" } });
    fireEvent.change(screen.getByLabelText(/what went wrong/i), { target: { value: "My card was declined" } });
    fireEvent.click(screen.getByRole("button", { name: /send on whatsapp/i }));

    expect(openSpy).toHaveBeenCalled();
    const url = String(openSpy.mock.calls[0]?.[0]);
    const message = decodeURIComponent(url);
    expect(url).toContain("https://wa.me/2348121722035?text=");
    expect(message).toContain("Ada Lovelace");
    expect(message).toContain("5601831405");
    expect(message).toContain("₦209,331");
    expect(screen.getByRole("link", { name: /open whatsapp again/i })).toHaveAttribute("href", url);
  });
});
