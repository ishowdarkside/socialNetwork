if (document.cookie === "") window.location.href = "index.html";
export const id = +document.cookie?.split("=")[1].slice(1, 2);
export const getUserData = async function () {
  const res = await fetch(
    `https://63de8f849fa0d600600107b2.mockapi.io/users/${id}`
  );
  const data = await res.json();
  return data;
};

export const editUserData = async function (name, email, password) {
  const res = await fetch(
    `https://63de8f849fa0d600600107b2.mockapi.io/users/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: name,
        email: email,
        password: password,
      }),
    }
  );

  const data = await res.json();
};

export const removeUser = async function () {
  const res = await fetch(
    `https://63de8f849fa0d600600107b2.mockapi.io/users/${id}`,
    {
      method: "DELETE",
      header: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await res.json();
  document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; ";
  location.reload();
};

export const publishPost = async function (userId, content) {
  const res = await fetch(`https://63de8f849fa0d600600107b2.mockapi.io/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: content,
      user_id: userId,
    }),
  });

  const data = await res.json();
};

export const getAllPosts = async function () {
  const res = await fetch(`https://63de8f849fa0d600600107b2.mockapi.io/posts`);
  const data = await res.json();
  return data;
};

export const getUsername = async function (id) {
  const res = await fetch(
    `https://63de8f849fa0d600600107b2.mockapi.io/users/${id}`
  );
  const data = await res.json();
  return data.firstName;
};

export const deletePost = async function (id) {
  const res = await fetch(
    `https://63de8f849fa0d600600107b2.mockapi.io/posts/${id}`,
    {
      method: "DELETE",
    }
  );

  const data = await res.json();
};

export const getSearchResult = async function (searchInput) {
  const res = await fetch("https://63de8f849fa0d600600107b2.mockapi.io/users");
  const data = await res.json();

  return data.filter((el) => el.firstName === searchInput);
};
