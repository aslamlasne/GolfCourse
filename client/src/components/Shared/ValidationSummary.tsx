import { ScreenMessages } from "../../Models/Interfaces";

const ValidationSummary: React.FC<ScreenMessages> = ({ screenMessages }) => {
  let messageCount = 0;
  return <div>
    { 
      screenMessages.length>0 && screenMessages.map((eachValidation: string) => {
        const messageKey = `message_${messageCount++}`;
        return <div key={messageKey} >{eachValidation}</div>
      })
    }
  </div>
  
}

export default ValidationSummary;