import "./App.css";
import React, { useState } from "react";
import axios from "axios";

function App() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [role, setRole] = useState("");
  const [newrole, setNewrole] = useState("role..");
  const [memberlist, setMemberlist] = useState([]);

  //function for add member
  const addmember = () => {
    axios
      .post("http://localhost:3001/create", {
        fname: fname,
        lname: lname,
        role: role,
      })
      .then(() => {
        console.log("success");
      });
  };

  //function for showmember
  const showmember = () => {
    axios.get("http://localhost:3001/data").then((response) => {
      setMemberlist(response.data);
    });
  };

  //function for update member role
  const updaterole = (id) => {
    axios
      .put("http://localhost:3001/update", { role: newrole, id: id })
      .then((response) => {
        setMemberlist(
          memberlist.map((val) => {
            return val.id === id
              ? {
                  id: val.id,
                  fname: val.fname,
                  lname: val.lname,
                  role: newrole,
                }
              : val;
          })
        );
      });
  };

  //function for delete record
  const deletemember = (id) => {
    axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setMemberlist(
        memberlist.filter((val) => {
          return val.id !== id;
        })
      );
    });
  };

  return (
    <div className="App">
      <div className="information">
        <label>Fname</label>
        <input
          type="text"
          onChange={(event) => {
            setFname(event.target.value);
          }}
        />
        <label>lname</label>
        <input
          type="text"
          onChange={(event) => {
            setLname(event.target.value);
          }}
        />
        <label>Role</label>
        <input
          type="text"
          onChange={(event) => {
            setRole(event.target.value);
          }}
        />
        <button onClick={addmember}>Add Member</button>
      </div>

      <div className="member">
        <button onClick={showmember}>Show Members</button>
        {memberlist.map((val, key) => {
          return (
            <div className="employee">
              <div>
                <h3>Fname:{val.fname}</h3>
                <h3>Lname:{val.lname}</h3>
                <h3>Role:{val.role}</h3>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="role.."
                  onChange={(event) => {
                    setNewrole(event.target.value);
                  }}
                />
                <button
                  onClick={() => {
                    updaterole(val.id);
                  }}
                >
                  Update
                </button>

                <button
                  onClick={() => {
                    deletemember(val.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
