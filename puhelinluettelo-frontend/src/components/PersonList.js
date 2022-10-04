import Person from "./Person";

const PersonList = (props) => {
    if (props.showPersons.length > 0) {
        return (
        <table>
            <thead>
                <tr>
                    <th>
                        name
                    </th>
                    <th>
                        number
                    </th>
                </tr>
            </thead>
            <tbody>
                {props.showPersons.map(person => 
                    <Person key={person.name} name={person.name} number={person.number} handleClick={() => props.handleClick(person.id)} />
                )}
            </tbody>
        </table>
    )}
}

export default PersonList