import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";

const Profile = () => {
  const { user, signOut } = useContext(AuthContext);


  return (
    <div>
      {user && (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white-700">User Profile</h2>
          <p className="block text-center text-sm font-medium leading-6 text-white-700">Username: {user.username}</p>
          <p className="block text-center text-sm font-medium leading-6 text-white-700">Email: {user.email}</p>
          {/* Display any other user data here */}
        </div>
      )}
      <button className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={signOut}>Sign Out</button>
    </div>
  );
};

export default Profile;