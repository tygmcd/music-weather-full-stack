import { useState } from 'react';
import './css/Begin.css'
import { useNavigate } from 'react-router-dom'

const Begin = () => {
    const [zipcode, setZipcode] = useState('')
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        navigate('/home', { state : { zip: {zipcode}}});
    };

    return (
        <div className='container'>
            <form className="zip-form" onSubmit={handleSubmit}>
                <h1 className="emoji-title">&#127925; &#127780;</h1>
                <label className="zip-form-label">
                    Enter your zipcode:
                    <input 
                        className="zip-form-input" 
                        type="text" 
                        pattern="[0-9]{5}"
                        value={zipcode}
                        onChange={(e) => setZipcode(e.target.value)}
                    />
                </label>
                <div className='button-wrapper'>
                    <button className='submit-btn'>Go!</button>
                </div>
            </form>
        </div>

      );
}
 
export default Begin;