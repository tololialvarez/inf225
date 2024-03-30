import React, {useState, useEffect} from "react";
import { Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { increaseCounter } from "../redux/actions/counterActions";

function Counter(props){
    const count = useSelector((store) => store.counterReducer.count);
    const dispatch = useDispatch();

    return (
        <Card>
            <Card.Body>
                <Card.Title>{count}</Card.Title>
                <Button variant="sucess"onClick={() => dispatch(increaseCounter(1))}>Aumentar</Button>
                <Button variant="danger"onClick={() => dispatch(increaseCounter(-1))}>Disminuir</Button>

            </Card.Body>
        </Card>
    )
}

export default Counter;