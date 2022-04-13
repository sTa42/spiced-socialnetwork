import App from "../client/src/app";
import { render, waitFor } from "@testing-library/react";
test("Hello", async () => {
    fetch.mockResolvedValue({
        async json() {
            return {
                id: 1,
                first: "hello",
                last: "world",
                url: "dasdaa",
                bio: "ddasdasda",
            };
        },
    });
    const { container } = render(<App />);
    expect(container.innerHTML).toContain("...Loading");
    await waitFor(() => {
        expect(container.querySelector("app-container")).toBeTruthy();
    });
    expect(container.innerHTML).toContain("h1");
    expect(container.innerHTML).toContain("img");
});
