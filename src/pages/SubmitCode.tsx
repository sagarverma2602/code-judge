import { useState, useEffect } from 'react'
import { v4 } from 'uuid'
import {useNavigate} from 'react-router-dom'

const SubmitCode = () => {
  const navigate=useNavigate()
  const languagecode = { "Python": 71, "Java": 62, "C++": 54, "Javascript": 63 }
  const [output, setOutput] = useState({
    stdout: '',
    status: ''

  })
  const [userObject, setUserObject] = useState({
    id: '',
    username: '',
    language: '',
    input: '',
    code: ''
  })
  const API_KEY = import.meta.env.VITE_API_KEY as string;
  const handleSubmit = async () => {
    if (!userObject.username || !userObject.language || !userObject.code) {
      alert('Please fill all the fields')
      return
    }
    const url = import.meta.env.VITE_CODE_JUDGE_URL as string;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': API_KEY,
          'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
        },
        body: JSON.stringify({
          language_id: languagecode[userObject.language as keyof typeof languagecode],
          source_code: btoa(userObject.code),
          stdin: btoa(userObject.input)
        })
      });
      const result = await response.json();

      setOutput({
        stdout: atob(result.stdout),
        status: result.status.description
      })

    } catch (error) {
      console.error(error);
    }
  }
  useEffect(():any => {

    if (output.status === '' || output.stdout === '') {

      return 
    }
    const postSubmission = async () => {
      await fetch(import.meta.env.VITE_DB_URL as string, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...userObject, id: v4(), ...output })
      }).then(() => {
        alert('Submitted Successfully')
        setUserObject({
          id: '',
          username: '',
          language: '',
          input: '',
          code: ''
        })
        setOutput({
          stdout: '',
          status: ''
        })


      }).catch((err) => {
        console.log("Error" + err)
      })
      console.log("Submitted")
    }
    postSubmission()
  }, [output])
  return (
    <div>
      <div onClick={()=> navigate('/view-submissions')}>
        View Submissions
      </div>
      <div>
        Username: <input type="text" placeholder="Enter Username" value={userObject.username} onChange={(event) => setUserObject({ ...userObject, username: event.target.value })} />
      </div>
      <div>

        Preffered Language: <select
          value={userObject.language}
          onChange={(event) => setUserObject({ ...userObject, language: event.target.value })}
        >
          <option value="">Select</option>
          <option value="JavaScript">JavaScript</option>
          <option value="Java">Java</option>
          <option value="C++">C++</option>
          <option value="Python">Python</option>
        </select>
      </div>
      <div>
        <label>
          Input:
        </label>
        <textarea placeholder="Enter Input" rows={10} cols={30}
          value={userObject.input}
          onChange={(event) => setUserObject({ ...userObject, input: event.target.value })
          }></textarea>
      </div>
      <div>
        <label>
          Code:
        </label>
        <textarea

          placeholder="" rows={20} cols={100}
          onChange={(event) => setUserObject({ ...userObject, code: event.target.value })}
        ></textarea>


      </div>
      <div>
        <input type='button' onClick={handleSubmit} value="Submit Your Code" />
      </div>

    </div>
  )
}

export default SubmitCode
