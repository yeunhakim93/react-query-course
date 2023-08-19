import { useQuery } from "react-query";

export function useUsersData() {
  const usersData = useQuery(
    ["users"],
    ({ signal }) =>
      fetch(`/api/users/${userId}`, { signal }).then((res) => res.json()),
    {
      staleTime: 1000 * 60 * 5,
    }
  );
  return usersData;
}

export function useUserData(userId) {
  const userData = useQuery(["users", userId], () =>
    fetch(`/api/users/${userId}`).then((res) => res.json())
  );
  return userData;
}
