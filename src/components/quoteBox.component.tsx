import React, {useEffect, useState} from 'react';
import './quoteBox.styles.scss';
import {AiFillTwitterSquare} from  'react-icons/ai';
import {ImQuotesLeft} from 'react-icons/im';

interface Pstate {
    id: number,
    name: string
    photoUrl: string,
    quote: string
}

const choosePerson = (persons: Array<Pstate>) : Pstate =>  {
    console.log(persons)
    const randNum: number = Math.floor(Math.random() * persons.length);
    const chosenPerson: Pstate = {
        id: persons[randNum].id,
        name: persons[randNum].name,
        photoUrl: persons[randNum].photoUrl,
        quote: persons[randNum].quote
    }
    return chosenPerson;
}

const QuoteBox = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [persons, setPersons] = useState<Pstate[]>([]);
    let [person, setPerson] = useState<Pstate>();
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
        // console.log(persons)
        if(!person) {
            setPerson(choosePerson(persons));
        }
        return (
            <section className='quote-section'>
                <div className="container">
                    <div id='quote-box' className='rounded'>
                        <div className='row '>
                            <h2 id='author' className='col-sm-8 person-name'>{person ? person.name : null}</h2>
                            <div className='person-portrait'>
                                <img alt='person' src={person ? person.photoUrl : undefined}/>
                            </div>
                        </div>
                        <p id='text' className="quote-text"><ImQuotesLeft className='double-quotes' size={24}/>{person ? person.quote : null}</p>
                        <div className='row'>
                            <a className='col-sm-2 twitter-link' href="twitter.com/intent/tweet"><AiFillTwitterSquare  size={40} color={'#0dcaf0'}/></a>
                            <button className='btn btn-info float-right col-sm-2 quote-btn' id="new-quote" onClick={(event) => {
                                event?.preventDefault()
                                let newPerson: Pstate;
                                do {
                                    newPerson = choosePerson(persons);
                                } while (newPerson.id === person?.id);
                                setPerson(newPerson);
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