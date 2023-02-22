export const findUser = async function (email, pass) {
  const res = await fetch(`https://63de8f849fa0d600600107b2.mockapi.io/users`);
  const data = await res.json();
  const targetUser = data.find(
    (el) => el.email === email && el.password === pass
  );

  return targetUser;
};
