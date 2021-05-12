import React, {useState} from "react";

const CreateTournamentsPage: React.FC = () => {
  const [state, setState] = useState({
    tournamentName: '',
    startTime: '',
    maximumNumberOfParticipants: '',
  })

  const handleInputChange = (e) => {
    const name = e.target.name;

  }



  return (
    <>
      <h1>作成</h1>
      <form>
        <label>大会名 :
          <input type="text" name="tournamentName"/>
        </label>
        <label>開始時間 :
          <input type="datetime-local" name="startTime"/>
        </label>
        <label>最大参加人数 :
          <input type="number" name="maximumNumberOfParticipants"/>
        </label>
        <button>作成</button>
      </form>
    </>
  )
}

export default CreateTournamentsPage;