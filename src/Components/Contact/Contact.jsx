import React from 'react'
import ContactFormReducer from '../ContactForm/ContactFormReducer'
// import ContactForm from '../ContactForm/ContactForm'
// import ContactProvider from '../Context/Provider/ContactProvider'
// import ContactFormContext from '../ContactForm/ContactFormContext'
function Contact() {
    return (
        <div className="d-flex justify-content-center">
            {/* <ContactForm /> */}
            {/* <ContactProvider>
                <ContactFormContext />
            </ContactProvider> */}
            <ContactFormReducer />
        </div>
    )
}

export default Contact
