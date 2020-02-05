import React from 'react';
import avatar from './logo.svg';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Axios from 'axios';
class Add_list extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            user : {
                first_name : '',
                last_name : '',
                avatar : avatar,
            }
        }
    }

    componentDidMount(){
        let userId = this.props.match.params.id;
        //console.log(userId); 
        if(userId !== null){
            Axios.get(`https://reqres.in/api/users/${userId}`)
                    .then(data => {
                        this.setState({
                            user: data.data.data
                        })
                        //console.log(this.state.user)
                    }
                    ).catch(error => this.setState({ error: error }));
        }else{
            
        }
        }
    
        updateValue = (e) => {
            this.setState({
                user :{ ...this.state.user,
                [e.target.name]: e.target.value}
            })
        
        }

        updateValueSuccess()
        {
            Axios.put(`https://reqres.in/api/users/${this.props.match.params.id}`,
            {
                "name": this.state.user.first_name,
                "job": this.state.user.last_name
            })
                    .then(data => data)
                    .then(alert("success..")                        
                    
                    ).catch(error => this.setState({ error: error }));

        }

    render() {
        const {first_name, last_name, avatar } = this.state.user;
        return (
            <div className="w-50 p-3">
                <Form>
                    <img src = {avatar}/>
                    <Form.Group controlId="formBasicFirstname">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" name="first_name" placeholder="Enter First Name" onChange={(e) => this.updateValue(e)} value={first_name}/>
                    </Form.Group>

                    <Form.Group controlId="formBasicLastname">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" name="last_name" placeholder="Enter Last Name" onChange={(e) => this.updateValue(e)} value={last_name}/>
                    </Form.Group>
                    <Button variant="primary" onClick={()=>this.updateValueSuccess()} type="button">
                        Submit
                    </Button>
                    <Link to="/list">
                    <Button variant="secondary" type="button">
                        Cancel
                    </Button>
                    </Link>
                </Form>
            </div>
        )
    }
}
export default Add_list;
