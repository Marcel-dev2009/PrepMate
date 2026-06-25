const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

async function request(endpoint: string, options: RequestInit = {}) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "Something went wrong");
  }
  return data;
}

export const api = {
  register: (username: string, email: string, password: string) =>
    request("/auth/register", {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
    }),

  login: (email: string, password: string) =>
    request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  logout: () =>
    request("/auth/logout", {
      method: "POST",
    }),

  profile: (grade: string, school: string, profile: string) =>
    request("/profile", {
      method: "POST",
      body: JSON.stringify({ grade, school, profile }),
    }),

  saveResult: (subject:string, score:number, total:number) =>
    request("/save", {
      method: "POST",
      body: JSON.stringify({ subject, score, total }),
    }),
  getResult: () => request("/result"),
  me: () => request("/me"),
};