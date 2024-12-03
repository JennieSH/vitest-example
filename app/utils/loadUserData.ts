interface User {
  name: string;
  email: string;
  foods: string[];
  verified: boolean;
  isVip?: boolean;
}

// simulate fetching user data from server
const getUser = async (name: string): Promise<User | undefined> =>
  new Promise((resolve) => {
    const users: User[] = [
      {
        name: "Jennie",
        email: "hello@com.tw",
        foods: ["apple", "banana"],
        verified: true
      },
      {
        name: "Jackson",
        email: "world@com.tw",
        foods: ["kiwi"],
        verified: false
      }
    ];

    setTimeout(() => {
      resolve(users.find((user) => user.name === name));
    }, 1000);
  });

export const updateUserData = async (
  name: string
): Promise<User | undefined> => {
  const user = await getUser(name);

  if (!user) {
    throw new Error("User not found");
  }

  // mutate user object
  user.isVip = name === "Jennie" ? true : false;

  return user;
};
