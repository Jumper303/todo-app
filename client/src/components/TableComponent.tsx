import React, { useEffect, useState } from 'react';

const TableComponent = () => {
  const [listData, setListData] = useState<any[]>([]);
  const [userData, setUserData] = useState('you');
  const [itemData, setItemData] = useState({ id: "", name: "", items: [] });

  useEffect(() => {
    fetch(`http://localhost:3001/lists?owner=${userData}`, {
      mode: 'cors',
    }).then(
      (response) => {
        if (!response.ok)
          throw new Error(response.status.toString());
        response.json().then((listDataResponse) => {
          setListData(listDataResponse)
        })
      }
    ).catch(err => {
      console.log("Error in fetch", err);
    });
  }, [userData])

  useEffect(() => {
    if (itemData.id) {
      fetch(`http://localhost:3001/lists/${itemData.id}`, {
        mode: 'cors',
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ itemData })
      }).then(
          response => response.text()
      ).catch(err => {
        console.log("Error in fetch", err);
      });
    };
  }, [itemData]);


  return (    
    <div>
      <br/>
      <b>Select user: </b>
      <select value={userData}
        onChange={e => setUserData(e.target.value)}>
        <option>you</option>
        <option>me</option>
      </select>   
      <p></p>   
      {
        listData.map((todoList, index) => {
          return (
            <div key={index}>                          
              <table>
                <thead key={index} className='TodoList'><tr><td colSpan={2}>{todoList.name}</td></tr></thead>
                <tbody>
                  {
                    todoList.items.map((e, elementIndex) => {
                      return (<tr key={elementIndex}>
                        <td>
                          <input type="text" value={e.name} data-name={e.id} id={todoList.id}                           
                            onChange={
                              e => {
                                Object.keys(listData).forEach(function (key) {
                                  // find corresponding list
                                  if (listData[key]["id"] === e.target.getAttribute('id')) {                                    
                                    Object.keys(listData[key]["items"]).forEach(function (secondaryKey) {
                                      // find corresponding item
                                      if (listData[key]["items"][secondaryKey]["id"] === e.target.getAttribute('data-name')) {
                                        listData[key]["items"][secondaryKey]["name"] = e.currentTarget.value;

                                        setItemData({
                                          id: listData[key]["id"],
                                          name: listData[key]["name"],
                                          items: listData[key]["items"]
                                        });
                                      }
                                    })
                                  }
                                });
                              }
                            }
                          />
                        </td>
                        <td>
                          <input type="checkbox" checked={e.isCompleted} data-name={e.id} id={todoList.id}
                            onChange={
                              e => {
                                Object.keys(listData).forEach(function (key) {
                                  if (listData[key]["id"] === e.target.getAttribute('id')) {
                                    Object.keys(listData[key]["items"]).forEach(function (secondaryKey) {
                                      if (listData[key]["items"][secondaryKey]["id"] === e.target.getAttribute('data-name')) {
                                        listData[key]["items"][secondaryKey]["isCompleted"] = e.target.checked;

                                        setItemData({
                                          id: listData[key]["id"],
                                          name: listData[key]["name"],
                                          items: listData[key]["items"]
                                        });
                                      }
                                    })
                                  }
                                });
                              }
                            } />
                        </td>
                      </tr>)
                    })
                  }
                </tbody>
              </table>              
              <br/>
              <p></p>
            </div>);
        })}
    </div>
  );
};

export default TableComponent;
