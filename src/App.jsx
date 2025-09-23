import React, { useEffect, useState } from 'react'

function App() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    email: '',
    username: '',
    password: '',
  });

  useEffect(() => {
    fetch('http://localhost:8081/user')
    .then(res=> res.json())
    .then(data => setData(data))
    .catch(err => console.log(err));
  }, []);

  const handleChange = (e) =>{
    setForm({ ...form, [e.target.name]: e.target.value});
  }

  const handleSubmit = () =>{
    fetch('http://localhost:8081/user',{
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(form)
    })
    .then(res => res.json())
    .then(result =>{
      console.log(result);
      return fetch('http://localhost:8081/user')
      .then(res => res.json())
      .then(data => setData(data));
    })
    .catch(err => console.log(err));
  }
  
  return (
    <div style={{padding: '50px'}}>
        <table>
          <thead>
            <th>Id</th>
            <th>Email</th>
            <th>Username</th>
            <th>Password</th>
          </thead>
          <tbody>
            {data.map((d, i) =>(
              <tr key={i}>
                <td>{d.id}</td>
                <td>{d.email}</td>
                <td>{d.username}</td>
                <td>{d.password}</td>
              </tr>
            ))}
          </tbody>
        </table>

      <h3 style={{ marginTop: "20px" }}>Add New User</h3>
      <input
        type="text"
        name="email"
        placeholder="Email"
        onChange={handleChange}
        style={{ width: "100%", margin: "2px 0" }}
      />
      <input
        type="text"
        name="username"
        placeholder="Username"
        onChange={handleChange}
        style={{ width: "100%", margin: "2px 0" }}
      />
      <input
        type="text"
        name="password"
        placeholder="Password"
        onChange={handleChange}
        style={{ width: "100%", margin: "2px 0" }}
      />

      <button type="button" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  )
}

export default App
