const Notification = ({type, message}) => {
    if (message === null) {
        return null
    }

    else if (type === true)
    {
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