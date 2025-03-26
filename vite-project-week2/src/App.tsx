import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import TodoContainer from './components/TodoContainer';

// 1. List Component를 Import 해줍니다.
// import List from './components/List';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<h1>Home Page</h1>} />
        <Route path="/week0" element={<h1>Week 0 Page</h1>} />
        <Route path="/week1" element={<h1>Week 1 Page</h1>} />
        <Route path="/week2" element={<h1>Week 2 Page</h1>} />
        <Route path="/week3" element={<h1>Week 3 Page</h1>} />
        <Route path="/week4" element={<h1>Week 4 Page</h1>} />
        <Route path="/week5" element={<h1>Week 5 Page</h1>} />
      </Routes>
      <TodoContainer />
    </Router>
  );
  // const nickname = '리본'
  // const sweetPotato = '고구마'
  // const array = ['REACT', 'NEXT', 'VUE', 'SVELTE', 'ANGULAR', 'REACT-NATIVE']

  // return (
  //   <>
  //   <strong className='school'>중앙대학교</strong>
  //   <p style={{color: 'purple', fontWeight:'bold', fontSize:'3rem'}}>{nickname}/김덕환</p>
  //   <h1>{`${nickname}는 ${sweetPotato} 아이스크림을 좋아합니다.`}</h1>
  //   <ul>
  //     {array.map((yaho, idx) => (
  //       <List key={idx} tech={yaho} />
  //     ))}
  //   </ul>
  //  </>
  // )
}

export default App

