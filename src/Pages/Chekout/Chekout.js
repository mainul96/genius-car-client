import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';


const Chekout = () => {
    const {_id, title, price} = useLoaderData()
    const {user}= useContext(AuthContext)
 const handlePlaceOrder = event =>{
    event.preventDefault()
    const form = event.target;
    const name = `${form.firstName.value} ${form.lastName.value}`;
    const email = user?.email;
    const phone = form.phone.value;
    const massage = form.massage.value;

    const order = {
        service: _id,
        serviceName: title,
        price,
        email,
        customer: name,
        phone,
        massage
    }

    fetch('http://localhost:5000/orders',{
        method: 'POST',
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify(order)
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
        if(data.acknowledged){
            alert('order Place Successfully')
            form.reset()
        }
    })
    .catch(err => console.error(err))
 }

    return (
        <form onSubmit={handlePlaceOrder}>
            <h2 className='text-4xl'>your about to order:{title}</h2>
            <h4 className='text-3xl'>Price:{price}</h4>
            <div className='grid gap-5 grid-cols-1 lg:grid-cols-2'>
            <input name='firstName' type="text" placeholder="First name" className="input input-bordered input-primary w-full " />
            <input name='lastName' type="text" placeholder="Last Name" className="input input-bordered input-primary w-full " />
            <input name='phone' type="text" placeholder="Phone number" className="input input-bordered input-primary w-full " />
            <input name='email' type="text" placeholder="Email" defaultValue={user?.email} readOnly className="input input-bordered input-primary w-full " />
            </div>
            <textarea name='massage' className="textarea textarea-bordered h-24 w-full" placeholder="Massage"></textarea>
            <input type="submit" value="PLACE YOUR ORDER" className='btn btn-warning w-full my-3' />
        </form>
    );
};

export default Chekout;