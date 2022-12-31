import React, { useEffect, useState } from 'react';
import ServiceCart from './ServiceCart';

const Services = () => {
  const [services, setServices] = useState([])
    useEffect( () =>{
        fetch('http://localhost:5000/services')
        .then(res => res.json())
        .then(data => setServices(data))
    }, [])

    return (
        <div>
            <div className='text-center'>
                <p className='font-semibold text-orange-600 text-2xl'>SERVICES</p>
                <h1 className='font-bold py-6 text-2xl'>Our Service Area</h1>
                <p className='py-4'>the majority have suffered alteration in some form, by injected humour, or randomised <br />
                    words which don't look even slightly believable. </p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6'>
               
                {
                    services.map(service => <ServiceCart
                    key={service._id}
                    service={service}
                    ></ServiceCart>)
                }
            </div>
        </div>
    );
};

export default Services;