import { useEffect, useState } from 'react'

const ViewSubmissions = () => {
  const [users, setUsers] = useState([])
  const truncateText = (text:String) => {
    if (text.length > 1000) {
      return text.slice(0, 100) + '...';
    }
    return text;
  };
  const formatDate = (dateString:string) => {
    const date = new Date(dateString);
    return date.toLocaleString(); // Adjust formatting as needed
  };
  useEffect( () => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:3000/api/users')
      const data = await response.json()
      
      setUsers(data.data)
    }
    fetchData()

  }, [])
  return (
    <div className="submissions">
  <button className="get-users" onClick={() => { console.log(users) }}>Get Users</button>
  <table className="submission-table">
    <tbody>
      <tr className="table-header" key={2}>
        <th>Username</th>
        <th>Language</th>
        <th>Time of submission</th>
        <th>Stdin</th>
        <th>Code</th>
        <th>Output</th>
        <th>Status</th>
      </tr>
      {
        users.map((user: any) => {
          return (
            <tr className="user-row" key={user.id}>
              <td className="username">{user.username}</td>
              <td className="language">{user.pref_language}</td>
              <td className="submission-time">{formatDate(user.date)}</td>
              <td className="stdin" dangerouslySetInnerHTML={{ __html: truncateText(user.stdin).replace(/\n/g, '<br>') }}></td>
              <td className="code" dangerouslySetInnerHTML={{
                __html: truncateText(user.source_code).replace(/\n/g, '<br>').replace(/ /g, '&nbsp;')
              }}></td>
              <td className="output" dangerouslySetInnerHTML={{ __html: truncateText(user.output).replace(/\n/g, '<br>') }}></td>
              <td className="status">{user.output_status}</td>
            </tr>
          )
        })
      }
    </tbody>
  </table>
</div>

  )
}

export default ViewSubmissions