import '../style.css'

export default function Die(props){
    const {id, value, isHeld, holdDice} = props

    const diceHeld = {
        backgroundColor: props.isHeld ? "#59E391" :"white"

    }
    
    

    return(

        <div className="dice" style={diceHeld} onClick={holdDice}>
            
            {props.value}
        
        </div>
        
    )
}