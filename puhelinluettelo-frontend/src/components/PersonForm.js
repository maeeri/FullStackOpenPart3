import Input from "./Input";

const PersonForm = (props) => {
    return (
        <form onSubmit={props.submit}>
            <table>
                <tbody>
                    <Input name='name' term={props.nameTerm} action={props.nameAction} />
                    <Input name='number' term={props.numberTerm} action={props.numberAction} />   
                </tbody>     
            </table>
            <div>
            <button type="submit">add</button>
            </div>
        </form>
    )
    
}

export default PersonForm