import { useRoutes, Link } from 'react-router-dom'
import ReadPosts from './pages/ReadPosts'
import CreatePost from './pages/CreatePost'
import EditPost from './pages/EditPost'
import PostDetails from './pages/PostDetails'
import './App.css'

const App = () => {
  // Sets up the unique URLs required for the project
  let element = useRoutes([
    { path: "/", element: <ReadPosts /> },
    { path: "/new", element: <CreatePost /> },
    { path: "/edit/:id", element: <EditPost /> },
    { path: "/details/:id", element: <PostDetails /> }
  ]);

  return (
    <div className="App">
      <nav className="header">
        <h1>Crewmate Creator 🚀</h1>
        <Link to="/"><button className="header-btn"> Gallery </button></Link>
        <Link to="/new"><button className="header-btn"> Create </button></Link>
      </nav>

    

      {element}
    </div>
  );
}

const createCrewmate = async (event) => {
    event.preventDefault();

    const { error } = await supabase
        .from('crewmates')
        .insert({ 
            name: crewmate.name, 
            attribute1: crewmate.attribute1, // Change 'attribute1' if your column is named 'class'
            attribute2: crewmate.attribute2  // Change 'attribute2' if your column is named 'speed'
        });

    if (error) {
        console.error("Error inserting crewmate:", error.message);
        alert("Error: " + error.message); // This will tell you exactly why it failed
    } else {
        window.location = "/"; 
    }
};

export default App