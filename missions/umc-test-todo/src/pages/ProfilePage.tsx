import { useAuthContext } from "../context/AuthContext";

function ProfilePage() {
  const { username } = useAuthContext();

  return <div>프로필 페이지 {username}</div>;
}

export default ProfilePage;
