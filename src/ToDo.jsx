import { React, useEffect, useState } from "react";
import "./ToDo.css";
import todoimg from "./images/todo.jpg";

// We are using Local Storage to store the list of the tasks.
// 'lists' is the key corresponding to all the tasks right now.
// getItem - to fetch the array of the tasks.
// setItem - to store the array of the tasks.

const getLocalItems = () => {
  const list = localStorage.getItem("lists");
  if (localStorage.getItem("lists") === null) return [];
  if (list) {
    return JSON.parse(localStorage.getItem("lists"));
  } else {
    return [];
  }
};

const ToDo = () => {

  // Here 4 useState hooks are used:
  // inputData - to store the entered task by the user recently.
  // items - to store the array of the tasks.
  // toggleSubmit - to decide which icon (plus-icon / edit-icon) to show as per the situation.
  // isEditItem - to store the current id of the task (each task has their unique id, on the basis of which we gonna perform crud operations on them)

  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalItems());
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [isEditItem, setIsEditItem] = useState(null);

  
  // useEffect hook gets triggered whenever system encounters any changes inside 'items' state

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(items));
  }, [items]);

  
  // Whatever user presses on the searchbar, eventually gets updated 

  const inputEvent = (event) => {
    setInputData(event.target.value);
  };

  
  // Utility function to add new Item inside the array of items.

  const addItem = () => {
    if (inputData === "") return;
    const currID = new Date().getTime().toString();

    // When we use this utility to edit/update some task

    if (!toggleSubmit) {
      setItems(
        items.map((ele) => {
          if (ele.id === isEditItem) {
            return { ...ele, name: inputData };
          }
          return ele;
        })
      );

      setInputData("");
      setToggleSubmit(!toggleSubmit);
      setIsEditItem(null);
    } 
    
    // When we use this utility to add/insert new task.
    else {
      const allInputData = { id: currID, name: inputData };
      setItems((oldItem) => {
        return [...oldItem, allInputData];
      });
      setInputData("");
    }
  };



  // Utility function to remove specific task, on the basis of user preference.

  const removeItem = (id) => {
    const newItemList = items.filter((val) => {
      return val.id !== id;
    });
    setItems(newItemList);
  };

  

  // Utility function to remove all the tasks currenty present.

  const removeAllItems = () => {
    setItems([]);
  };



  // utility function to edit/update some task, as per user needs.

  const editItem = (id) => {
    const newItem = items.find((val) => {
      return val.id === id;
    });
    setInputData(newItem.name);
    setIsEditItem(id);
    setToggleSubmit(!toggleSubmit);
  };

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src={todoimg} alt="404" />
            <figcaption> 👇 ADD YOUR LIST HERE 👇 </figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder="✍   ADD  ITEMS....."
              onChange={inputEvent}
              value={inputData}
            />
            {toggleSubmit ? (
              <i className="fa fa-plus" title="ADD ITEM" onClick={addItem}></i>
            ) : (
              <i
                className="far fa-edit special"
                title="EDIT ITEM"
                onClick={addItem}
              ></i>
            )}
          </div>
          <div className="showItems">
            {items.map((val) => {
              return (
                <>
                  <div className="eachItem" key={val.id}>
                    <h3>{val.name}</h3>
                    <i
                      className="far fa-edit"
                      title="EDIT ITEM"
                      onClick={() => editItem(val.id)}
                    ></i>
                    <i
                      className="far fa-trash-alt"
                      title="REMOVE ITEM"
                      onClick={() => removeItem(val.id)}
                    ></i>
                  </div>
                </>
              );
            })}
          </div>
          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="REMOVE ALL"
              onClick={removeAllItems}
            >
              <span>CHECK LIST</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ToDo;
