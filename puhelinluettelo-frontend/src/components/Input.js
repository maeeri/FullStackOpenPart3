
const Input = (props) => {
    return (
      <tr>
        <td>
          {props.name}
        </td>
        <td>
          <input 
          value={props.term}
          onChange={props.action}/>
        </td>   
      </tr>
                      
    )
}

export default Input