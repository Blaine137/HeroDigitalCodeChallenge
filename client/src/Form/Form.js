import {useState} from 'react';
import './Form.scss';
import {Form, FormGroup, FormText, Label, Input, Col, DropdownToggle, DropdownMenu, DropdownItem, InputGroupButtonDropdown } from 'reactstrap';

const HeroForm = () => {
    const [feedback, setFeedback] = useState('');
    const [requestFeedback, setRequestFeedback] = useState('');
    const [firstName, setFirstName] = useState(null);
    const [firstNameInvalid, setFirstNameInvalid] = useState(false);
    const [lastName, setLastName] = useState(null);
    const [lastNameInvalid, setLastNameInvalid] = useState(false);
    const [email, setEmail] = useState(null);
    const [emailInvalid, setEmailInvalid] = useState(false);
	const [org, setOrg] = useState(null);
	const [euResident, setEuResident] = useState('- SELECT ONE -');
    const [dropdownOpen, setDropdownOpen] = useState(false);
	const [advances, setAdvances] = useState(true);
	const [alerts, setAlerts] = useState(false);
	const [other, setOther] = useState(false);

    const toggleDropDown = () => setDropdownOpen(!dropdownOpen); //show/hide the select menu

        //sends the data from the form to the endpoint
    let submitForm = e => {
        e.preventDefault(); //prevent browser from reloading
        var formData = {
            firstName,
            lastName,
            email,
            org,
            euResident,
            advances,
            alerts,
            other
        };

            //if all required fields have values
        if(
            firstName.length > 0 && 
            lastName.length > 0 &&
            email.length > 0  &&
            (euResident === 'yes' || euResident === 'no') &&
            (advances === true || alerts === true || other === true)){

                        //post request to sever sending the form data
                fetch('http://localhost:3001/submit', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                })
                .then(res => res.json()) //sets the content type to json
                .then(data => setRequestFeedback(data.message)) 
                .catch(error => setRequestFeedback('The Server is currently down, please try again later.'));

            }else{
                setFeedback('Please fill out required fields!')
            }
      
    };
    
    let validateValues = e => {
            //selects the checkboxes in the form
        let advances = document.forms["heroForm"]["Advances"]; 
        let alerts = document.forms["heroForm"]["Alerts"];
        let other = document.forms["heroForm"]["Other"];
        
            //if a required input is empty show error
        if((e.target.value.length === 0 || e.target.value === 'false') && e.target.required){
            setFeedback(`${e.target.name} is required`);
                 //set input errors to true
            switch(e.target.name){
                case "First name": 
                    setFirstNameInvalid(true)
                    break
                case "Last name": 
                    setLastNameInvalid(true)
                    break
                case "Email": 
                    setEmailInvalid(true)
                    break
                default: break
            }
                //reset feedback because organization is not required
            if(e.target.name === "Organization"){
                setFeedback('')
            }
        }else if(e.target.value.length > 0 || (e.target.value === 'yes' || e.target.value === 'no')){
            setFeedback('')
            setFirstNameInvalid(false)
            setLastNameInvalid(false)
            
        }

            //checks to make sure the email input is a valid email
        if(e.target.name === "Email"){
                //if the email is not valid
            if(e.target.validity.valid !== true){
                setFeedback('Please enter a valid email!')
                    //if email is valid
                if(e.target.validity.valid === true){
                    setEmailInvalid(false)
                }
            }
        }
     
            //if none of the checkboxes are checked show error
        if(
            advances.checked === false && 
            alerts.checked === false &&  
            other.checked === false
        ){
            setFeedback('Atleast one communication method is required!');
        }


    }

        //if the fetch request was successful show message else show form
    let body;
    if(requestFeedback.length > 0){
        body = (<p className="text-center">{requestFeedback}</p>)
    }else{
        body = (
            <Form onSubmit={submitForm} onChange={validateValues} className="form p-4 " action="/submit" name="heroForm">
                    <h4 className="font-weight-bold">Sign up for email updates</h4>
                    <FormText>*Indicates Required Field</FormText>
                    <p className="text-center text-danger font-weight-bold">{feedback}</p>
                    <FormGroup className="row justify-content-center">
                        <Col sm={6} md={5}>
                            <Label className="pl-0" xs={12} for="firstName">FIRST NAME*</Label>
                            <Input autoComplete="none" id="firstName" invalid={firstNameInvalid} name="First name" className="input p-3" onChange={e => setFirstName(e.target.value)} required/>
                        </Col>
                        <Col sm={6} md={5}>
                            <Label className="pl-0" xs={12} for="lastName">LAST NAME*</Label>
                            <Input id="lastName" className="input p-3" invalid={lastNameInvalid} onChange={e => setLastName(e.target.value)} required name="Last name"/>
                        </Col>
                    </FormGroup>
                    <FormGroup className="row justify-content-center">
                        <Col sm={6} md={5}>
                            <Label className="pl-0" xs={12} for="emailAddress">EMAIL ADDRESS*</Label>
                            <Input id="emailAddress" type="email" className="input p-3" invalid={emailInvalid} onChange={e => setEmail(e.target.value)} required name="Email"/>
                        </Col>
                        <Col sm={6} md={5}>
                            <Label className="pl-0" xs={12} for="organization">ORGANIZATION</Label>
                            <Input id="organization" className="input p-3" onChange={e => setOrg(e.target.value)} name="Organization"/>
                        </Col>
                    </FormGroup>
                    <FormGroup className="row mb-4 justify-content-start customSelectContainer" >
                        <Col xs={12} sm={6} md={{size: 4, offset: 1}} lg={3}>
                            <InputGroupButtonDropdown addonType="append" isOpen={dropdownOpen} toggle={toggleDropDown} className="select">
                                <Label for="Eu residents" className="d-block">EU RESIDENT*</Label>
                                <DropdownToggle className="selectToggler text-left" id="Eu residents" >
                                    {euResident}
                                    <span className="arrow"></span>
                                </DropdownToggle>
                                <DropdownMenu className="selectMenu m-0 border-top-0">
                                    <DropdownItem className="selectItem" onClick={(e) => setEuResident(e.target.value)} value="- SELECT ONE -">- SELECT ONE -</DropdownItem>
                                    <DropdownItem className="selectItem" onClick={(e) => setEuResident(e.target.value)} value="yes">Yes</DropdownItem>
                                    <DropdownItem className="selectItem" onClick={(e) => setEuResident(e.target.value)} value="no">No</DropdownItem>
                                </DropdownMenu>
                            </InputGroupButtonDropdown>
                        </Col>
                    </FormGroup>
                    <FormGroup className="row justify-content-center">
                        <Col sm={6} md={5} className="mb-3 mb-sm-0">
                            <Label check for="advancesCheckbox" className="checkboxLabel">
                            <input type="checkbox" className="customCheckbox" id="advancesCheckbox" onChange={e => setAdvances(!advances)} checked={advances} name="Advances"/>
                            ADVANCES
                            <span className="checkmark"></span>
                            </Label>
                        </Col>
                        <Col sm={6} md={5}>
                            <Label check for="alertCheckbox" className="checkboxLabel">
                            <input type="checkbox" className="customCheckbox" id="alertCheckbox" onChange={e => setAlerts(!alerts)} name="Alerts" />
                            ALERTS
                            <span className="checkmark"></span>
                            </Label>
                        </Col>
                    </FormGroup>
                    <FormGroup className="row mb-5">
                        <Col sm={8} md={{size: 6, offset: 1}}>
                            <Label check for="otherCheckbox" className="checkboxLabel">
                            <input type="checkbox" className="customCheckbox" id="otherCheckbox" onChange={e => setOther(!other)} name="Other"/>
                            OTHER COMMUNICATIONS
                            <span className="checkmark"></span>
                            </Label>
                        </Col>
                    </FormGroup>
                    <FormGroup className="row justify-content-start">
                        <Col sm={4} md={{size: 3, offset: 1}} lg={{size: 2, offset: 1}}>
                            <Input type="submit" className="submitBtn font-weight-bold mb-3 mb-sm-0" value="Submit"/>
                        </Col>
                        <Col sm={4} md={3} lg={2}>
                            <Input type="reset" className="resetBtn font-weight-bold"/>
                        </Col>
                    </FormGroup>
                </Form>
        )
    }
    
    return ( 
        <div className="container-fluid p-0 m-0 formContainer d-flex">
            <div className="row justify-content-center align-items-center containerRow">
                <div className="col-10">
                    {body}
                </div>
            </div>
        </div>
     );
}
 
export default HeroForm;