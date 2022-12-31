import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';
import OrderRow from './OrderRow';


const Orders = () => {
    const { user } = useContext(AuthContext)
    const [orders, setOrders] = useState([])

   

    useEffect(() => {
        fetch(`http://localhost:5000/orders?email=${user?.email}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setOrders(data)
            })
    }, [user?.email])

    const handleDelete= id =>{
        const proceed = window.confirm('Are you sure, you want to cancel this order?') ;
        if(proceed){
            fetch(`http://localhost:5000/orders/${id}`,{
                method:'DELETE'
            })
            .then(res=> res.json())
            .then(data => {
                console.log(data)
                if(data.deletedCount > 0){
                    alert('deleted sucefully')
                    const remaning = orders.filter(odr =>odr._id !== id)
                    setOrders(remaning)
                }
            })
        }
    }

    const handleUpdate = id =>{
        fetch(`http://localhost:5000/orders/${id}`,{
            method:'PATCH',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify({status:"Approved"})
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.modifiedCount > 0 ){
                const remaning = orders.filter(odr => odr._id !== id);
                const approving = orders.find(odr => odr._id === id);
                const newOders = [approving, ...remaning];
                setOrders(newOders)
            }
        })
    }

    return (
        <div>
            <h3 className='text-3xl'>You have a {orders.length} orders.</h3>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Favorite Color</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                 {
                    orders.map(order => <OrderRow
                    key={order._id}
                    order={order}
                    handleDelete={handleDelete}
                    handleUpdate = {handleUpdate}
                    ></OrderRow>)
                 }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Orders;