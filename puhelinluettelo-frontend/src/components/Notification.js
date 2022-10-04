const Notification = ({type, message}) => {
    if (message === null) {
        return null
    }

    else if (type === true)
    {
        console.log('error found')
        return (
            <div className="error">
                {message}
            </div>
        )
    }

    else {
        return (
        <div className="success">
            {message}
        </div>
        )
    }
    
}

export default Notification