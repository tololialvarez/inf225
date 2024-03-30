import React, {useState, useEffect} from "react";
import axios from "axios";
import { Toast, Row, Col, Button } from "react-bootstrap";

function ValorUF(props){
    const [valores, setValores] = useState([]);
    const [showA, setShowA] = useState(true);
    const toggleShowA = () => setShowA(!showA);

    useEffect(() => {
        var APIkey = "b022097785bd0cdef5584ef20e77d252876995ea";
        axios.get(" https://api.cmfchile.cl/api-sbifv3/recursos_api/uf?apikey="
        +APIkey+
        "&formato=json")
        .then(res => {
            const data = res.data;
            setValores(data.UFs) 
        })
    }, []);
        
    return(
        <Row>
            <Col  md={6} className="mb-2 d-flex flex-column align-items-start">
                <Button onClick={toggleShowA} className="mb-2">
                Mostrar <strong>valor UF</strong> del día.
                </Button>
                <Toast show={showA} onClose={toggleShowA}>
                <Toast.Header>
                    <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                    <strong className="me-auto">ValorUF</strong>
                    <small>{valores[0] && valores[0].Fecha}</small>
                </Toast.Header>
                <Toast.Body>{valores[0] && <div>{valores[0].Valor}</div>}
                </Toast.Body>
                </Toast>
            </Col>
        </Row>
    )
}

export default ValorUF;