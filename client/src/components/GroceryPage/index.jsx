/* eslint-disable no-unused-expressions */
import React from 'react';
import './style.css';
import PageTitle from '../CommonComponents/PageTitle'
import { Spinner } from 'react-bootstrap'
import { Row, Container, Alert, Card, Col, Button } from 'react-bootstrap'
import { Link } from "react-router-dom";
// import k from '../../../build/images/products'
export default class GroceryPage extends React.Component {
    state = {
        valueData: null,
        isAuthenticated: false,
        customerId: null,
        message: null,
        createList: null,
        removeList: null,
        messageAlert: '',
        showAlert: false,
        varaint: ''


    }
    componentDidMount() {
        fetch('/api/grocery', {
            method: 'GET',
            credentials: 'same-origin',
            headers: {
                'Content-type': 'application/json',
            },
        })

            .then(res => {
                res.json().then(response => {
                    if (response.success && response.data) {
                        this.setState({ isAuthenticated: true })

                        this.setState({ customerId: response.data })
                        const { customerId } = this.state;
                        fetch(`/getLists/${customerId}`, {
                            method: 'GET',
                            credentials: 'same-origin',
                            headers: {
                                'Content-Type': 'application/json',
                            },

                        })
                            .then(res => res.json())
                            .then(response => {
                                if (response) {

                                    this.setState({ valueData: response.data })
                                }
                            }).catch(() => {
                                this.setState({ message: 'Sorry , Internal Server ERROR' })
                            })
                    } else {
                        this.setState({ isAuthenticated: false })
                    }
                })
            });
    }

    handleRemoveList = () => {
        const { customerId } = this.state;
        fetch(`/api/remove-list/${customerId}`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },

        })
            .then(res => res.json)
            .then(response => {
                if (response.data) {
                    this.setState({

                        messageAlert: 'deleted successfully',
                        showAlert: true,
                        varaint: 'success'
                    }),
                        () =>
                            setTimeout(() => {
                                this.setState({ messageAlert: '', showAlert: false })
                            }, 1000)
                }
            })
            .catch((err) => console.log(err)
            )
    }
    render() {
        const { valueData, message, isAuthenticated, createList, removeList } = this.state;
        return (
            <>
                {isAuthenticated ? (
                    <Link to="/api/grocery" className="w3-bar-item w3-button w3-hover-orange w3-mobile">Grocery List</Link>

                ) : <div>WELCOME To Your Page</div>}

                <PageTitle title="My List in Progcery Page" />
                <Container className="page__container">
                    {message && <Alert variant="danger">{message}</Alert>}
                    {valueData ? (
                        <>
                            <Card className="card-image">
                                <img src={`../../../build/images/products/${valueData.product_image}`} />
                            </Card>
                            <Col xs={12} md={6} lg={3} key={valueData.id}>
                                <Card className="yourlist__card" key={valueData.id} >
                                    <Card.Header className="yourlist__card-header">
                                        <div>No.List>>{valueData.id}>></div>
                                        Name Product > {valueData.product_name}>
                                </Card.Header>
                                    <Card.Text className="yourlist__card-text">
                                        Product Price >>  {valueData.product_price}>>
                                </Card.Text>
                                    <Card.Text className="yourlist__card-text">
                                        Product Size >> {valueData.sizes} >>
                                </Card.Text>
                                </Card>

                            </Col>


                        </>
                    ) : <Spinner animation="border" variant="info" />
                    }
                </Container>
                {valueData === null ? (
                    <>
                        <Button>Create List</Button>
                    </>
                ) :
                    <>
                        <Button onClick={this.handleRemoveList}>Remove List</Button>
                    </>
                }


                <div className="fb-login-button" data-width="" data-size="large" data-button-type="continue_with" data-auto-logout-link="false" data-use-continue-as="false"></div>
            </>
        )
    }
}




