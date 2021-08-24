import React from 'react';
import './quoteBox.styles.scss';
import {AiFillTwitterSquare} from  'react-icons/ai';
import {ImQuotesLeft} from 'react-icons/im'

const QuoteBox = () => {
    return (
        <>
            <div id='quote-box' className='rounded'>
                <div className='row '>
                    <h2 id='author' className='col-sm-8 person-name'>Albert Einstein</h2>
                    <div className='person-portrait'>
                        <img alt='person' src='https://ichef.bbci.co.uk/news/624/mcs/media/images/82399000/jpg/_82399978_75952740.jpg'/>
                    </div>
                </div>
                <p id='text' class="quote-text"><ImQuotesLeft size={40}/>Lorem ipsum dolor sit amet consectetur adipisicing elit. Et corrupti ab vitae perferendis modi, laboriosam facere, adipisci, reprehenderit eligendi voluptatum quis sint totam consequuntur accusantium nesciunt natus eius ad voluptate.</p>
                <div className='row'>
                    <a className='col-sm-2 twitter-link' href="twitter.com/intent/tweet"><AiFillTwitterSquare  size={40} color={'#0dcaf0'}/></a>
                    <button className='btn btn-info float-right col-sm-2 quote-btn'>New quote</button>
                </div>
            </div>
        </>
    )
}

export default QuoteBox;