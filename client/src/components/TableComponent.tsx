import React, { useEffect, useState } from 'react';

const TableComponent = () => {
  const [listData, setListData] = useState<any[]>([]);
  const [userData, setUserData] = useState('John');
  const [itemData, setItemData] = useState({ id: "", name: "", items: [] });
  const [users, setUsers] = useState<string[]>([]);
  const [newListData, setNewListData] = useState('');

  const BASE_URL = 'http://localhost:3001';

  useEffect(() => {
    fetch(`${BASE_URL}/users`, {
      mode: 'cors',
    }).then(
      (response) => {
        if (!response.ok)
          throw new Error(response.status.toString());
        response.json().then((usersResponse) => {
          setUsers(usersResponse)
        })
      }
    ).catch(err => {
      console.log("Error in fetch", err);
    });
  }, [])

  useEffect(() => {
    fetch(`${BASE_URL}/lists?owner=${userData}`, {
      mode: 'cors',
    }).then(
      (response) => {
        setListData([]);
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
      fetch(`${BASE_URL}/lists/${itemData.id}`, {
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

  useEffect(() => {
    if (newListData && userData && (document.getElementById('new_list_name') as HTMLSelectElement).value
    ) {
      fetch(`${BASE_URL}/lists`, {
        mode: 'cors',
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          owner: userData,
          name: newListData,
          items: []
         })
      }).then(
        response => response.json()
        .then((resp) => {
          (document.getElementById('new_list_name') as HTMLSelectElement).value = '';
          // trigger reload of lists
          setListData(oldListData => [...oldListData, resp])
        })
      ).catch(err => {
        console.log("Error in fetch", err);
      });
    };
  }, [newListData, userData]);
  
  // TODO: split this component into multiple components (list creation, list selection, list item management)

  return (
    <div>
      <br />
      <input id='new_list_name' type='text' />
      <button onClick={
        (event) => {
          setNewListData((document.getElementById('new_list_name') as HTMLInputElement).value);
        }
      }>Create new list</button>
      <br />
      <br />
      <b>Select user: </b>
      <select id="user_select" value={userData} aria-label="user_select"
        onChange={e => setUserData(e.target.value)}>
          {
            users.map((user, index) => {
              return (
                <option key={index}>{user}</option>
              )
            })
          }
      </select>
      <p></p>
      {
        listData.map((todoList, index) => {
          return (
            <div key={index}>
              <table data-testid={todoList.id} data-testlist-name={todoList.name}>
                <thead key={index} className='TodoList'><tr><td colSpan={2}>{todoList.name}</td></tr></thead>
                <tbody>
                  {
                  todoList.items && todoList.items.map((item: { name: string | number | readonly string[] | undefined; id: any; isCompleted: boolean | undefined; currentTarget: { getAttribute: (arg0: string) => any; }; }, elementIndex: React.Key | null | undefined) => {
                    if (item) {
                      return (<tr key={elementIndex}>
                        <td>
                          <input type="text" value={item.name} data-name={item.id} id={todoList.id} data-testid={`${todoList.name}-item-name`} //item name input
                            onChange={
                              e => {
                                Object.keys(listData).forEach(function (key) {
                                  // find corresponding list
                                  if (listData[key]["id"] === e.target?.getAttribute('id')) {
                                    Object.keys(listData[key]["items"]).forEach(function (secondaryKey) {
                                      // find corresponding item
                                      if (listData[key]["items"][secondaryKey] && listData[key]["items"][secondaryKey]["id"] === e.target?.getAttribute('data-name')) {
                                        listData[key]["items"][secondaryKey]["name"] = e.currentTarget.value;

                                        setItemData({
                                          id: listData[key]["id"],
                                          name: listData[key]["name"],
                                          items: listData[key]["items"]
                                        });
                                        return;
                                      }
                                    });
                                  }
                                });
                              } } />
                          <input type="checkbox" checked={item.isCompleted} data-name={item.id} id={`${todoList.id}`} //item completion checkbox
                            onChange={
                              item => {
                                Object.keys(listData).forEach(function (key) {
                                  if (listData[key]["id"] === item.target?.getAttribute('id')) {
                                    Object.keys(listData[key]["items"]).forEach(function (secondaryKey) {
                                      if (listData[key]["items"][secondaryKey] && listData[key]["items"][secondaryKey]["id"] === item.target?.getAttribute('data-name')) {
                                        listData[key]["items"][secondaryKey]["isCompleted"] = item.target.checked;

                                        setItemData({
                                          id: listData[key]["id"],
                                          name: listData[key]["name"],
                                          items: listData[key]["items"]
                                        });
                                        return;
                                      }
                                    });
                                  }
                                });
                              } } />
                          <button data-name={item.id} id={todoList.id} //item delete button
                            onClick={removeItem => {
                              Object.keys(listData).forEach(function (key) {
                                if (listData[key]["id"] === removeItem.currentTarget?.getAttribute('id')) {
                                  Object.keys(listData[key]["items"]).forEach(function (secondaryKey) {
                                    // console.log(item.currentTarget?.getAttribute('data-name'));
                                    if (listData[key]["items"][secondaryKey] && listData[key]["items"][secondaryKey]["id"] === removeItem.currentTarget?.getAttribute('data-name')) {
                                      delete listData[key]["items"][secondaryKey];
                                      // TODO: call delete endpoint instead of bulk update
                                      setItemData({
                                        id: listData[key]["id"],
                                        name: listData[key]["name"],
                                        items: listData[key]["items"]
                                      });
                                      return;
                                    }
                                  });
                                }
                              });
                            } }
                          >
                            X
                          </button>
                        </td>
                      </tr>);
                    }
                  })
                  } 
                  <tr>
                    <td>
                      <button id={todoList.id} data-testid={`${todoList.name}-add-new-item`} onClick={newItem => {
                        Object.keys(listData).forEach(function (key) {
                          if (listData[key]["id"] === newItem.currentTarget.getAttribute('id')) {
                            if (!listData[key].items) {
                              listData[key].items = [];
                            }
                            listData[key]["items"].push({ id: Math.floor(Math.random() * 1000000).toString(), name: "", isCompleted: false });
                            setItemData({
                              id: listData[key]["id"],
                              name: listData[key]["name"],
                              items: listData[key]["items"]
                            });
                          }
                        });
                      } }>Add new item</button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <br />
              <p></p>
            </div>);
        })}
    </div>
  );
};

export default TableComponent;
