import { lazy, useEffect, useState, useTransition } from "react";
const MDEditor = lazy(() => import("@uiw/react-md-editor"));
const UserComponent = lazy(() => import("./User"));
// import MDEditor from "@uiw/react-md-editor";
// import UserComponent from "./User";

export default function App() {
  const [showEditor, setShowEditor] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [user, setUser] = useState({});
  const toggleEditor = () => startTransition(() => setShowEditor(true));
  const [isLoadingUser, startLoadinUser] = useTransition();
  return (
    <div className="App p-5">
      <h1 className="fw-bold">Lazy Loading heavy component when needed</h1>
      <button className="btn btn-primary mt-5" onClick={toggleEditor}>
        Start Editting
      </button>
      <button
        onClick={() => {
          (async () => {
            const data = await fetch(
              "https://api.github.com/users/filipemelo2002"
            );
            const response = await data.json();
            startLoadinUser(() => {
              setUser(response);
            });
          })();
        }}
      >
        Load User
      </button>
      <div className="mt-5">
        {isPending && <h3>LOADING...</h3>}
        {showEditor && <MDEditor />}
        {isLoadingUser && <h2>Carregando usuário</h2>}
        <UserComponent {...user} />
      </div>
    </div>
  );
}
