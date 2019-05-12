import React from 'react'
import { SingleInput } from '../Form/SingleInput.jsx';
import { Dropdown } from 'semantic-ui-react'

export default class VisaStatus extends React.Component {
    constructor(props) {
        super(props)

        const details = props.visaStatus
        const expiryDetails = props.visaExpiryDate

        this.state = {
            newVisaStatus: details,
            newExpiryDate: expiryDetails
        }

        this.handleChange = this.handleChange.bind(this)
        this.saveVisaType = this.saveVisaType.bind(this)

        this.handleDateChange = this.handleDateChange.bind(this)
        this.saveExpiryDate = this.saveExpiryDate.bind(this)

        this.inputDateForm = this.inputDateForm.bind(this)
    }

    componentDidUpdate(prevProps) {
        if (prevProps.visaExpiryDate != this.props.visaExpiryDate) {
            this.setState({
                newExpiryDate: this.props.visaExpiryDate
            })
        }
    }

    inputDateForm(inputDate) {
        if (inputDate == null) {
            return inputDate
        }
        var temp = new Date(inputDate);
        var day = temp.getDate();
        var month = temp.getMonth() + 1;
        var year = temp.getFullYear();
        if (day < 10) {
            day = "0" + day
        }
        if (month < 10) {
            month = "0" + month
        }
        if (year < 10) {
            year = "000" + year
        } else if (year < 100) {
            year = "00" + year
        } else if (year < 1000) {
            year = "0" + year
        }
        var date = (year + "-" + month + "-" + day);
        return date;
    }

    saveVisaType() {
        const data = this.state.newVisaStatus
        this.props.saveProfileData(data)
    }

    handleChange(event) {
        const data = Object.assign({}, this.state.newVisaStatus)
        data[event.target.name] = event.target.value

        this.setState({
            newVisaStatus: data
        },
            this.saveVisaType
        )
    }

    handleDateChange(event) {
        const data = this.state.newExpiryDate
        this.setState({
            newExpiryDate: event.target.value
        })
    }

    saveExpiryDate() {
        const data = this.state.newExpiryDate
        this.props.saveProfileData({ "visaExpiryDate": data })
    }

    render() {
        const selectedVisa = this.props.visaStatus;

        return (
            <React.Fragment>
                <div className="row">
                    <div className="ui six wide column">
                        <div className="field">
                            <label>Visa type</label>
                            <select className="ui dropdown" placeholder="Visa type" value={selectedVisa} onChange={this.handleChange} name="visaStatus">
                                <option value="Visa type">Visa type</option>
                                <option value="Citizen">Citizen</option>
                                <option value="Permanent Resident">Permanent Resident</option>
                                <option value="Work Visa">Work Visa</option>
                                <option value="Student Visa">Student Visa</option>
                            </select>
                        </div>                        
                    </div>
                    {this.props.visaStatus == "Work Visa" || this.props.visaStatus == "Student Visa"
                        ?
                        <React.Fragment>
                            <div className="ui six wide colum">
                                <div className="field">
                                    <label>Visa expiry date</label>
                                    <input type="date" name="expiryDate" value={this.inputDateForm(this.state.newExpiryDate)} onChange={this.handleDateChange} placeholder="DD/dd/yy"></input>
                                </div>
                            </div>
                                <div className="ui four wide column">
                                    <div className="field">
                                        <label>Button</label>
                                        <button type="button" className="ui black button" onClick={this.saveExpiryDate}>Save</button>
                                    </div>
                                </div>
                        </React.Fragment>
                        :
                        <React.Fragment>
                        </React.Fragment>
                    }
                </div>
            </React.Fragment>
         )
    }
}