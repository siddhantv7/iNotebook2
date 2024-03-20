// import {useContext} from 'react';
import Notes from './Notes';


const Home = () => {
  // const a = useContext(noteContext);
  // useEffect(() => {
  //   a.update();
  // }, [a])


  return (
    <div>
      {/* This is Home {a.state.name}    use context part */}

      <Notes />
    </div>
  )
}

export default Home
