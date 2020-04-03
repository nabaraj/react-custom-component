import React from 'react';
import CustomDropdown from "./component/CustomDropdown"
import './App.css';

function App() {
  const options=[{
    name:"item1",
    id:"item1"
  },{
    name:"item2",
    id:"item2"
  },{
    name:"item3",
    id:"item3"
  },{
    name:"item4",
    id:"item4"
  },{
    name:"item5",
    id:"item5"
  },{
    name:"item6",
    id:"item6"
  },{
    name:"item7",
    id:"item7"
  },{
    name:"item8",
    id:"item8"
  }]
  let getValue = (selected)=>{
    console.log(selected);
  }
  return (
    <div className="App">
      <div style={{width:"200px", margin:"0 auto"}}>
        <CustomDropdown 
          options={options} 
          multiSelect={true}
          getValue={getValue}
        />
      </div>
    </div>
  );
}

export default App;
