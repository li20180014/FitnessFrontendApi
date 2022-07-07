import React from 'react'
import './contact.css'
import {MdOutlineEmail} from 'react-icons/md'
import {BsWhatsapp} from 'react-icons/bs'
import { useRef } from 'react';
import emailjs from 'emailjs-com';



const Contact = () => {

  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_vgpzigf', 'template_vxw5lls', form.current, 'x0-eayIFzKeOTs_gb')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
    e.target.reset();
  };
  return (
    <section id='contact'>
       <h5>Get In Touch</h5>
        <h2>Contact Us</h2>

        <div className="container contact__container">
        <div className="contact__options">

        <article className='contact__option'>
        <MdOutlineEmail className='contact__option-icon'/>
        <h4>Email</h4>
        <h5>info@synergy.rs</h5>
        <a href="mailto:li20180014@student.fon.bg.ac.rs" target="_blank">Send A Message</a>
        </article>


       

    

        </div>

        <form ref={form} onSubmit={sendEmail}>
        <input type="text" name='name' placeholder='Your Full Name' required />
        <input type="email" name='email' placeholder='Your Email' required />
        <textarea name="message" rows="7" placeholder='Your Message' required></textarea>
        <button type='submit' className='btn btn-primary' >Send Message</button>
        </form>
        

        
        </div>

    </section>

  )
}

export default Contact
