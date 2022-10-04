const Person = (props) => {
    return (
        <tr>
            <td>
                {props.name}
            </td>
            <td>
                {props.number}
            </td>
            <td>
                <button onClick={props.handleClick}>delete</button>
            </td>
        </tr>
    )
}

export default Person