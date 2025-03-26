const List = (props) => {
    const { tech } = props;
    return (
        // listStyle을 통해 제거할 수 있습니다.
      <li style={{listStyle: 'none'}}>
        {tech}
      </li>
    )
  }
  
  export default List
  

// const List = ({ tech }) => (
//     <li style={{ listStyle: 'none' }}>{tech}</li>
//   ); // ()로 묶으면 return을 생략할 수 있습니다.