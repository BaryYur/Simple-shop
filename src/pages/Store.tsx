import React, { useEffect, useState } from 'react'

import { Row, Col, Button } from 'react-bootstrap'
import storeItems from '../data/items.json'
import { StoreItem } from '../components/StoreItem'

let firstItems : any = []

for (let i = 0; i < storeItems.length; i++) {
    if (i < 3) {
        firstItems.push(storeItems[i])
    }
}

export function Store() {
    const [currentItems, setCurrentItems] = useState(firstItems)
    const [currentIndex, setCurrentIndex] = useState(
        JSON.parse(localStorage.getItem('currentIndex')) || 1
    )
    const [visibleMoreBtn, setVisibleMoreBtn] = useState(true)

    const current = () => {
        for (let i = 0; i < storeItems.length; i++) {
            if (i < currentIndex * 3) {
                setCurrentItems(prevItem => {
                    return [...prevItem, storeItems[i]]
                })
            }
        }
    }

    useEffect(() => {
        setCurrentItems([])
        localStorage.setItem('currentIndex', JSON.stringify(currentIndex))
        current()    

        if (currentIndex * 3 >= storeItems.length) {
            setVisibleMoreBtn(false)
        } 
    }, [currentIndex, visibleMoreBtn, storeItems]) 

    const addAnotherItems = () => {
        setCurrentItems([])
        setCurrentIndex(index => index + 1)
        localStorage.setItem('currentIndex', JSON.stringify(currentIndex))
        current()
    }

    return (
        <div>
            <h1>Store</h1>
            <Row md={2} xs={1} lg={3} className='g-3'>
                {currentItems.map(item => (
                    <Col key={item.id}>
                        <StoreItem {...item} />
                    </Col>
                ))}
            </Row>
            {visibleMoreBtn && <Button 
                variant='success' 
                style={{ margin: '10px auto', display: 'block' }} 
                onClick={addAnotherItems}
            >
                More items
            </Button>
            }
        </div>
    )
}