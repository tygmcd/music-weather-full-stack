import { useEffect, useState } from "react";

const DjangoTest = () => {

  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:8000/api/hello-world/', { method : 'POST', body : '{"name":"John", "age":30, "car":null}' })
    .then(res => { 
        if (!res.ok) {
            throw Error("Could not fetch data");
        }
        return res.json(); 
    })
    .then(data => {
        setMessage(data.message); 
    })
    .catch(err => {
        console.log(err.message);
    })
}, [])
    return (
        <div>{message}</div>
      );
}
 
export default DjangoTest;