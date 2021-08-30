import React, {useEffect, useState} from 'react';
import './quoteBox.styles.scss';
import {AiFillTwitterSquare} from  'react-icons/ai';
import {ImQuotesLeft} from 'react-icons/im';
// import { Transition } from 'react-transition-group';

interface Pstate {
    id: number,
    name: string
    photoUrl: string,
    quote: string
}

const choosePerson = (persons: Array<Pstate>) : Pstate =>  {
    const randNum: number = Math.floor(Math.random() * persons.length);
    const chosenPerson: Pstate = {
        id: persons[randNum].id,
        name: persons[randNum].name,
        photoUrl: persons[randNum].photoUrl,
        quote: persons[randNum].quote
    }
    return chosenPerson;
}

const chooseColor = () : string => {
    const colors = ['#16a085',
    '#27ae60',
    '#2c3e50',
    '#f39c12',
    '#e74c3c',
    '#9b59b6',
    '#FB6964',
    '#342224',
    '#472E32',
    '#BDBB99',
    '#77B1A9',
    '#73A857'];
    const randNum: number = Math.floor(Math.random() * colors.length);

    return colors[randNum];
}

const QuoteBox = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [persons, setPersons] = useState<Pstate[]>([]);
    let [person, setPerson] = useState<Pstate>();
    let [color, setColor] = useState<string>();
    
    // let personNum = 0;
    useEffect(() => {
        fetch("./data.json", {
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(res => res.json())
        .then(
            (result) => {
                setIsLoaded(true);
                setPersons(result.persons);
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        )
    }, []);
    if(error) {
        return null;
    } else if(isLoaded && persons.length > 0) {
        if(!person) {
            setPerson(choosePerson(persons));
            setColor(chooseColor());
        }
        return (
            <section style={{backgroundColor: color}} className='quote-section'>
                <div className="container">
                    <div id='quote-box' className='rounded'>
                        <div className='row '>
                            <h2 id='author' style={{color: color}}  className='col-sm-8 person-name'>{person ? person.name : null}</h2>
                            <div className='person-portrait'  >
                                <img alt='person' src={person ? person.photoUrl : undefined}/>
                            </div>
                        </div>
                        <p id='text' className="quote-text"  style={{color: color}} ><ImQuotesLeft className='double-quotes' size={24}/>{person ? person.quote : null}</p>
                        <div className='row'>
                            <a className={`col-sm-2 twitter-link`} href="twitter.com/intent/tweet"><AiFillTwitterSquare className='twitter-button'  size={40} color={color}/></a>

                            <button className='btn col-sm-2 quote-btn' style={{backgroundColor: color}} id="new-quote" onClick={(event) => {
                                event?.preventDefault()
                                let newPerson: Pstate;
                                do {
                                    newPerson = choosePerson(persons);
                                } while (newPerson.id === person?.id);
                                setPerson(newPerson);
                                setColor(chooseColor());
                            }}>New quote</button>   
                        </div>
                    </div>
                </div>
            </section>
        )
    }
    return null;
}
  

export default QuoteBox;