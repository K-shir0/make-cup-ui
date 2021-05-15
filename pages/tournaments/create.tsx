import React, {useState} from "react";
import {Auth} from "@aws-amplify/auth";
import {API} from "@aws-amplify/api";
import {createTournament} from "../../src/graphql/mutations";
import {GRAPHQL_AUTH_MODE} from '@aws-amplify/api-graphql'

const CreateTournamentsPage: React.FC = () => {
  const [state, setState] = useState({
    tournamentName: '', // 大会名
    startTime: '', // 開示時間
    maximumNumberOfParticipants: '', // 最大参加人数
  })

  /**
   * フォームに入力された値をstateに格納する関数
   * @param e
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;

    setState({...state, [name]: value})
  }

  return (
    <>
      <h1>作成</h1>
      <div>
        <label>大会名 :
          <input type="text" name="tournamentName"
                 onChange={(e) => handleInputChange(e)}/>
        </label>
        <label>開始時間 :
          <input type="datetime-local" name="startTime"
                 onChange={(e) => handleInputChange(e)}/>
        </label>
        <label>最大参加人数 :
          <input type="number" name="maximumNumberOfParticipants"
                 onChange={(e) => handleInputChange(e)}/>
        </label>
        <button onClick={async () => {
          console.log(state)

          const currentUser = await Auth.currentAuthenticatedUser();

          try {
            const result = await API.graphql({
              authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
              query: createTournament,
              variables: {
                input: {
                  ...state
                },
              },
            });

            console.log(result)

          } catch (e) {
            console.log(e);
          }

        }}>作成
        </button>
      </div>
    </>
  )
}

export default CreateTournamentsPage;