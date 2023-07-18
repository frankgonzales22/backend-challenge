import axios from "axios"
import { useEffect, useState } from "react"

interface User {
    id: number,
    name: string,
    website: string
}


const GetUser = () => {

    const [users, setUsers] = useState<User[]>([])

    useEffect(() => {

        const controller = new AbortController();

        axios.get('https://jsonplaceholder.typicode.com/users', { signal: controller.signal })
            .then(res => setUsers(res.data))
            .catch(err => console.log(err))

        return () => {
            controller.abort();
        }
    }, [])


    const removeUser = (id : number) => {
        setUsers(users.filter(i => i.id !== id))
        
        axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
        .catch(err=> console.log(err))
    }

    const updateUser = (user : User) => {
        const updatedItem = {...user, name : user.name + 'updated'}
    }


    return (
        <div>
            <ul className="list-group">
                {users.map(i =>
                    <li key={i.id} className="list-group-item d-flex justify-content-between">
                        <div className="text-primary">{i.name}</div>
                        <div>
                            {i.website}
                            <button className="btn btn-outline-secondary mx-3" onClick={() => removeUser(i.id)}>Remove</button>
                            <button className="btn btn-outline-danger" onClick={() => console.log(i.id)}>Update</button>
                        </div>


                    </li>
                )}
            </ul>

        </div>
    )
}

export default GetUser