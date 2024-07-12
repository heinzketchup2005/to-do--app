import { useEffect, useState } from 'react';
import ListHeader from "./components/ListHeader";
import ListItem from "./components/ListItem";
import Auth from "./components/Auth";
import { useCookies } from 'react-cookie';

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['authToken', 'Email']);
  const authToken = cookies.authToken;
  const userEmail = cookies.Email;
  const [tasks, setTasks] = useState(null);

  const getData = async () => {
    try {
      const response = await fetch(`http://localhost:8000/todos/${userEmail}`);
      const json = await response.json();
      console.log(json);
      setTasks(json);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (authToken) {
      getData();
    }
  }, [authToken]);

  console.log(tasks);

  // Sort tasks
  const sortedTasks = tasks?.sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="app">
      {!authToken && <Auth />}
      {authToken && (
        <>
          <ListHeader listName={'To Do List'} getData={getData} />
          <p className='welcome'>Welcome back ${userEmail}</p>
          {sortedTasks?.map((task) => (
            <ListItem key={task.id} task={task} getData={getData} />
          ))}
          <p className='jiaproject'>Another one of Jia's webdev projects</p>
        </>
      )}
    </div>
  );
}

export default App;
