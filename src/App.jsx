import React from "react"
import './style.css'
import Die from "./components/Die"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

export default function App() {

  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)
  const [turnNumber, setTurnNumber] = React.useState(0)

  const rollButtonText = tenzies ? "New Game": "Roll"


  React.useEffect(()=> {
    const tenziesValue = []
        
    if(dice[0].isHeld==true){
        for(let i=1; i<dice.length; i++){
            if((dice[i].isHeld==true) && (dice[i].value==dice[0].value)){
                tenziesValue.push(dice[i])
            }
            else{
                break
            }
        }
        if(tenziesValue.length==dice.length-1){
            console.log("You won!")
            setTenzies(true)
        }
    }
  },[dice])

  //can also use .every function, instead of for loop

  function allNewDice(){
    const newDice = []
    for(let i=0; i<10; i++){
      newDice.push(
          {
            value:Math.ceil(Math.random()*6),
            isHeld:false,
            id:nanoid()
          }
        )
    }
    return newDice
    
  }

  function rollDice(){
    
    if(tenzies){  
      setTenzies(false)
      setDice(allNewDice())
      setTurnNumber(0)
    }
    else{
      setTurnNumber(prevValue=>prevValue+1)
      setDice(prevDice=>prevDice.map((prevDie)=>{
        //const newDice = dice.map(prevDie => {
          if(prevDie.isHeld){
            return prevDie
          }
          else{
            return {
              value:Math.ceil(Math.random()*6),
              isHeld:false,
              id:nanoid()          
            }
          }
      }))
    }
  }

  function holdDice(id){
    const newDice = dice.map((prevDie) => {
      if(prevDie.id==id){
          return {
              ...prevDie,
              isHeld:!prevDie.isHeld
          }
      }
      else{
          return prevDie
          
      } 
    })
    setDice(newDice)
  }

  const theDice = dice.map(die => {
    return (
      <Die key={die.id} value={die.value} isHeld={die.isHeld} holdDice={()=>holdDice(die.id)}/>
    )
  })    

  return (
    <main >
      {tenzies &&  <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it 
        at its current value between rolls.
      </p>
      <div className="dice_container">
        {theDice}
      </div>
      <p className="instructions">Number of turns: {turnNumber}</p>
        <button onClick={rollDice} className="rollButton">{rollButtonText}</button>
    </main>
  )
}


