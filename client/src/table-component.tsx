import React, { useEffect, useState } from 'react';

const TableComponent = () => {
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    fetch('http://localhost:3001/lists?owner=you')
      .then((response) => response.json())
      .then((data) => {
        setData(data)
      });
  }, []);

  return (    
      <div>
        { 
        data.map((item, index) => {
          return (
            <div>
            <br/>
          <table>
          <thead key={index}>{item.name}</thead>
          <tbody>
            { 
            item.items.map((e) => { 
            return <tr> 
              <td>{e.name}</td>
              <td><input type="checkbox" defaultChecked={e.isCompleted}/></td>
             </tr>
            })
            }
          </tbody>
          </table>
          </div>);          
        })}
       </div>
  );
};

export default TableComponent;