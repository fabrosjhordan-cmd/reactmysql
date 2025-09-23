import React, { useEffect, useState } from 'react'

function App() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    email: '',
    username: '',
    password: '',
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () =>{
    fetch('http://localhost:8081/user')
    .then(res=> res.json())
    .then(data => setData(data))
    .catch(err => console.log(err));
  }

  const handleChange = (e) =>{
    setForm({ ...form, [e.target.name]: e.target.value});
  }

  const handleSubmit = () =>{
    if(editingId){
      fetch(`http://localhost:8081/user/${editingId}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(form)
      })
      .then(res => res.json())
      .then(result=>{
        console.log(result)
        setEditingId(null)
        setForm({email: '', username: '', password: ''})
        fetchData();
      })
      .catch(err => console.log(err));
    }else{
      fetch('http://localhost:8081/user',{
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(form)
    })
    .then(res => res.json())
    .then(result =>{
      console.log(result);
      setForm({ email: '', username: '', password: ''})
      fetchData();
    })
    .catch(err => console.log(err));
    }
  }

  const handleEdit= (user) =>{
    setEditingId(user.id);
    setForm({
      email: user.email,
      username: user.username,
      password: user.password
    })
  }
  
  return (
    <div style={{padding: '50px'}}>
        <table>
          <thead>
            <th>Id</th>
            <th>Email</th>
            <th>Username</th>
            <th>Password</th>
            <th>Edit</th>
          </thead>
          <tbody>
            {data.map((d, i) =>(
              <tr key={i}>
                <td>{d.id}</td>
                <td>{d.email}</td>
                <td>{d.username}</td>
                <td>{d.password}</td>
                <td>
                  <button type="button" onClick={()=>handleEdit(d)}>
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      <h3 style={{ marginTop: "20px" }}>{editingId ? "Edit User" : "Add New User"}</h3>
      <input
        type="text"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        style={{ width: "100%", margin: "2px 0" }}
      />
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={form.username}
        onChange={handleChange}
        style={{ width: "100%", margin: "2px 0" }}
      />
      <input
        type="text"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        style={{ width: "100%", margin: "2px 0" }}
      />

      <button type="button" onClick={handleSubmit}>
        {editingId ? 'Update' : 'Submit'}
      </button>
    </div>
  )
}

export default App
