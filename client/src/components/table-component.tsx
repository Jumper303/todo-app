import React, { useEffect, useState } from 'react';

const TableComponent = () => {
  const [data, setData] = useState<any[]>([]);
  const [userData, setUserData] = useState('you');
  const [itemData, setItemData] = useState({});

  useEffect(() => {
    fetch(`http://localhost:3001/lists?owner=${userData}`, {
      mode: 'cors',
    }).then(
      (response) => {
        if (!response.ok)
          throw new Error(response.status.toString());
        response.json().then((data) => {
          setData(data)
        })
      }
    ).catch(err => {
      console.log("Error in fetch", err);
    });
  }, [userData]);

  // useEffect(() => {
  //   fetch(`http://localhost:3001/lists/${itemData.id}`, {
  //     mode: 'cors',
  //     method: 'POST',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({itemData})
  //   }).then(
  //     (response) => {
  //       if (!response.ok)
  //         throw new Error(response.status.toString());
  //       response.json().then((data) => {
  //         setData(data)
  //       })
  //     }
  //   ).catch(err => {
  //     console.log("Error in fetch", err);
  //   });
  // }, [itemData]);


  return (
    <div>
      <b>Display TODO List of user:</b>
      <select value={userData}
        onChange={e => setUserData(e.target.value)}>
        <option>you</option>
        <option>me</option>
      </select>
      {
        data.map((item, index) => {
          return (
            <div key={index}>
              <br />
              <table>
                <thead key={index}><tr><td><u>{item.name}</u></td></tr></thead>
                <tbody>
                  {
                    item.items.map((e, elementIndex) => {
                      return <tr key={elementIndex}>
                        <td>{e.name}</td>
                        <td><input type="checkbox" defaultChecked={e.isCompleted} data-name={e.name}
                        onChange={
                          e => {
                            setItemData(e);
                            console.log(e.target.getAttribute('data-name'));
                          }
                        }/></td>
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
