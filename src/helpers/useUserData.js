import { useQuery } from "react-query";

export function useUsersData() {
  const usersData = useQuery(["users"], () =>
    fetch("/api/users").then((res) => res.json())
  );
  return usersData;
}

export function useUserData(userId) {
  const userData = useQuery(["users", userId], () =>
    fetch(`/api/users/${userId}`).then((res) => res.json())
  );
  return userData;
}
