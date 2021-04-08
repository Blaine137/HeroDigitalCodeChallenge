import {useState} from 'react';
import './Form.scss';
import {Form, FormGroup, FormText, Label, Input, FormFeedback, Col } from 'reactstrap';

const HeroForm = () => {
    const [feedback, setFeedback] = useState('');

    const [firstName, setFirstName] = useState(null);
    const [firstNameError, setFirstNameError] = useState(false);

    const [lastName, setLastName] = useState(null);
    const [email, setEmail] = useState(null);
	const [org, setOrg] = useState(null);
	const [euResident, setEuResident] = useState(null);
	const [advances, setAdvances] = useState(true);
	const [alerts, setAlerts] = useState(false);
	const [other, setOther] = useState(false);


        //sends the data from the form to the endpoint
    let submitForm = e => {
        e.preventDefault();
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
      fetch('http://localhost:3001/submit', {
              method: "POST",
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify(formData)
          })
      .then(res => res.json())
      .then(data => setFeedback(data.message))
      .catch(error => console.log('error: ', error));
      
    };
    
    let validateValues = e => {
        let firstName = document.forms["heroForm"]["firstName"];
        let lastName = document.forms["heroForm"]["lastName"];
        let emailAddress = document.forms["heroForm"]["email"];
        let organization = document.forms["heroForm"]["organization"];
        let EuResident = document.forms["heroForm"]["Eu resident"];
        let advances = document.forms["heroForm"]["advances"];
        let alerts = document.forms["heroForm"]["alerts"];
        let other = document.forms["heroForm"]["other"];

        if(
            firstName.length > 0 && 
            lastName.length > 0 && 
            (emailAddress.length > 0 && emailAddress.validity.valid === true) && 
            organization.length > 0 && 
            EuResident.value === true &&
            (advances.checked === true || alerts.checked === true || other.checked === true) 
        ){
            setFeedback('');
        }

        if((e.target.value.length === 0 || e.target.value === 'false') && e.target.required){
            setFeedback(`${e.target.name} is required`)
            if(e.target.value.length > 0){
                setFeedback('')
            }
        }

        if(e.target.name === "Eu residents" && e.target.value === false){
            setFeedback(`${e.target.name} is required`)
            if(e.target.value === true){
                setFeedback('');
            }
        }
     
        if(
            document.getElementById("advancesCheckbox").checked === false && 
            document.getElementById("alertCheckbox").checked === false &&  
            document.getElementById("otherCheckbox").checked === false
        ){
            setFeedback('Atleast one communication method is required!');
            if(
                document.getElementById("advancesCheckbox").checked === true || 
                document.getElementById("alertCheckbox").checked === true || 
                document.getElementById("otherCheckbox").checked === true
            ){
                setFeedback('')
            }
        }

    }
    
    return ( 
        <div className="container-fluid p-0 m-0 formContainer" style={{fontFamily: 'open-sans'}}>
            <div className="row justify-content-center align-items-center" style={{height: '100vh'}}>
                <div className="col-10">
                    <Form onSubmit={submitForm} onChange={validateValues} className="form p-4 " action="/submit" name="heroForm">
                    <h4 className="text-left font-weight-bold">Sign up for email updates</h4>
                    <FormText className="text-left">*Indicates Required Field</FormText>
                    <p className="text-center">{feedback}</p>
                    <FormGroup className="row justify-content-center">
                        <Col sm={6} md={5}>
                            <Label className="text-left pl-0" xs={12} for="firstName">FIRST NAME*</Label>
                            <Input id="firstName" invalid={firstNameError} name="first name" className="input p-3" onChange={e => setFirstName(e.target.value)} required/>
                        </Col>
                        <Col sm={6} md={5}>
                            <Label className="text-left pl-0" xs={12} for="lastName">LAST NAME*</Label>
                            <Input id="lastName" className="input p-3" onChange={e => setLastName(e.target.value)} required name="last name"/>
                        </Col>
                    </FormGroup>
                    <FormGroup className="row justify-content-center">
                        <Col sm={6} md={5}>
                            <Label className="text-left pl-0" xs={12} for="emailAddress">EMAIL ADDRESS*</Label>
                            <Input id="emailAddress" type="email" className="input p-3" onChange={e => setEmail(e.target.value)} required name="email"/>
                        </Col>
                        <Col sm={6} md={5}>
                            <Label className="text-left pl-0" xs={12} for="organization">ORGANIZATION</Label>
                            <Input id="organization" className="input p-3" onChange={e => setOrg(e.target.value)} required name="organization"/>
                        </Col>
                    </FormGroup>
                    <FormGroup className="row mb-4 justify-content-start" style={{position: 'relative'}} >
                        <Col xs={12} sm={6} md={{size: 4, offset: 1}} lg={3}>
                            <Label for="selectBox" className="text-left pl-0" xs={12}>EU RESIDENT*</Label>
                            <Input type="select" id="selectBox" className="selectBox" onChange={e => {setEuResident(e.target.value); validateValues(e)}} required name="Eu resident">
                                <option value="false">- SELECT ONE -</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </Input>
                            <span className="arrow"></span>
                        </Col>
                    </FormGroup>
                    <FormGroup className="row justify-content-center">
                        <Col sm={6} md={5} className="mb-3 mb-sm-0">
                            <Label check for="advancesCheckbox" className="checkboxLabel">
                            <input type="checkbox" className="customCheckbox" id="advancesCheckbox" onChange={e => setAdvances(!advances)} checked={advances} name="advances"/>
                            ADVANCES
                            <span className="checkmark"></span>
                            </Label>
                        </Col>
                        <Col sm={6} md={5}>
                            <Label check for="alertCheckbox" className="checkboxLabel">
                            <input type="checkbox" className="customCheckbox" id="alertCheckbox" onChange={e => setAlerts(!alerts)} name="alerts" />
                            ALERTS
                            <span className="checkmark"></span>
                            </Label>
                        </Col>
                    </FormGroup>
                    <FormGroup className="row mb-5">
                        <Col sm={8} md={{size: 6, offset: 1}}>
                            <Label check for="otherCheckbox" className="checkboxLabel">
                            <input type="checkbox" className="customCheckbox" id="otherCheckbox" onChange={e => setOther(!other)} name="other"/>
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
                </div>
            </div>
        </div>
     );
}
 
export default HeroForm;