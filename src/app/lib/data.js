import { connectToDB } from "@/app/lib/utils";
export const fetchUsers = async () => {
  try {
    connectToDB();
    const users = await User.find();
    return users;
  } catch (err) {
    console.log(err);
  }
};


// import { fetchPosts } from "@/db/queries/posts";

// // import { fetchUsers } from "@/app/lib/data";
// const LoginForm = () => {
//   // const users= await fetchUsers();
//   // console.log(users);
//   // useEffect(() => {
//   //   const fetchData = async () => {
//   //     const users = await fetchUsers();
//   //     console.log(users);
//   //     console.log("helloooo")
//   //   };
//   //   fetchData();
//   // });