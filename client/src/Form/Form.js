import './Form.scss';
import {Form, FormGroup, FormText, Label, Input, FormFeedback, Row, Col } from 'reactstrap';

const HeroForm = props => {
    return ( 
        <div className="container-fluid p-0 m-0">
            <Form onSubmit={props.getData} className="form p-4 ">
                <h4 className="text-left font-weight-bold">Sign up for email updates</h4>
                <FormText className="text-left">*Indicates Required Field</FormText>
                <FormGroup className="row justify-content-center">
                    <Col sm={6}>
                        <Label className="text-left pl-0" xs={12} for="firstName">FIRST NAME*</Label>
                        <Input id="firstName" className="input p-3"/>
                        <FormFeedback valid className="text-left">First name is required</FormFeedback>
                    </Col>
                    <Col sm={6}>
                        <Label className="text-left pl-0" xs={12} for="lastName">LAST NAME*</Label>
                        <Input id="lastName" className="input p-3"/>
                        <FormFeedback className="text-left">Last name is required</FormFeedback>
                    </Col>
                </FormGroup>
                <FormGroup className="row">
                    <Col sm={6}>
                        <Label className="text-left pl-0" xs={12} for="emailAddress">EMAIL ADDRESS*</Label>
                        <Input id="emailAddress" className="input p-3"/>
                        <FormFeedback className="text-left">Email address is required</FormFeedback>
                    </Col>
                    <Col sm={6}>
                        <Label className="text-left pl-0" xs={12} for="organization">ORGANIZATION</Label>
                        <Input id="organization" className="input p-3"/>
                    </Col>
                </FormGroup>
                <FormGroup className="row" style={{position: 'relative'}} >
                    <Col xs={6} sm={4} md={3} lg={2} >
                        <Label for="selectBox" className="text-left pl-0" xs={12}>EU RESIDENT*</Label>
                        <Input type="select" name="selectBox" id="selectBox" className="selectBox">
                            <option>- SELECT ONE -</option>
                            <option>Yes</option>
                            <option>No</option>
                            <option>Menu item3</option>
                            <option>Menu item4</option>
                            <option>Menu item5</option>
                        </Input>
                        <span className="arrow"></span>
                    </Col>
                </FormGroup>
            </Form>
        </div>
     );
}
 
export default HeroForm;