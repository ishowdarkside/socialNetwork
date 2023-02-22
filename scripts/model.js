export const publishUser = async function (
  firstName,
  lastName,
  email,
  password
) {
  const res = await fetch(`https://63de8f849fa0d600600107b2.mockapi.io/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    }),
  });

  const data = await res.json();

  // Saving user's id as cookie:
  const now = new Date();
  const expirationTime = now.getTime() + 2880 * 60 * 10000;
  const expires = new Date(expirationTime).toUTCString();
  document.cookie = `id="${data.id}";expires="${expires}"`;
};
