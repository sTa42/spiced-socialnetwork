import BioEditor from "../client/src/bioeditor";
import { render, fireEvent, waitFor } from "@testing-library/react";

// test("When no bio is passed to it, an Add button is rendered.", async () => {
//     const user = { bio: null };
//     const updateBio = jest.fn((newBio) => {
//         user.bio = newBio;
//     });
//     const { container } = render(
//         <BioEditor bio={user.bio} updateBio={updateBio} />
//     );
//     expect(container.querySelector("button").innerHTML).toContain("Add a bio");
// });
// test("When a bio is passed to it, an Edit button is rendered.", async () => {
//     const user = { bio: "I like" };
//     const updateBio = jest.fn((newBio) => {
//         user.bio = newBio;
//     });
//     const { container } = render(
//         <BioEditor bio={user.bio} updateBio={updateBio} />
//     );
//     expect(container.querySelector("button").innerHTML).toContain(
//         "Edit your bio"
//     );
// });
// test("When no bio is passed to it, an Add button is rendered,after clicking button, textarea appears", async () => {
//     const user = { bio: null };
//     const updateBio = jest.fn((newBio) => {
//         user.bio = newBio;
//     });
//     const { container } = render(
//         <BioEditor bio={user.bio} updateBio={updateBio} />
//     );
//     fireEvent.click(container.querySelector("button"));
//     expect(container.querySelector("textarea")).toBeTruthy();
// });
// test("When a bio is passed to it, an Edit button is rendered, after clicking button, textarea appears", async () => {
//     const user = { bio: "I like" };
//     const updateBio = jest.fn((newBio) => {
//         user.bio = newBio;
//     });
//     const { container } = render(
//         <BioEditor bio={user.bio} updateBio={updateBio} />
//     );
//     fireEvent.click(container.querySelector("button"));
//     expect(container.querySelector("textarea")).toBeTruthy();
// });
test("new bio gets displayed, 4+5", async () => {
    let newbio = "hello world";
    const user = { bio: "I like" };

    const updateBio = jest.fn((newBio) => {
        user.bio = newBio;
    });
    fetch.mockResolvedValue({
        async json() {
            return {
                success: true,
                bio: newbio,
            };
        },
    });

    const { container } = render(
        <BioEditor bio={user.bio} updateBio={updateBio} />
    );
    fireEvent.click(container.querySelector("button"));
    expect(container.querySelector("textarea")).toBeTruthy();
    // container.querySelector("textarea").value(newbio);
    // container
    //     .querySelector("textarea")
    //     .simulate("change", { target: { value: newbio } });
    // container
    //     .find("textarea")
    //     .simulate("change", { target: { value: newbio } });
    fireEvent.change(container.querySelector("textarea"), {
        target: { value: newbio },
    });
    fireEvent.click(container.querySelector(".draftSave"));
    await waitFor(() => {
        // expect(container.querySelector("p").innerHTML).toContain(newbio);
        expect(updateBio.mock.calls.length).toBe(1);
    });
});
