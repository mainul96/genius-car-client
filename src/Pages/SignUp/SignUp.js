import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import img from '../../assets/images/login/login.svg';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';

const SignUp = () => {
    const {createUser} = useContext(AuthContext)
    const handleSignUp = event =>{
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        createUser(email, password)
        .then(result =>{
            const user = result.user;
            console.log(user)
        })
        .catch(err => console.error(err))
    }

    return (
        <div className="hero w-full my-20">
        <div className="hero-content grid md:grid-cols-2 gap-20  flex-col lg:flex-row">
          <div className="text-center  lg:text-left">
            <img src={img} alt=""  className='w-3/4'/>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 py-20 ">
          <h1 className="text-5xl text-center font-bold">Sign up </h1>
            <form onSubmit={handleSignUp} className="card-body">
            <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input type="text" name="name" placeholder="Name" className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="text" name="email" placeholder="email" className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="text" name="password" placeholder="password" className="input input-bordered" required />
                
              </div>
              <div className="form-control mt-6">
                  <input type="submit" value="SignUp" className="btn btn-warning" />
              </div>
            </form >
            <p className='text-center'>have an already account?<Link to='/login' className='text-orange-600 font-semibold'>Login</Link></p>
          </div>
        </div>
      </div>
    );
};

export default SignUp;