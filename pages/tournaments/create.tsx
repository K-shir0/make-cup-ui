import React from "react";

const CreateTournamentsPage: React.FC = () => {
  return (
    <>
      <h1>作成</h1>
      <form>
        <label>大会名 :
          <input type="text"/>
        </label>
        <label>開催時間 :
          <input type="datetime-local"/>
        </label>
        <label>最大参加人数 :
          <input type="number"/>
        </label>
        <button>作成</button>
      </form>
    </>
  )
}

export default CreateTournamentsPage;