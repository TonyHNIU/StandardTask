/* Social media JSX */
import React from 'react';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import { Popup, Button, Icon } from 'semantic-ui-react';

export default class SocialMediaLinkedAccount extends React.Component {
    constructor(props) {
        super(props);

        const details = props.details

        this.state = {
            showEditSection: false,
            newMedia: details
        }

        this.openEdit = this.openEdit.bind(this)
        this.closeEdit = this.closeEdit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.saveMedia = this.saveMedia.bind(this)
        this.renderEdit = this.renderEdit.bind(this)
        this.renderDisplay = this.renderDisplay.bind(this)
    }

    componentDidMount() {
        $('.ui.button.social-media')
            .popup();
    }

    openEdit() {
        const details = Object.assign({}, this.props.details)
        this.setState({
            showEditSection: true,
            newMedia: details
        })
    }

    closeEdit() {
        this.setState({
            showEditSection: false
        })
    }

    handleChange(event) {
        const data = Object.assign({}, this.state.newMeida)
        data[event.target.name] = event.target.value
        this.setState({
            newMedia: data
        })
    }

    saveMedia() {
        console.log(this.props.updateAndSaveData)
        console.log(this.state.newMedia)
        const data = Object.assign({}, this.state.newMedia)
        this.props.saveProfileData(this.props.updateAndSaveData, data)
        this.closeEdit()
    }

    render() {
        return (
            this.state.showEditSection ? this.renderEdit() : this.renderDisplay()
        )
    }

    renderEdit() {
        return (
            <div className='ui sixteen wide column'>
                <ChildSingleInput
                    inputType="text"
                    label="LinkedIn"
                    name="linkedin"
                    value={this.state.newMedia.linkedin}
                    controlFunc={this.handleChange}
                    maxLength={80}
                    placeholder="Enter your LinkedIn Url"
                    errorMessage="Please enter a valid linkedin account"
                />
                <ChildSingleInput
                    inputType="text"
                    label="GitHub"
                    name="github"
                    value={this.state.newMedia.github}
                    controlFunc={this.handleChange}
                    maxLength={80}
                    placeholder="Enter your Github Url"
                    errorMessage="Please enter a valid github account"
                />           
                <button type="button" className="ui teal button" onClick={this.saveMedia}>Save</button>
                <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button>
            </div>
        )
    }

    renderDisplay() {

        return (
            <div className='row'>
                <div className="ui sixteen wide column">
                    <React.Fragment>
                        <Button color='linkedin'>
                            <Icon name='linkedin' />LinkedIn
                        </Button>
                        <Button color='black'>
                            <Icon name='github' />GitHub
                        </Button>
                    </React.Fragment>
                    <button type="button" className="ui right floated teal button" onClick={this.openEdit}>Edit</button>
                </div>
            </div>
        )
    }





}