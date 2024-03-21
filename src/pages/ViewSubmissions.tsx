import { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'

const ViewSubmissions = () => {
  const navigate=useNavigate()
  const [users, setUsers] = useState([])
  const truncateText = (text:String) => {
    if (text.length > 1000) {
      return text.slice(0, 100) + '...';
    }
    return text;
  };
  const formatDate = (dateString:string) => {
    const date = new Date(dateString);
    return date.toLocaleString(); 
  };
  useEffect( () => {
    console.log(import.meta.env.VITE_DB_URL)
    const fetchData = async () => {
      const response = await fetch(import.meta.env.VITE_DB_URL as string)
      const data = await response.json()
      
      setUsers(data.data)
    }
    fetchData()

  }, [])
  return (
    <div className="submissions">
      <div onClick={()=> navigate('/')}>
        New Submission
      </div>
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
      {users &&
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
