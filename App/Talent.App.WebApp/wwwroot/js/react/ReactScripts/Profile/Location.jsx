import React from 'react'
import Cookies from 'js-cookie'
import { default as Countries } from '../../../../util/jsonFiles/countries.json';
import { ChildSingleInput } from '../Form/SingleInput.jsx';

export class Address extends React.Component {
    constructor(props) {
        super(props)
        
        const details = props.addressData

        this.state = {
            showEditSection: false,
            newAddress: details
        }

        this.openEdit = this.openEdit.bind(this)
        this.closeEdit = this.closeEdit.bind(this)
        this.saveAddress = this.saveAddress.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    openEdit() {
        const details = Object.assign({}, this.props.details)
        this.setState({
            showEditSection: true,
            newAddress: details
        })
    }

    closeEdit() {
        this.setState({
            showEditSection: false
        })
    }

    saveAddress() {
        const data = Object.assign({}, this.state.newAddress)
        this.props.saveProfileData(this.props.updateAndSaveData, data)
        this.closeEdit()
    }

    handleChange(event) {
        var data = Object.assign({}, this.props.location);
        //required
        const name = event.target.name;
        let value = event.target.value;
        const id = event.target.id;

        data[name] = value;
        if (name == "country") {
            data["city"] = "";
        }
        var updateData = {
            target: { name: "location", value: data }
        }

        //update props here
        this.props.handleChange(updateData);
    }

    render() {
        return (
            this.state.showEditSection ? this.renderEdit() : this.renderDisplay()
        )
    }

    renderEdit() {

        let countriesOptions = [];
        let citiesOptions = [];
        const selectedCountry = this.props.location.country;
        const selectedCity = this.props.location.city;

        countriesOptions = Object.keys(Countries).map((x) => <option key={x} value={x}>{x}</option>);

        if (selectedCountry != "" && selectedCountry != null) {

            var popCities = Countries[selectedCountry].map(x => <option key={x} value={x}> {x}</option>);

            citiesOptions = <span><select
                className="ui dropdown"
                placeholder="City"
                value={selectedCity}
                onChange={this.handleChange}
                name="city">
                <option value="0"> Select a town or city</option>
                {popCities}
            </select><br /></span>
        }

        return (
            <div className='ui sixteen wide column'>
                <ChildSingleInput
                    inputType="text"
                    label="Number"
                    name="number"
                    value={this.state.newAddress.number}
                    controlFunc={this.handleChange}
                    maxLength={80}
                    placeholder="Enter your Number"
                    errorMessage="Please enter a valid Number"
                />
                <ChildSingleInput
                    inputType="text"
                    label="Street"
                    name="street"
                    value={this.state.newAddress.street}
                    controlFunc={this.handleChange}
                    maxLength={80}
                    placeholder="Enter your Street"
                    errorMessage="Please enter a valid street"
                />
                <ChildSingleInput
                    inputType="text"
                    label="Suburb"
                    name="suburb"
                    value={this.state.newAddress.suburb}
                    controlFunc={this.handleChange}
                    maxLength={80}
                    placeholder="Enter your Suburb"
                    errorMessage="Please enter a valid suburb"
                />
                <div>
                    <select className="ui right labeled dropdown"
                        placeholder="Country"
                        value={selectedCountry}
                        onChange={this.handleChange}
                        name="country">

                        <option value="">Select a country</option>
                        {countriesOptions}
                    </select>
                    <div style={{ marginBottom: "5px", marginTop: "5px" }}></div>
                    {citiesOptions}
                </div>
                <ChildSingleInput
                    inputType="text"
                    label="Posr Code"
                    name="postcode"
                    value={this.state.newAddress.postcode}
                    controlFunc={this.handleChange}
                    maxLength={80}
                    placeholder="Enter your PostCode"
                    errorMessage="Please enter a valid PostCode"
                />
                <button type="button" className="ui teal button" onClick={this.saveAddress}>Save</button>
                <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button>
            </div>
        )
    }

    renderDisplay() {

        let number = this.props.details ? this.props.details.number : ""
        let street = this.props.details ? this.props.details.street : ""
        let suburb = this.props.details ? this.props.details.suburb : ""
        let postcode = this.props.details ? this.props.details.postcode : ""
        let location = { city: '', country: '' }
        if (this.props.details && this.props.details.location) {
            location = this.props.details.location
        }

        return (
            <div className='row'>
                <div className="ui sixteen wide column">
                    <React.Fragment>
                        <p>Address: {number}, {street}, {suburb}, {postcode}</p>
                        <p> City: {location.city}</p>
                        <p> Country: {location.country}</p>
                    </React.Fragment>
                    <button type="button" className="ui right floated teal button" onClick={this.openEdit}>Edit</button>
                </div>
            </div>
        )
    }
}

export class Nationality extends React.Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const data = Object.assign({}, this.props.nationality);
        //required
        const name = event.target.name;
        let value = event.target.value;

        data[name] = value;
        var updateData = {
            target: { name: "nationality", value: data }
        }

        //update props here
        this.props.handleChange(updateData);
    }

    render() {

        let nationalitiesOptions = [];
        const selectedNationality = this.props.selectedNationality;

        nationalitiesOptions = Object.keys(Countries).map((x) => <option key={x} value={x}>{x}</option>);

        return (
            <div>
                 <select className="ui dropdown"
                       placeholder="Select you Nationality"
                       value={selectedNationality}
                       onChange={this.handleChange}
                       name="nationality">

                       <option value="">Select a nationality</option>
                       {nationalitiesOptions}
                 </select>
            </div>             
         )
    }
    
}