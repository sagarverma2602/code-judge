import { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'

const ViewSubmissions = () => {
  const navigate=useNavigate()
  const [users, setUsers] = useState([])
  const truncateText = (text:String) => {
    console.log(text)
    if (text.length > 100) {
      return text.slice(0, 100) + '...';
    }
    return text;
  };
  const truncateOutput=(text:String)=>{
    if (text.length > 20) {
      return text.slice(0, 20) + '...';
    }
    return text;
  }
  const formatDate = (dateString:string) => {
    const date = new Date(dateString);
    return date.toLocaleString(); 
  };
  useEffect( () => {
    const fetchData = async () => {
      const response = await fetch(import.meta.env.VITE_DB_URL as string)
      const data = await response.json()
      console.log(data)
      
      setUsers(data)
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
      <tr className="table-header" key="cococo">
        <th>Username</th>
        <th>Language</th>
        <th>Time of submission</th>
        <th>Stdin</th>
        <th>Code</th>
        <th>Output</th>
        <th>Status</th>
      </tr>
      {/* {Object.keys(users).map((key: any) => {
        const user=users[key]
          return (
            <tr className="user-row" key={user.id}>
              <td className="username">{user.username}</td>
              <td className="language">{user.language}</td>
              <td className="submission-time">{formatDate(user.date)}</td>
              <td className="stdin" dangerouslySetInnerHTML={{ __html: truncateText(user.input).replace(/\n/g, '<br>') }}></td>
              <td className="code" dangerouslySetInnerHTML={{
                __html: truncateText(user.code).replace(/\n/g, '<br>').replace(/ /g, '&nbsp;')
              }}></td>
              <td className="output" dangerouslySetInnerHTML={{ __html: truncateOutput(user.stdout).replace(/\n/g, '<br>') }}></td>
              <td className="status">{user.status}</td>
            </tr>
          )
        })
      } */}
      {users.map((user: any) => {
        return (
          <tr className="user-row" key={user.id}>
            <td className="username">{user.username}</td>
            <td className="language">{user.language}</td>
            <td className="submission-time">{formatDate(user.date)}</td>
            <td className="stdin" dangerouslySetInnerHTML={{ __html: truncateText(user.input).replace(/\n/g, '<br>') }}></td>
            <td className="code" dangerouslySetInnerHTML={{
              __html: truncateText(user.code).replace(/\n/g, '<br>').replace(/ /g, '&nbsp;')
            }}></td>
            <td className="output" dangerouslySetInnerHTML={{ __html: truncateOutput(user.stdout).replace(/\n/g, '<br>') }}></td>
            <td className="status">{user.status}</td>
          </tr>
        )})
      }
    </tbody>
  </table>
</div>

  )
}

export default ViewSubmissions
