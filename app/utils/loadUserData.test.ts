import { describe, test, expect } from "vitest";
import { updateUserData } from "./loadUserData";

describe("updateUserData", () => {
  test("loads user data as expected", async () => {
    const user = await updateUserData("Jennie");

    // fails the test (show the expected and received values)
    // expect(user).toEqual({});

    expect(user).toEqual({
      name: "Jennie",
      email: "hello@com.tw",
      foods: ["apple", "banana"],
      verified: true,
      isVip: true
    });
  });

  test("throws error when user not found", async () => {
    // since the error is thrown before the expect statement, it cannot be caught.
    // so instead putting the data in the expect statement, should be put the function you're expecting to throw an error
    // const unknownUser = await updateUserData("fakeUser");

    expect(async () => await updateUserData("fakeUser")).rejects.toThrowError(
      "User not found"
    );
  });
});

// describe("updateUserData(Snapshot)", () => {
//   test("loads user data as expected", async () => {
//     const user = await updateUserData("Jennie");

//     // automatically generates a snapshot of the user object
//     // the snapshot is saved in the __snapshots__ folder, and need to be committed to the repository
//      expect(user).toMatchSnapshot();

//     // expect(user).toMatchInlineSnapshot();
//   });
// });

// vi.mock("./updateUserData", () => ({
//   loadUserData: () => ({
//     name: "FakeUser2",
//     email: "hey@com.tw",
//     foods: [],
//     verified: true
//   })
// }));

// describe("updateUserData(mock)", () => {
//   test("loads user data as expected", async () => {
//     const user = await updateUserData("Jennie");

//     expect(user).toEqual({
//       name: "Jennie",
//       email: "hello@com.tw",
//       foods: ["apple", "banana"],
//       verified: true,
//       isVip: true
//     });
//   });
// });
