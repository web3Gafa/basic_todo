import React, { useEffect, useState } from 'react'
import Web3 from 'web3'
import contactContract from './contracts/Contacts.json'

const App = () => {
  const [account, setAccounts] = useState()
  const [contactList, setContactList] = useState()
  const [contacts, setContacts] = useState([])

  useEffect(() => {
    async function load(){
      const web3 = new Web3('http://127.0.0.1:8545');
      const accounts = await  web3.eth.getAccounts()
      setAccounts(accounts[0])

      // get an instance of start contract using contractABI and addr
      const contactList = new web3.eth.Contract(contactContract.abi,contactContract.networks[5777].address)
      // set it to state variable
      setContactList(contactList)

      // waalah lets call the methods 
      // remember count is a public variable 
      const counter = await contactList.methods.count().call()
      
      // iterate thought all the contacts using the counter variable
      for(var i = 1; i <= counter ; i++){
        // again getting a  particular contact from the samrt contract
        const contact = await contactList.methods.contacts(i).call();
        console.log(contact)
        // add the receintly fetched to the sate variable
        setContacts([contact,...contacts])
      }

      console.log(contacts)

    }
    load()
  },[])

  return (
    <div>
      Your Account is : {account}
      <h1> Contacts</h1>
      {
        Object.keys(contacts).map((contact,index)=>(
          <li key={`${contacts[index].name}-${index}`}>
            <h4>{contacts[index].name}</h4>
            <span> <br/> Phone :{contacts[index].phone}</span>
          </li>
        ))
      }
    </div>
  )
}

export default App
