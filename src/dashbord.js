import React from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

import { render } from '@testing-library/react';

class Dashbord extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            userlist: [],
            total_pages: '',
            error: '',
            show: false,
            loading:false,
            clickedbuttonid: ''
        }
    }

    componentDidMount() {
        this.setState({loading:true})
        setTimeout(()=>{
        Axios.get(`https://reqres.in/api/users`)
            .then(response => response)
            .then(data => this.setState({
                userlist: data.data.data,
                loading:false,
                total_pages : data.data.total_pages

            })).catch(error => this.setState({ error: error }))},2000);
    }

    handleShow = (e) => {
        this.setState({
            clickedbuttonid: e.target.id,
            show: !this.state.show
        })
    }

    handleClose = (e, a) => {
        if (e) {
            return this.setState({ show: !this.state.show, clickedbuttonid: '' })
        }
        else {
            Axios.delete(`https://reqres.in/api/users/${this.state.clickedbuttonid}`)
                .then(data => data)
                .then(this.setState({
                    show: false

                }), alert("successfully deleted..."))
                .catch(error => console.log(error));
        }
    }

    nextPage = (e)=>{   
        this.setState({loading:true})
        let aqa=e.target.id;
        setTimeout(function (){
        Axios.get(`https://reqres.in/api/users?page=${aqa}`)
            .then(response => response)
            .then(data => this.setState({
                userlist: data.data.data,
                loading:false
            })).catch(error => this.setState({ error: error }))}.bind(this),2000);

    }

    render() {
        const { userlist, total_pages } = this.state;
        let pages = [];
        for (let index = 1; index <= total_pages; index++) {
        pages.push(<Button variant="warning" renderAs="button" id={index} onClick={(e)=>this.nextPage(e)}>{index}</Button>)
        }
        return (
            
            <div>
                {this.state.loading && <>fetching data......</>}
                <div className="pagination">{pages}</div>
                <Table striped bordered hover>
                    <tr>
                        <th>Firstname</th>
                        <th>Lastname</th>
                        <th>Avtar</th>
                        <th>Action</th>

                    </tr>
                    {(
                        userlist.map(user => {
                            const { id, first_name, last_name, avatar } = user;
                            return (
                                <tr>
                                    <td>{first_name}</td>
                                    <td>{last_name}</td>
                                    <td><img src={avatar} /></td>
                                    <td>
                                        <Link to={`/list/${id}`}>
                                            <Button variant="success" renderAs="button">
                                                Edit
                                            </Button>
                                        </Link>

                                        <Link to="/list">
                                            <Button variant="danger" id={id} onClick={(e) => this.handleShow(e)} renderAs="button">
                                                Delete
                                            </Button>
                                        </Link>
                                    </td>
                                </tr>
                            )
                        })
                    )}

                </Table>
                <Modal show={this.state.show} onHide={(e) => this.handleClose(1)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete Profile</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Label>Are you sure,Do you want to delete profile ? ID : {this.state.clickedbuttonid} </Form.Label>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={(e) => this.handleClose(1)}>
                            Close
                        </Button>
                        <Button variant="danger" onClick={(e) => this.handleClose(0)}>
                            Delete Profile
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}
export default Dashbord;